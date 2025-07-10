const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require('./DashboardPage');
const { OrderDetailsPage } = require('./OrderDetailsPage');
const { CartPage } = require('./CartPage');
const { CheckOutDetailsPage } = require('./CheckOutDetailsPage');
const { MyOrdersPage } = require('./MyOrdersPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
        this.checkoutDetailsPage = new CheckOutDetailsPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getMyOrderPage() {
        return this.myOrdersPage;
    }

    getCheckoutDetailsPage() {
        return this.checkoutDetailsPage;
    }

    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }

}

module.exports = { POManager };