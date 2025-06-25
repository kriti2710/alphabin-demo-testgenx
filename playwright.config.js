// @ts-check
import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 5,
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['json', { outputFile: 'test-results/report.json' }],
    ['@alphabin/trx', {
      // Required configuration
      serverUrl: 'https://staging-api.trx.alphabin.co',
      apiKey: 'trx_staging_fca4516d70abceecbaf6ef8a0caf27f3e2a51e346ee4057eb87ba5c6a26671df',

      // Optional: Custom tags
      tags: [
        'automated',
        process.env.TEST_ENV || 'staging',
        process.env.BRANCH_NAME || 'main'
      ],
    }]
  ],
  timeout: 60000,
  use: {
    launchOptions: {
      slowMo: 1000,
      args: ['--start-maximized']
    },
    headless: true,
    baseURL: 'http://demo.alphabin.co',
    bypassCSP: true,
    trace: 'on',           
    screenshot: 'on',     
    video: 'on',         
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chromium'],
        viewport: null,
        permissions: ['clipboard-read', 'clipboard-write']
      },
    },
  ],
});
