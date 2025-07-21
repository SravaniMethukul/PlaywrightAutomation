import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;    
    coupon: string;
    name: string;
    countryName: string;
    countryNameToSearch: string;
}

export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
    testDataForOrder  : {
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