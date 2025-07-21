import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from './DashboardPage';
import { OrderDetailsPage } from './OrderDetailsPage';
import { CartPage } from './CartPage';
import { CheckOutDetailsPage } from './CheckOutDetailsPage';
import { MyOrdersPage } from './MyOrdersPage';
import type { Page as page } from "@playwright/test";

export class POManager {
    page : page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    myOrdersPage : MyOrdersPage;
    checkoutDetailsPage : CheckOutDetailsPage;
    orderDetailsPage : OrderDetailsPage;
    
    constructor(page :Page) {
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
