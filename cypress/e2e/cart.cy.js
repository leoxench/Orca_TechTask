const productsPage = require('../pages/products.page');
const cartPage = require('../pages/cart.page');

describe('Shopping cart', () => {
  it('adds Blue Top and verifies its cart details', () => {
    const productName = 'Blue Top';
    const priceAlias = 'blueTopPrice';

    productsPage.visitFromHome();
    productsPage.captureDisplayedPrice(productName, priceAlias);
    productsPage.addToCart(productName);

    cartPage.verifySingleProduct({
      name: productName,
      expectedPriceAlias: priceAlias,
    });
  });
});
