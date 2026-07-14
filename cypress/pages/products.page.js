class ProductsPage {
  visitFromHome() {
    cy.visit('/');

    cy.get('a[href="/products"]')
      .should('be.visible')
      .click();

    cy.location('pathname').should('eq', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
  }

  productCard(productName) {
    return cy
      .contains('.productinfo p', productName)
      .should('be.visible')
      .closest('.productinfo');
  }

  captureDisplayedPrice(productName, alias = 'expectedProductPrice') {
    this.productCard(productName)
      .find('h2')
      .should('be.visible')
      .invoke('text')
      .then((price) => price.trim())
      .as(alias);
  }

  addToCart(productName) {
    this.productCard(productName)
      .scrollIntoView()
      .within(() => {
        cy.get('.add-to-cart')
          .should('be.visible')
          .click();
      });

    cy.get('#cartModal')
      .should('be.visible')
      .within(() => {
        cy.contains('h4', 'Added!').should('be.visible');

        cy.get('a[href="/view_cart"]')
          .should('be.visible')
          .click();
      });

    cy.location('pathname').should('eq', '/view_cart');
  }
}

module.exports = new ProductsPage();