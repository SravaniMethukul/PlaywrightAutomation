const { test, expect } = require('@playwright/test');

//Login UI - json
//test browser _> .json, cart, order, order details, order history
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "saisra123@gmail.com"

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Sai@1234");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
    //create a context that has storage data on logging in
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
})


test('E2E Automation Test', async ({ browser }) => {

    //giving the context that has the storageState
    const page = await webContext.newPage();

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const cartItems = page.locator('.cartSection h3');
    const email = "saisra123@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");

    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor(); // waits until this element is showed up
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();

    //select product name Zara Coat 3
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    const nameLocator = page.locator(".field", { hasText: 'Name on Card' });
    await nameLocator.locator("input").fill("Sravani");

    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();

    await page.locator("text= * Coupon Applied").waitFor();
    const foundCouponApplied = page.locator("text= * Coupon Applied").isVisible();
    expect(foundCouponApplied).toBeTruthy();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();


    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const countryName = await dropdown.locator("button").nth(i).textContent();
        if (countryName === ' India') {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText(email);

    await page.locator(".actions a").click();

    await page.locator(".toast-title").waitFor();
    await expect(page.locator(".toast-title")).toBeVisible();

    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderNumber = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderNumber.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderNumber.includes(orderIdDetails)).toBeTruthy();
});

test("Test case 2", async ({ }) => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".card-body b").first().waitFor(); // waits until this element is showed up
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})

