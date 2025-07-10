const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require('../utils/APIUtils');
const loginPayload = { userEmail: "saisra123@gmail.com", userPassword: "Sai@1234" };
const createOrderPayload = { "orders": [{ "country": "Cuba", "productOrderedId": "67a8dde5c0d3e6622a297cc8" }] };
let response;
let token;

test.beforeAll('BeforeAll Test', async ({ }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.getOrderId(createOrderPayload);
    token = response.token;
})

test('Security test request intercept', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    //add token to local storage
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        //when we encounter the above url , continue with url mentioned below instead of the other url
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    )

    await page.locator("button:has-text('View')").nth(0).click();
    await page.pause();
    const text = await page.locator("p").last().textContent();
    console.log(text);
    expect(text).toEqual("You are not authorize to view this order");

})