Feature: Ecommerce Error Validations

    @Validation
    @foo
    Scenario Outline:
        Given a login to the ecommerce1 application with "<username>" and "<password>"
        Then verify Error message is displayed

        Examples:
            | username    | password    |
            | rahulshetty | learning    |
            | User123     | learning123 |
