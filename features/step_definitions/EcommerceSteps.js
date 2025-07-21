const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('a login to the ecommerce application with {string} and {string}', { timeout: 100 * 60 }, async function (username, password) {

    const loginPage = await this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(username, password);
});

When('add a product to the cart {string}', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is added to the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.validateProduct(productName);
    await cartPage.navigateToCheckout();
});

When('Enter valid details and proceed to checkout with {string} and {string} and {string} and {string} and {string}', async function (name, coupon, countryNameToSearch, countryName, username) {
    const checkoutDetailsPage = this.poManager.getCheckoutDetailsPage();
    await checkoutDetailsPage.paymentDetails(name, coupon);
    await checkoutDetailsPage.selectCountry(countryNameToSearch, countryName);
    await checkoutDetailsPage.userNameCheck(username);
    await checkoutDetailsPage.navigateToOrderDetailsPage();

});

Then('Verify the order is present in the order history', async function () {
    const orderDetailsPage = this.poManager.getOrderDetailsPage();
    const orderNumber = await orderDetailsPage.validateOrderDetails();
    await orderDetailsPage.navigateToMyOrdersPage();

    const myOrdersPage = this.poManager.getMyOrderPage();
    myOrdersPage.validateOrderNumber(orderNumber);
});

Given('a login to the ecommerce1 application with {string} and {string}', async function (username, password) {
    const signInButton = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css 
    await this.page.locator("#username").fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signInButton.click();
});


Then('verify Error message is displayed', async function () {
    const errorBlock = this.page.locator("[style*='block']");
    const error_message = await this.page.locator(".alert-danger").textContent();
    console.log(error_message);

    await expect(errorBlock).toContainText('Incorrect');
});
