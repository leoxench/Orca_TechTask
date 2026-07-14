Скопіюй цей текст повністю в `README.md`:

````markdown
# Cypress Automation Test Assignment

<p align="center">
  End-to-end Cypress automation project for the Automation Exercise demo e-commerce website.
</p>

<p align="center">
  <strong>Candidate:</strong> Leonid Ksenchuk<br>
  <strong>Company:</strong> Orca<br>
  <strong>Position:</strong> AQA Engineer<br>
  <strong>Assignment:</strong> Technical Test
</p>

---

## Overview

This project contains one Cypress end-to-end automated test for the public [Automation Exercise](https://automationexercise.com/) e-commerce website.

The test validates that the `Blue Top` product can be added to the cart and that the product information displayed in the cart matches the information shown on the Products page.

## Covered Scenario

The automated test performs the following steps:

1. Opens the Automation Exercise website.
2. Navigates to the Products page.
3. Finds the `Blue Top` product.
4. Captures the displayed product price.
5. Adds `Blue Top` to the cart.
6. Opens the cart from the confirmation modal.
7. Verifies the product details in the cart.

## Assertions

The test verifies that:

- the product name is `Blue Top`;
- the product price is displayed;
- the cart price matches the price captured before adding the product;
- the quantity is `1`;
- only one product row is displayed in the cart;
- the displayed cart product is the expected product.

## Tech Stack

| Technology | Usage |
|---|---|
| Cypress 15 | End-to-end test automation |
| JavaScript | Test implementation |
| Node.js 20+ | Runtime environment |
| npm | Dependency and script management |

## Project Structure

```text
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
```

## Prerequisites

Install Node.js 20 or newer.

Verify the installed versions:

```bash
node -v
npm -v
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Open the project folder:

```bash
cd <project-folder>
```

Install the dependencies:

```bash
npm install
```

## Running the Tests

### Headless Mode

Run all Cypress tests:

```bash
npm test
```

Alternatively:

```bash
npm run cy:run
```

Run only the required cart test:

```bash
npx cypress run --spec "cypress/e2e/cart.cy.js"
```

### Interactive Mode

Open the Cypress Test Runner:

```bash
npm run cy:open
```

Then:

1. Select `E2E Testing`.
2. Choose a browser.
3. Click `Start E2E Testing`.
4. Select `cart.cy.js`.

## Test Approach

The solution is implemented as one readable end-to-end business scenario.

Page Object classes are used to separate reusable page interactions from the test flow.

| File | Responsibility |
|---|---|
| `products.page.js` | Products page navigation, product lookup, price capture, and add-to-cart behavior |
| `cart.page.js` | Cart content and product detail validations |
| `cart.cy.js` | Required end-to-end business scenario |

This structure keeps the test readable, maintainable, and free from unnecessary duplication.

## Key Decisions

### Dynamic Price Validation

The product price is not hardcoded.

The test reads the price displayed for `Blue Top` on the Products page, stores it using a Cypress alias, and compares it with the price displayed in the cart.

This keeps the test valid if the demo website changes the product price.

### Scoped Selectors

The product is located by its visible name:

```javascript
cy.contains('.productinfo p', productName);
```

After locating `Blue Top`, the price and add-to-cart selectors are scoped to the same product container.

This prevents the test from interacting with controls belonging to another product.

### Stable Products Navigation Selector

The Products navigation link contains both an icon and visible text:

```html
<a href="/products">
  <i class="material-icons card_travel"></i>
  Products
</a>
```

A strict text selector initially failed because the nested icon affected the complete element text.

The navigation selector was updated to use the destination attribute:

```javascript
cy.get('a[href="/products"]');
```

This is more stable than matching the complete visible text.

### Cypress Actionability

The website contains a visible add-to-cart button and another add-to-cart control inside a hover overlay.

The test scopes the selector to the visible `.productinfo` container and verifies that the button is visible before clicking it.

The test does not use forced clicks:

```javascript
{ force: true }
```

This preserves Cypress actionability checks and better represents real user behavior.

### No Hardcoded Waits

The project does not use fixed waits such as:

```javascript
cy.wait(3000);
```

Instead, it relies on Cypress retryability.

Commands and assertions automatically retry until the expected condition is met or the configured timeout is reached.

### UI State Validation

The test validates important page states before continuing:

- Products page URL;
- `All Products` heading;
- confirmation modal visibility;
- `Added!` confirmation message;
- cart URL;
- cart row count;
- product name;
- product price;
- quantity.

## Cart Isolation

A normal Cypress test run starts with a clean browser context.

The test also explicitly verifies that the cart contains exactly one product row:

```javascript
cy.get('#cart_info_table tbody tr')
  .should('have.length', 1);
```

Unexpected existing products or duplicate products therefore cause the test to fail.

## Public Website Considerations

Automation Exercise is a public demo website.

Its behavior may occasionally be affected by:

- slow responses;
- third-party advertisements;
- temporary availability issues;
- HTML markup changes;
- CSS class changes;
- page structure changes.

The project does not use:

- anti-bot bypasses;
- CAPTCHA-solving tools;
- payment actions;
- real personal information;
- unnecessary forced interactions.

During implementation, the Products navigation selector required an update because the menu link contained a nested icon and did not match a strict Products-only regular expression.

The issue was handled by selecting the link through its `href` attribute:

```javascript
cy.get('a[href="/products"]');
```

If the public website markup changes again, selectors should be updated in the Page Object files without changing the main business assertions.

## Test Result

The required test was executed successfully:

```text
Tests: 1
Passing: 1
Failing: 0
All specs passed
```

The successful headless execution completed in approximately three seconds.

## Deliverables

The assignment can be submitted as:

- a GitHub repository link;
- a ZIP archive without `node_modules`, Cypress screenshots, and Cypress videos.

Recommended archive name:

```text
Leonid-Ksenchuk-Orca-Cypress-Assignment.zip
```

## Author

**Leonid Ksenchuk**

Technical assignment prepared for Orca.
````
