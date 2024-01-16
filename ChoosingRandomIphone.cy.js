/// <reference types="cypress" />

const clickRandomProduct = () => {
  cy.get('.card-body-inner > .woocommerce-LoopProduct-link > .woocommerce-loop-product__title').then(elements => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * elements.length);
    } while ([3, 4, 5, 6, 7, 11].includes(randomIndex));

    cy.get('.card-body-inner > .woocommerce-LoopProduct-link > .woocommerce-loop-product__title')
      .eq(randomIndex)
      .click();
  });
};

 const compareProductTitle = () => {
  cy.get('.product_title').invoke('text').then((title) => {
    cy.get(':nth-child(16) > strong').invoke('text').then((colorCheck) => {
      expect(title).to.contain(colorCheck);
    });
  });
};

 const chooseRandomQuantityAndAddToCart = () => {
  const quantities = ['1', '3', '6'];
  const randomQuantity = quantities[Math.floor(Math.random() * quantities.length)];
  cy.get('.input-text').clear().type(randomQuantity);
  cy.get('.single_add_to_cart_button').click();
  return randomQuantity;
};

 const verifyCartContents = (expectedQuantity) => {
  cy.get('.footer-cart-contents > .cart-items-count').invoke('text').should('eq', expectedQuantity);
};

describe('Choosing Random Iphone and Random Quantity ', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Test Apple Phones', () => {
    cy.visit('https://leaders.jo/en/buy-apple-products-online/');

    clickRandomProduct();

    compareProductTitle();

    const randomQuantity = chooseRandomQuantityAndAddToCart();

    verifyCartContents(randomQuantity);

    cy.get('.footer-cart-contents').click();
    cy.screenshot();
  });
});
