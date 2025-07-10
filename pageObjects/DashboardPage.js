class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName) {
        await this.products.first().waitFor(); // waits until this element is showed up
        const titles = await this.productsText.allTextContents();
        console.log(titles);

        const count = await this.products.count();

        //select product name Zara Coat 3
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { DashboardPage };