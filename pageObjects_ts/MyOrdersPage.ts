import { expect, Locator, Page } from "@playwright/test";

export class MyOrdersPage {
    page: Page;
    myOrdersTable: Locator;
    myOrdersTableRows: Locator;
    orderIdDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myOrdersTable = page.locator("tbody");
        this.myOrdersTableRows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async validateOrderNumber(orderNumber: string) {
        await this.myOrdersTable.waitFor();
        const rows = await this.myOrdersTableRows;

        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if ( rowOrderId && orderNumber.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIdDetailsText = await this.orderIdDetails.textContent();
         expect(orderIdDetailsText && orderNumber.includes(orderIdDetailsText)).toBeTruthy();

    }
}
