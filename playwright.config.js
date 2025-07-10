// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000, // 30 seconds
  expect: { //for assertions timeout
    timeout: 50 * 1000, // 5 seconds
  },
  retries: 1,

  reporter: [['html'], ['line'], ['allure-playwright']], //for reporting

  use: {

    browserName: 'chromium',
    headless: false,
    screenshot: 'on', //screenshot for everystep (only-on-failure, on, off)
    trace: 'on', // log information for each step(on, off, retain-on-failure)
  },


});
module.exports = config
