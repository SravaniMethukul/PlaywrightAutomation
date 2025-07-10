const { test } = require('@playwright/test');

exports.customtest = test.extend({
    testDataForOrder: {
        //this is java script object not JSON object
        username: "saisra123@gmail.com",
        password: "Sai@1234",
        productName: "ZARA COAT 3",
        coupon: "rahulshettyacademy",
        name: "Sravani",
        countryName: " India",
        countryNameToSearch: "Ind"
    }
})