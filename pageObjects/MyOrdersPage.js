const { expect } = require('@playwright/test');

class MyOrdersPage {
    constructor(page) {
        this.page = page;
        this.myOrdersTable = page.locator("tbody");
        this.myOrdersTableRows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async validateOrderNumber(orderNumber) {
        await this.myOrdersTable.waitFor();
        const rows = await this.myOrdersTableRows;

        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderNumber.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIdDetails = await this.orderIdDetails.textContent();
        expect(orderNumber.includes(orderIdDetails)).toBeTruthy();

    }
}

module.exports = { MyOrdersPage };