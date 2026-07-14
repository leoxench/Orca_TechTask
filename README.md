Cypress Automation Test Assignment

Candidate: Leonid Ksenchuk
Company: Orca
Position: AQA Engineer
Assignment type: Technical test

This project contains one Cypress end-to-end automated test for the public Automation Exercise e-commerce website:

https://automationexercise.com/

The test validates that the Blue Top product can be added to the cart and that the product details displayed in the cart match the information shown on the Products page.

Covered scenario
Open the Automation Exercise website.
Navigate to the Products page.
Find the Blue Top product.
Capture the displayed product price.
Add Blue Top to the cart.
Open the cart from the confirmation modal.
Verify the product details in the cart.
Assertions

The automated test verifies that:

the product name is Blue Top;
the product price is displayed;
the cart price matches the price captured before adding the product;
the quantity is 1;
only one product row is displayed in the cart;
the displayed cart product is the expected Blue Top product.
Tech stack
Cypress 15
JavaScript
Node.js 20 or newer
npm
Project structure
cypress/
├── e2e/
│   └── cart.cy.js
├── pages/
│   ├── cart.page.js
│   └── products.page.js
└── support/
    └── e2e.js
cypress.config.js
package.json
package-lock.json
README.md
Prerequisites

Install Node.js 20 or newer.

Verify the installation:

node -v
npm -v
Installation

Clone the repository or extract the ZIP archive.

Open the project folder in Terminal and install dependencies:

npm install
Run the test in headless mode

Run all Cypress tests:

npm test

or:

npm run cy:run

Run only the required cart test:

npx cypress run --spec "cypress/e2e/cart.cy.js"
Run the test interactively

Open Cypress Test Runner:

npm run cy:open

Then:

Select E2E Testing.
Choose a browser.
Click Start E2E Testing.
Select cart.cy.js.
Test approach

The test is implemented as one readable business scenario.

Page Object classes are used to separate reusable page interactions from test assertions:

products.page.js contains Products page behavior;
cart.page.js contains cart verification behavior;
cart.cy.js contains the required test scenario.

This keeps the test easy to read and reduces duplication.

Key decisions
Dynamic price validation

The Blue Top price is not hardcoded.

The test reads the price displayed on the Products page, stores it using a Cypress alias, and compares it with the price displayed in the cart.

This ensures that the test remains valid if the demo website changes the product price.

Scoped selectors

The product is found by its visible name:

cy.contains('.productinfo p', productName)

After locating Blue Top, price and button selectors are scoped to the same product container.

This prevents the test from interacting with controls belonging to another product.

Products navigation selector

The Products menu item contains an icon and text:

<a href="/products">
  <i class="material-icons card_travel"></i>
  Products
</a>

A strict text selector initially failed because the nested icon affected the element text.

The navigation selector was updated to use the link destination:

cy.get('a[href="/products"]')

This is more stable than matching the complete visible text.

Cypress actionability

The website contains a visible add-to-cart button and another button inside a hover overlay.

The test scopes the selector to the visible .productinfo container and verifies that the button is visible before clicking it.

The test does not use:

{ force: true }

This preserves Cypress actionability checks and better represents real user behavior.

No hardcoded waits

The project does not use fixed waits such as:

cy.wait(3000)

Cypress retryability is used instead.

Commands and assertions automatically retry until the expected condition is met or the configured timeout is reached.

UI state validation

The test verifies important page states before continuing:

Products page URL;
All Products heading;
confirmation modal visibility;
Added confirmation message;
cart URL;
cart row count;
product name;
product price;
quantity.
Cart isolation

A Cypress test run normally starts with a clean browser context.

The test also explicitly verifies that the cart contains exactly one product row:

cy.get('#cart_info_table tbody tr').should('have.length', 1);

Therefore, unexpected existing products or duplicate products cause the test to fail.

Public website considerations

Automation Exercise is a public demo website.

Its behavior may occasionally be affected by:

slow responses;
third-party advertisements;
temporary availability issues;
changes to HTML markup;
changes to CSS classes or page structure.

The project does not use:

anti-bot bypasses;
CAPTCHA-solving tools;
payment actions;
real personal information;
unnecessary forced interactions.

During implementation, the Products navigation selector required an update because the menu link contained a nested icon and its text did not match a strict Products-only regular expression.

The issue was handled by selecting the link through its href attribute:

cy.get('a[href="/products"]')

If the public website markup changes again, selectors should be updated in the Page Object files without changing the main business assertions.

Test result

The required test was executed successfully:

Tests: 1
Passing: 1
Failing: 0
All specs passed

The successful headless execution completed in approximately three seconds.

Deliverables

The project can be submitted as:

a GitHub repository link; or
a ZIP archive without node_modules, Cypress screenshots, and Cypress videos.

Recommended archive name:

Leonid-Ksenchuk-Orca-Cypress-Assignment.zip
Author

Leonid Ksenchuk

Technical assignment prepared for Orca.
