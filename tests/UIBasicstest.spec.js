const { test, expect } = require('@playwright/test'); //annotation

test('Browser Context Playwright test', async ({ browser }) => {

    const context = await browser.newContext(); //used to open new instance browser
    const page = await context.newPage(); // used to open a page

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const errorBlock = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css 
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signInButton.click();
    const error_message = await errorBlock.textContent();
    console.log(error_message);

    await expect(errorBlock).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInButton.click();

    const productText = await cardTitles.nth(0).textContent();
    const productText1 = await cardTitles.first().textContent();
    console.log(productText);
    console.log(productText1);

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles); // returns array

});


test('Page Playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google"); // assertion to test title
});


test('UI Controls', async ({ browser }) => {
    const context = await browser.newContext(); //used to open new instance browser
    const page = await context.newPage(); // used to open a page
    const cardTitles = page.locator(".card-body a");

    //block css files to load
    page.route("**/*.css", route => {
        route.abort();
    });

    //block image files to load
    page.route("**/*.{jpg, png, jpeg}", route => {
        route.abort();
    });

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const signInButton = page.locator("#signInBtn");
    const blinkingtextDoc = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("consult");
    //await page.pause();
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked()); //returns true or false
    //assertion
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); //Asserts that the radio button must be checked.
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(blinkingtextDoc).toHaveAttribute('class', 'blinkingText');

    await signInButton.click();

    const productText = await cardTitles.nth(0).textContent();
    const productText1 = await cardTitles.first().textContent();
    console.log(productText);
    console.log(productText1);

});

test('Child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const docLocator = page.locator("[href*='documents-request']");
    const userName = page.locator("#username");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), // to listen if any new page pending, rejected, fulfilled
            docLocator.click(), //new page is opened
        ]);

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain)

    await userName.fill(domain);
    console.log(await userName.textContent());

});