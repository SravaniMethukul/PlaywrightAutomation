const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator("div li");
        this.checkOutButton = page.locator("text=Checkout");
    }

    async validateProduct(productName) {
        await this.productList.first().waitFor({ state: 'visible' });
        const bool = await (await this.getProductLocator(productName)).isVisible();
        expect(bool).toBeTruthy();
    }

    async getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async navigateToCheckout() {
        await this.checkOutButton.click();
    }
}

module.exports = { CartPage };