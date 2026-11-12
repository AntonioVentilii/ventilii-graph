import { isIPv6 } from 'node:net';

// The eight 16-bit groups of an IPv6 address: a dotted IPv4 tail becomes its
// two hex groups, then '::' is expanded.
const ipv6Groups = (ip: string): number[] => {
	const parts = ip.split(':');
	const last = parts.at(-1) ?? '';
	if (last.includes('.')) {
		const [a = 0, b = 0, c = 0, d = 0] = last.split('.').map(Number);
		parts.splice(-1, 1, ((a << 8) | b).toString(16), ((c << 8) | d).toString(16));
	}
	const hex = parts.join(':');
	const [head = '', tail = ''] = hex.split('::');
	const left = head ? head.split(':') : [];
	const right = tail ? tail.split(':') : [];
	return (
		hex.includes('::')
			? [...left, ...Array<string>(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right]
			: left
	).map((g) => parseInt(g, 16));
};

// An IPv6 visitor usually holds a whole /64 and can pick a fresh address for
// every request, so the per-IP limits key IPv6 on its /64 prefix. IPv4, and
// IPv4 mapped into IPv6 in any of its spellings (::ffff:203.0.113.7,
// ::ffff:cb00:7107, 0:0:0:0:0:ffff:…), keys on the full IPv4 address.
export const limitKey = (ip: string): string => {
	if (!isIPv6(ip)) {
		return ip;
	}
	const groups = ipv6Groups(ip);
	if (groups.slice(0, 5).every((g) => g === 0) && groups[5] === 0xffff) {
		const [hi = 0, lo = 0] = groups.slice(6);
		return [hi >> 8, hi & 0xff, lo >> 8, lo & 0xff].join('.');
	}
	return `${groups
		.slice(0, 4)
		.map((g) => g.toString(16))
		.join(':')}::/64`;
};
