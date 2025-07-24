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
    ['blob', { outputDir: 'blob-report' }], // Use blob reporter
    ['json', { outputFile: './playwright-report/report.json' }],
    // ['@alphabin/trx', {

    //    // Required configuration
    //    serverUrl: 'https://staging-api.testdino.com',
    //    apiKey: 'trx_staging_8e8d07d94ddde82c43fac1c83401555efbdff83c0e290138a95905df2a8e739e',
   

    //   // Optional: Custom tags
    //   tags: [
    //     'automated',
    //     process.env.TEST_ENV || 'staging',
    //     process.env.BRANCH_NAME || 'main'
    //   ],
    // }]
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
    }
);
