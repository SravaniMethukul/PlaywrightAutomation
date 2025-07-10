const { test, expect } = require('@playwright/test');

test('E2E Automation Test Other', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const cartItems = page.locator('.cartSection h3');
    const email = "saisra123@gmail.com"

    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Sai@1234");
    await page.getByRole("button", { name: 'login' }).click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor(); // waits until this element is showed up
    await page.locator(".card-body").filter({ hasText: productName }).getByRole("button", { name: 'Add To Cart' }).click();

    //focus on listitem
    await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", { name: 'Checkout' }).click();

    const nameLocator = page.locator(".field", { hasText: 'Name on Card' });
    await nameLocator.locator("input").fill("Sravani");

    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    await page.getByRole("button", { name: 'Apply Coupon' }).click();

    await expect(page.getByText("* Coupon Applied")).toBeVisible();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    await dropdown.getByRole("button", { name: 'India' }).nth(1).click();

    await expect(page.locator(".user__name label")).toHaveText(email);

    await page.getByText("Place Order ").click();

    await page.locator(".toast-title").waitFor();
    await expect(page.locator(".toast-title")).toBeVisible();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderNumber = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.getByRole("button", { name: ' ORDERS' }).click();
    console.log(orderNumber);

    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderNumber.includes(rowOrderId)) {
            await rows.nth(i).getByRole("button", { name: 'View' }).click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderNumber.includes(orderIdDetails)).toBeTruthy();
});



