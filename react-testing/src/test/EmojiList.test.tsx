import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '../app/page';

describe('Emoji Explorer', () => {
  it('filters by text and navigates with keyboard', async () => {
    const user = userEvent.setup();
    render(<Page />);

    const search = screen.getByRole('textbox', { name: /search emoji/i });
    await user.type(search, 'heart');

    const grid = screen.getByRole('grid', { name: /emojis/i });
    expect(grid).toBeInTheDocument();

    // focus first emoji cell to start keyboard navigation
    const firstCell = grid.querySelector('[role="gridcell"]') as HTMLElement;
    firstCell.focus();
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    fireEvent.keyDown(grid, { key: 'Enter' });

    expect(await screen.findByRole('dialog', { name: /details/i })).toBeInTheDocument();
  });
});


