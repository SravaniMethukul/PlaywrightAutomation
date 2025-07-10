import { test } from '@playwright/test';
import { link } from 'fs';

test('Playwright special locators', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check(); // to select checkbox or radio button
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("Sai@123");

    await page.getByRole("button", { name: 'Submit' }).click();

    const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    console.log(bool);

    await page.getByRole("link", { name: 'Shop' }).click();

    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button", { name: 'Add ' }).click();


});