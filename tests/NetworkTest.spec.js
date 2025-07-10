const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require('../utils/APIUtils');
const loginPayload = { userEmail: "saisra123@gmail.com", userPassword: "Sai@1234" };
const createOrderPayload = { "orders": [{ "country": "Cuba", "productOrderedId": "67a8dde5c0d3e6622a297cc8" }] };
let response;
let token;
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll('BeforeAll Test', async ({ }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.getOrderId(createOrderPayload);
    token = response.token;
})


test('Mock Network response', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //add token to local storage
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response - Api response -> (fakeResponse)-> browser -> render the data on front end
            const response = await page.request.fetch(route.request()); //real response
            const body = JSON.stringify(fakePayLoadOrders); // converts javascript to json script
            route.fulfill({
                response,
                body, // here overriding the body with body of response
            }) //it sends response back to browser (here we need to fake response)
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

});


