describe('Emoji Grid - Keyboard Navigation', () => {
  beforeEach(() => {
    cy.viewport(1000, 800);
    cy.visit('/');
    // Ensure grid is rendered
    cy.findByRole('grid', { name: /emojis/i }).should('exist');
    // Focus the first cell so key events bubble to the grid handler
    cy.findAllByRole('gridcell').first().focus();
    cy.findAllByRole('gridcell').first().should('have.focus');
  });

  const moveRight = (times: number) => {
    if (times <= 0) return;
    const seq = Array(times).fill('{rightarrow}').join('');
    cy.focused().type(seq);
  };

  it('moves horizontally with ArrowRight and ArrowLeft', () => {
    // Right to second item
    cy.focused().type('{rightarrow}');
    cy.findAllByRole('gridcell').eq(1).should('have.focus');

    // Left back to first
    cy.focused().type('{leftarrow}');
    cy.findAllByRole('gridcell').eq(0).should('have.focus');
  });

  it('moves vertically by the number of columns with ArrowDown/ArrowUp', () => {
    // Compute columns by counting items in the first row
    cy.findByRole('grid').then(($grid) => {
      const cells = $grid.find('[role="gridcell"]').toArray() as HTMLElement[];
      const firstTop = Math.round(cells[0].getBoundingClientRect().top);
      let cols = 0;
      for (const el of cells) {
        if (Math.round(el.getBoundingClientRect().top) !== firstTop) break;
        cols += 1;
      }

      // Down moves focus by columns
      cy.focused().type('{downarrow}');
      cy.findAllByRole('gridcell').eq(cols).should('have.focus');

      // Up returns to original
      cy.focused().type('{uparrow}');
      cy.findAllByRole('gridcell').eq(0).should('have.focus');
    });
  });

  it('Home and End jump to first and last items', () => {
    // Move to third, then Home to first
    moveRight(2);
    cy.findAllByRole('gridcell').eq(2).should('have.focus');
    cy.focused().type('{home}');
    cy.findAllByRole('gridcell').eq(0).should('have.focus');

    // End to last
    cy.findAllByRole('gridcell').then(($cells) => {
      const last = $cells.length - 1;
      cy.focused().type('{end}');
      cy.findAllByRole('gridcell').eq(last).should('have.focus');
    });
  });

  it('does not overflow at boundaries (left/up at start, right/down at end)', () => {
    // At first cell, Left/Up keep focus
    cy.focused().type('{leftarrow}{uparrow}');
    cy.findAllByRole('gridcell').eq(0).should('have.focus');

    // Jump to last and try Right/Down
    cy.findAllByRole('gridcell').then(($cells) => {
      const last = $cells.length - 1;
      cy.focused().type('{end}');
      cy.findAllByRole('gridcell').eq(last).should('have.focus');
      cy.focused().type('{rightarrow}{downarrow}');
      cy.findAllByRole('gridcell').eq(last).should('have.focus');
    });
  });
});


