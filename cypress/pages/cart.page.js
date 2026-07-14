class CartPage {
  verifySingleProduct({ name, expectedPriceAlias }) {
    cy.location('pathname').should('eq', '/view_cart');
    cy.get('#cart_info_table tbody tr').should('have.length', 1);

    cy.get('#cart_info_table tbody tr')
      .first()
      .within(() => {
        cy.get('.cart_description h4 a')
          .should('be.visible')
          .invoke('text')
          .then((productName) => {
            expect(productName.trim()).to.equal(name);
          });

        cy.get(`@${expectedPriceAlias}`).then((expectedPrice) => {
          cy.get('.cart_price p')
            .should('be.visible')
            .invoke('text')
            .then((cartPrice) => {
              expect(cartPrice.trim()).to.equal(expectedPrice);
            });
        });

        cy.get('.cart_quantity button')
          .should('be.visible')
          .invoke('text')
          .then((quantity) => {
            expect(quantity.trim()).to.equal('1');
          });
      });
  }
}

module.exports = new CartPage();
