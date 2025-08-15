describe('Emoji Explorer - Filtering', () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
    cy.visit('/');
    cy.findByRole('grid', { name: /emojis/i }).should('exist');
  });

  it('filters by name', () => {
    cy.findByRole('textbox', { name: /search emoji/i }).type('moon');
    cy.findAllByRole('gridcell').should('have.length', 1);
    cy.findAllByRole('gridcell').first().contains(/moon/i);
  });

  it('is case-insensitive', () => {
    cy.findByRole('textbox', { name: /search emoji/i }).type('mOoN');
    cy.findAllByRole('gridcell').should('have.length', 1);
    cy.findAllByRole('gridcell').first().contains(/moon/i);
  });

  it('filters by emoji character', () => {
    cy.findByRole('textbox', { name: /search emoji/i }).type('🔥');
    cy.findAllByRole('gridcell').should('have.length', 1);
    cy.findAllByRole('gridcell').first().contains(/fire/i);
  });

  it('clearing the input resets the list', () => {
    cy.findAllByRole('gridcell').its('length').should('be.greaterThan', 1);
    cy.findByRole('textbox', { name: /search emoji/i }).type('pizza');
    cy.findAllByRole('gridcell').should('have.length', 1);
    cy.findByRole('textbox', { name: /search emoji/i }).clear();
    cy.findAllByRole('gridcell').its('length').should('be.greaterThan', 1);
  });

  it('shows empty result when no match', () => {
    cy.findByRole('textbox', { name: /search emoji/i }).type('zzzzzz');
    cy.findAllByRole('gridcell').should('have.length', 0);
  });
});


