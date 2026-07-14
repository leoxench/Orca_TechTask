# Cypress Automation Test Assignment

A compact Cypress end-to-end automation project created for the Orca AQA Engineer technical assignment.

Candidate: Leonid Ksenchuk  
Company: Orca  
Position: AQA Engineer  

---

## Overview

This project validates the cart flow on the public demo e-commerce website:

https://automationexercise.com/

The automated test finds the Blue Top product, stores its displayed price, adds it to the cart, and verifies that the cart contains the expected product information.

## Test Scenario

1. Open the website.
2. Navigate to the Products page.
3. Find Blue Top.
4. Capture the displayed product price.
5. Add Blue Top to the cart.
6. Open the cart from the confirmation modal.
7. Verify the cart content.

## Assertions

The test confirms that:

- the product name is Blue Top;
- the product price is displayed;
- the cart price matches the price shown before adding the product;
- the quantity is 1;
- only one product is displayed in the cart.

## Tech Stack

| Technology | Purpose |
|---|---|
| Cypress 15 | End-to-end test automation |
| JavaScript | Test implementation |
| Node.js 20+ | Runtime environment |
| npm | Dependency management |

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

## Installation

Clone the repository or extract the ZIP archive.

Install dependencies:

```bash
npm install
```

## Running the Test

Run all tests in headless mode:

```bash
npm test
```

Alternative command:

```bash
npm run cy:run
```

Run only the cart test:

```bash
npx cypress run --spec "cypress/e2e/cart.cy.js"
```

Open Cypress in interactive mode:

```bash
npm run cy:open
```

Then select E2E Testing, choose a browser, and open cart.cy.js.

## Approach

The project uses a small Page Object structure:

| File | Responsibility |
|---|---|
| products.page.js | Products navigation, product lookup, price capture, and add-to-cart actions |
| cart.page.js | Cart content validation |
| cart.cy.js | Main end-to-end scenario |

This keeps the test readable and separates page interactions from business assertions.

## Key Decisions

### Dynamic Price Validation

The product price is captured directly from the Products page and compared with the cart price.

The value Rs. 500 is not hardcoded, so the test remains valid if the demo website changes the price.

### Stable Selectors

The Products menu link contains both an icon and text. A strict text selector was unreliable, so the test uses:

```javascript
cy.get('a[href="/products"]');
```

The Blue Top product is located by its visible name:

```javascript
cy.contains('.productinfo p', productName);
```

Price and add-to-cart selectors are then scoped to the same product container.

### Cypress Actionability

The website contains a visible add-to-cart button and another button inside a hover overlay.

The test interacts with the visible button and does not use forced clicks.

### No Hardcoded Waits

The project does not use fixed waits such as cy.wait(3000).

Cypress retryability and assertions are used instead.

### Cart Validation

The test verifies:

- Products page URL;
- All Products heading;
- confirmation modal;
- Added message;
- cart URL;
- product row count;
- product name;
- product price;
- quantity.

The cart must contain exactly one product row.

## Public Website Considerations

Automation Exercise is a public demo website. Its behavior may be affected by slow responses, advertisements, temporary availability issues, or markup changes.

The project does not use:

- anti-bot bypasses;
- CAPTCHA-solving tools;
- payment actions;
- real personal information;
- unnecessary forced interactions.

During implementation, the Products navigation selector was updated because the original strict text selector did not match the link reliably due to a nested icon.

If the website markup changes, selectors should be updated in the Page Object files without changing the main scenario assertions.

## Test Result

```text
Tests: 1
Passing: 1
Failing: 0
All specs passed
```

The successful headless run completed in approximately three seconds.

## Author

Leonid Ksenchuk

Technical assignment prepared for Orca.
