import { expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";


export class CartPage {
    page: Page;
    productList : Locator;
    checkOutButton : Locator;
    constructor(page :Page) {
        this.page = page;
        this.productList = page.locator("div li");
        this.checkOutButton = page.locator("text=Checkout");
    }

    async validateProduct(productName :string) {
        await this.productList.first().waitFor({ state: 'visible' });
        const bool = await (await this.getProductLocator(productName)).isVisible();
        expect(bool).toBeTruthy();
    }

    async getProductLocator(productName :string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async navigateToCheckout() {
        await this.checkOutButton.click();
    }
}
