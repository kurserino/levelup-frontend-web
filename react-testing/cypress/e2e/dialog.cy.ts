describe('Emoji Dialog - Navigation and Interactions', () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
    cy.visit('/');
    cy.findByRole('grid', { name: /emojis/i }).should('exist');
  });

  it('opens the dialog from the grid and navigates with ArrowRight/ArrowLeft', () => {
    // Focus first cell then move to third item and open
    cy.findAllByRole('gridcell').first().focus();
    cy.focused().type('{rightarrow}{rightarrow}{enter}');

    cy.findByRole('dialog', { name: /details/i }).should('exist');
    // Initially on the 3rd item (Heart)
    cy.findByRole('dialog', { name: /details/i }).within(() => {
      cy.findByText(/heart/i).should('exist');
    });

    // ArrowRight -> next emoji (Fire)
    cy.findByRole('dialog', { name: /details/i }).type('{rightarrow}');
    cy.findByRole('dialog', { name: /details/i }).within(() => {
      cy.findByText(/fire/i).should('exist');
    });

    // ArrowLeft -> back to Heart
    cy.findByRole('dialog', { name: /details/i }).type('{leftarrow}');
    cy.findByRole('dialog', { name: /details/i }).within(() => {
      cy.findByText(/heart/i).should('exist');
    });
  });

  it('navigates using Previous/Next buttons and respects disabled states at boundaries', () => {
    // Open first item
    cy.findAllByRole('gridcell').first().click();
    cy.findByRole('dialog', { name: /details/i }).should('exist');

    // Previous button should be disabled at first item
    cy.findByRole('button', { name: /previous emoji/i }).should('be.disabled');
    cy.findByRole('button', { name: /next emoji/i }).should('not.be.disabled');

    // Click Next once -> second item (Laugh). Dialog should not show Smile anymore
    cy.findByRole('button', { name: /next emoji/i }).click();
    cy.findByRole('dialog', { name: /details/i }).within(() => {
      cy.findByText(/smile/i).should('not.exist');
      cy.findByText(/laugh/i).should('exist');
    });

    // Now go back with Previous -> Smile again
    cy.findByRole('button', { name: /previous emoji/i }).click();
    cy.findByRole('dialog', { name: /details/i }).within(() => {
      cy.findByText(/smile/i).should('exist');
    });

    // Close dialog and open last item to test end boundary
    cy.findByRole('button', { name: /close dialog/i }).click();
    cy.findByRole('dialog', { name: /details/i }).should('not.exist');

    // Focus first cell, jump to last with End and open
    cy.findAllByRole('gridcell').first().focus();
    cy.focused().type('{end}{enter}');
    cy.findByRole('dialog', { name: /details/i }).should('exist');

    // Next should be disabled at last item
    cy.findByRole('button', { name: /next emoji/i }).should('be.disabled');
    cy.findByRole('button', { name: /previous emoji/i }).should('not.be.disabled');
  });

  it('closes with Escape and via Close button', () => {
    // Open via click
    cy.findAllByRole('gridcell').eq(2).click();
    cy.findByRole('dialog', { name: /details/i }).should('exist');

    // Close with ESC
    cy.findByRole('dialog', { name: /details/i }).type('{esc}');
    cy.findByRole('dialog', { name: /details/i }).should('not.exist');

    // Open again and close via button
    cy.findAllByRole('gridcell').eq(1).click();
    cy.findByRole('dialog', { name: /details/i }).should('exist');
    cy.findByRole('dialog', { name: /details/i }).within(() => {
      cy.findByText(/laugh|smile/i).should('exist');
    });
    cy.findByRole('button', { name: /close dialog/i }).click();
    cy.findByRole('dialog', { name: /details/i }).should('not.exist');
  });
});


