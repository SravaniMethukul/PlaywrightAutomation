Feature: Ecommerce Validations

    @Regression
    Scenario: Placing the Order
        Given a login to the ecommerce application with "saisra123@gmail.com" and "Sai@1234"
        When add a product to the cart "ZARA COAT 3"
        Then Verify "ZARA COAT 3" is added to the cart
        When Enter valid details and proceed to checkout with "Sravani" and "rahulshettyacademy" and "Ind" and " India" and "saisra123@gmail.com"
        Then Verify the order is present in the order history

    @Validation
    Scenario Outline:
        Given a login to the ecommerce1 application with "<username>" and "<password>"
        Then verify Error message is displayed

        Examples:
            | username    | password    |
            | rahulshetty | learning    |
            | User123     | learning123 |


