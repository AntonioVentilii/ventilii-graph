import { defineConfig } from '@junobuild/config';

export default defineConfig({
	satellite: {
		ids: {
			development: '<DEV_SATELLITE_ID>',
			production: 'l54kz-4yaaa-aaaal-asyla-cai'
		},
		source: 'build',
		predeploy: ['npm run build']
	}
});
