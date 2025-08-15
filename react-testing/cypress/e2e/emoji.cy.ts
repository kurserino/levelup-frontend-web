describe('Emoji Explorer', () => {
  it('navigates and opens the details dialog', () => {
    cy.visit('/');
    cy.findByRole('textbox', { name: /search emoji/i }).type('heart');
    // Focus the first gridcell before navigating with arrows
    cy.findAllByRole('gridcell').first().focus();
    // Type on the focused gridcell so key events bubble to the grid handler
    cy.findAllByRole('gridcell').first().type('{rightarrow}{rightarrow}{enter}');
    cy.findByRole('dialog', { name: /details/i }).should('exist');
  });
});


