import { limitKey } from './limit-key.ts';

describe('limitKey', () => {
	it.each(['203.0.113.7', 'unknown'])('keeps %s as it is', (ip) => {
		expect(limitKey(ip)).toBe(ip);
	});

	it.each([
		'::ffff:203.0.113.7',
		'::ffff:cb00:7107',
		'0:0:0:0:0:ffff:cb00:7107',
		'::FFFF:CB00:7107'
	])('keys the IPv4-mapped spelling %s on the IPv4 address', (ip) => {
		expect(limitKey(ip)).toBe('203.0.113.7');
	});

	it.each([
		{ ip: '2001:db8:1:2:3:4:5:6', key: '2001:db8:1:2::/64' },
		{ ip: '2001:db8:1:2::9', key: '2001:db8:1:2::/64' },
		{ ip: '2001:db8:1:2:aaaa::1', key: '2001:db8:1:2::/64' },
		{ ip: '2001:db8::1', key: '2001:db8:0:0::/64' },
		{ ip: '::1', key: '0:0:0:0::/64' }
	])('keys the IPv6 address $ip on its /64', ({ ip, key }) => {
		expect(limitKey(ip)).toBe(key);
	});

	it('gives every address of one /64 the same key', () => {
		expect(limitKey('2001:db8:1:2:ffff:ffff:ffff:ffff')).toBe(limitKey('2001:db8:1:2::'));
	});

	it('gives neighbouring /64s different keys', () => {
		expect(limitKey('2001:db8:1:2::1')).not.toBe(limitKey('2001:db8:1:3::1'));
	});
});
