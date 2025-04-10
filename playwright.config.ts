import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	outputDir: 'test-results',
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	timeout: 50000,
	expect: {
		timeout: 8000,
	},

	use: {
		baseURL: 'https://demo.netbox.dev/',
		headless: true,
		viewport: { width: 1920, height: 1080 },
		// Ignore ssl certificate
		ignoreHTTPSErrors: true,
		// Capture screenshot after each test failure.
		screenshot: 'only-on-failure',
		// Record video on test failure
		video: 'retain-on-failure',
		// Toggles bypassing Content-Security-Policy.
		bypassCSP: true,
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
