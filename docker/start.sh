#!/bin/sh
# Runs the processes of the image: the AI API (node, as the unprivileged `api`
# user, on 127.0.0.1:8787), nginx (static site on :8080, proxying /api/ to
# node) and, with workload identity federation, the OIDC helper (root; the
# only process that touches Fly's machine socket, see server/oidc-helper.ts).
# If the API or nginx exits, stop the rest and exit non-zero so Fly restarts
# the machine instead of serving a site whose API silently vanished. The
# helper is left out of that: if it dies, only /ask fails (logged as
# generate_failed), and the site stays up.
set -eu

pids=""

if [ -n "${ANTHROPIC_FEDERATION_RULE_ID:-}" ] && [ -S /.fly/api ]; then
	node /srv/api/oidc-helper.mjs &
	helper=$!
fi

su-exec api node /srv/api/server.mjs &
pids="$pids $!"

nginx -g 'daemon off;' &
pids="$pids $!"

stop() {
	# shellcheck disable=SC2086 # word splitting is the point
	kill -TERM $pids ${helper:-} 2>/dev/null || true
	wait
	exit 0
}
trap stop TERM INT

running() {
	for pid in $pids; do
		kill -0 "$pid" 2>/dev/null || return 1
	done
}

while running; do
	sleep 2
done

echo "start.sh: a process exited, stopping the container" >&2
# shellcheck disable=SC2086
kill -TERM $pids ${helper:-} 2>/dev/null || true
wait
exit 1
