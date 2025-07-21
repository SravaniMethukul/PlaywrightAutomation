const { POManager } = require('../../pageObjects/POManager');
const playwright = require('playwright');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
    console.log('Starting a new test step');
});


AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshotForFailure.png' });
        console.log('Test step failed');
    } else {
        console.log('Test step passed');
    }
});

After(async function () {
    console.log('Test execution completed');
});
