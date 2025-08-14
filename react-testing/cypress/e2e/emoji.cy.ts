describe('Emoji Explorer', () => {
  it('navigates and opens the details dialog', () => {
    cy.visit('/');
    cy.findByRole('textbox', { name: /search emoji/i }).type('heart');
    cy.findByRole('main', { name: /emoji explorer/i }).focus().type('{rightarrow}{rightarrow}{enter}');
    cy.findByRole('dialog', { name: /emoji details/i }).should('exist');
  });
});


