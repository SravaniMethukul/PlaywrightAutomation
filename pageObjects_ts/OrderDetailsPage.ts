import { expect, Locator, Page } from "@playwright/test";

export class OrderDetailsPage {
    page:Page;
    toastMessage: Locator;
    thankYouText: Locator;
    orderNumber: Locator;
    myOrdersLink: Locator;

    constructor(page :Page) {
        this.page = page;
        this.toastMessage = page.locator(".toast-title");
        this.thankYouText = page.locator(".hero-primary");
        this.orderNumber = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersLink = page.locator("button[routerlink*='myorders']");
    }

    async validateOrderDetails() {
        await this.toastMessage.waitFor();
        await expect(this.thankYouText).toBeVisible();
        await expect(this.thankYouText).toHaveText(" Thankyou for the order. ");

        const orderNumber = await this.orderNumber.textContent();
        return orderNumber;
    }

    async navigateToMyOrdersPage() {
        await this.myOrdersLink.click();
    }
}
