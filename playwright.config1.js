// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 1,
  //workers: 1,
  timeout: 40 * 1000, // 30 seconds
  expect: { //for assertions timeout
    timeout: 50 * 1000, // 5 seconds
  },

  reporter: 'html', //for reporting
  projects: [{
    name: 'safari',
    use: {

      browserName: 'webkit',
      headless: false,
      screenshot: 'on', //screenshot for everystep (only-on-failure, on, off)
      trace: 'on', // log information for each step(on, off, retain-on-failure)
      // viewport: { width: 720, height: 720 },
      // ...devices['iPhone 11'],
      ignoreHttpsErrors: true,
      permissions: ['geolocation'],
      video: 'retain-on-failure'
    }
  },
  {
    name: 'chrome',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'off',
      trace: 'retain-on-failure',
    }
  }
  ]
});
module.exports = config
