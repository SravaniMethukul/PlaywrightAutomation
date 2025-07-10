const { test, expect } = require('@playwright/test');
//test.describe.configure({ mode: 'parallel' });
//test.describe.configure({ mode: 'serial' });

test('Hidden Element Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com");

    await page.goBack();
    await page.goForward();
    await page.goBack();

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('Handling Popup or Dialog box', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //listening event to occur, here we are waiting for dialog event to occur
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    //page.on('dialog', dialog => dialog.dismiss());

    //hover 
    await page.locator("#mousehover").hover();
})

test('Handling frames', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //check frame name or id then 
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textObtained = await framespage.locator(".text h2").textContent();
    console.log(textObtained.split(' ')[1]);

})

test('Screenshot and visual comparision', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.locator("#displayed-text").screenshot({ path: 'screenshotelement.png' });

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();

    //takes screenshot of whole page
    await page.screenshot({ path: 'screenshot.png' });

    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('visual testing', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})