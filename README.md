Cypress Automation Test Assignment
Candidate Information
Field	Details
Candidate	Leonid Ksenchuk
Company	Orca
Position	AQA Engineer
Assignment	Technical Test
Overview

This project contains one Cypress end-to-end automated test for the public Automation Exercise e-commerce website:

Automation Exercise

The test validates that the Blue Top product can be added to the cart and that the product information displayed in the cart matches the information shown on the Products page.

Covered Scenario
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
Tech Stack
Cypress 15
JavaScript
Node.js 20 or newer
npm
Project Structure
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

Verify the installed versions:

node -v
npm -v
Installation

Clone the repository or extract the ZIP archive.

Open the project folder in Terminal and install the dependencies:

npm install
Running the Tests
Headless Mode

Run all Cypress tests:

npm test

Alternatively:

npm run cy:run

Run only the required cart test:

npx cypress run --spec "cypress/e2e/cart.cy.js"
Interactive Mode

Open the Cypress Test Runner:

npm run cy:open

Then:

Select E2E Testing.
Choose a browser.
Click Start E2E Testing.
Select cart.cy.js.
Test Approach

The solution is implemented as one readable end-to-end business scenario.

Page Object classes are used to separate reusable page interactions from the test flow:

File	Responsibility
products.page.js	Products page navigation, product lookup, price capture, and add-to-cart behavior
cart.page.js	Cart validations
cart.cy.js	Required business scenario

This structure keeps the test readable and reduces duplication.

Key Decisions
Dynamic Price Validation

The Blue Top price is not hardcoded.

The test reads the price displayed on the Products page, stores it using a Cypress alias, and compares it with the price displayed in the cart.

This allows the test to remain valid if the demo website changes the product price.

Scoped Selectors

The product is located by its visible name:

cy.contains('.productinfo p', productName);

After locating Blue Top, the price and add-to-cart selectors are scoped to the same product container.

This prevents the test from interacting with elements belonging to another product.

Products Navigation Selector

The Products menu item contains both an icon and visible text:

<a href="/products">
  <i class="material-icons card_travel"></i>
  Products
</a>

A strict text selector initially failed because the nested icon affected the complete element text.

The navigation selector was updated to use the link destination:

cy.get('a[href="/products"]');

This selector is more stable than matching the complete visible text.

Cypress Actionability

The website contains a visible add-to-cart button and another add-to-cart button inside a hover overlay.

The test scopes the selector to the visible .productinfo container and verifies that the button is visible before clicking it.

The test does not use forced clicks:

{ force: true }

This preserves Cypress actionability checks and better represents real user behavior.

No Hardcoded Waits

The project does not use fixed waits such as:

cy.wait(3000);

Instead, it relies on Cypress retryability.

Commands and assertions automatically retry until the expected condition is met or the configured timeout is reached.

UI State Validation

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
Cart Isolation

A normal Cypress test run starts with a clean browser context.

The test also explicitly verifies that the cart contains exactly one product row:

cy.get('#cart_info_table tbody tr')
  .should('have.length', 1);

Unexpected existing products or duplicate products therefore cause the test to fail.

Public Website Considerations

Automation Exercise is a public demo website.

Its behavior may occasionally be affected by:

slow responses;
third-party advertisements;
temporary availability issues;
HTML markup changes;
CSS class changes;
page structure changes.

The project does not use:

anti-bot bypasses;
CAPTCHA-solving tools;
payment actions;
real personal information;
unnecessary forced interactions.

During implementation, the Products navigation selector required an update because the menu link contained a nested icon and its text did not match a strict Products-only regular expression.

The issue was handled by selecting the link through its href attribute:

cy.get('a[href="/products"]');

If the public website markup changes again, the selectors should be updated in the Page Object files without changing the main business assertions.

Test Result

The required test was executed successfully:

Tests: 1
Passing: 1
Failing: 0
All specs passed

The successful headless execution completed in approximately three seconds.

Deliverables

The project can be submitted as:

a GitHub repository link;
a ZIP archive without node_modules, Cypress screenshots, and Cypress videos.

Recommended archive name:

Leonid-Ksenchuk-Orca-Cypress-Assignment.zip
Author

Leonid Ksenchuk

Technical assignment prepared for Orca.
