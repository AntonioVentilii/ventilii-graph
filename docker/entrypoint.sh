#!/bin/sh
# Runs the two processes of the image: the AI API (node, unprivileged, on
# 127.0.0.1:8787) and nginx (static site on :8080, proxying /api/ to node).
# If either exits, stop the other and exit non-zero so Fly restarts the
# machine instead of serving a site whose API silently vanished.
set -eu

su-exec nginx node /srv/api/server.mjs &
api=$!

nginx -g 'daemon off;' &
web=$!

stop() {
	kill -TERM "$api" "$web" 2>/dev/null || true
	wait
	exit 0
}
trap stop TERM INT

while kill -0 "$api" 2>/dev/null && kill -0 "$web" 2>/dev/null; do
	sleep 2
done

echo "entrypoint: a process exited, stopping the container" >&2
kill -TERM "$api" "$web" 2>/dev/null || true
wait
exit 1
