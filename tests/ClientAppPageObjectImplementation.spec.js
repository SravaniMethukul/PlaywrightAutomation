const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');

const { POManager } = require('../pageObjects/POManager');
//parse converts json to javascript object
//json.stringify - converts json into json string
//JSON -> String -> Java script object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const data of dataSet) {
    test(`@web Client App with POM ${data.productName}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.validateProduct(data.productName);
        await cartPage.navigateToCheckout();

        const checkoutDetailsPage = poManager.getCheckoutDetailsPage();
        await checkoutDetailsPage.paymentDetails(data.name, data.coupon);
        await checkoutDetailsPage.selectCountry(data.countryNameToSearch, data.countryName);
        await checkoutDetailsPage.userNameCheck(data.username);
        await checkoutDetailsPage.navigateToOrderDetailsPage();

        const orderDetailsPage = poManager.getOrderDetailsPage();
        const orderNumber = await orderDetailsPage.validateOrderDetails();
        await orderDetailsPage.navigateToMyOrdersPage();

        const myOrdersPage = poManager.getMyOrderPage();
        myOrdersPage.validateOrderNumber(orderNumber);

    });
}


customtest(`Client App with POM`, async ({ browser, testDataForOrder }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.validateProduct(testDataForOrder.productName);
    await cartPage.navigateToCheckout();
})