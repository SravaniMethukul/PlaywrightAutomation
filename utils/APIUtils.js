class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(`token obtained: ${token}`)
        return token;
    }

    async getOrderId(createOrderPayload) {
        let response = {};
        response.token = await this.getToken();
        console.log(response.token);
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: createOrderPayload,
                headers: {
                    "Authorization": response.token,
                    "content-type": "application/json"
                }
            });

        const responseJson = await orderResponse.json();
        console.log(responseJson.orders);
        const orderId = responseJson.orders[0];
        response.orderId = orderId;
        console.log(`order Id: ${orderId}`);
        return response;
    }
}
module.exports = { APIUtils };