import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { EmojiGrid } from './EmojiGrid';

const EMOJIS = [
  { name: 'Heart', char: '❤️', category: 'Symbols' },
  { name: 'Smile', char: '😊', category: 'Faces' },
  { name: 'Star', char: '⭐', category: 'Symbols' },
];

describe('EmojiGrid', () => {
  it('calls onSelect when a gridcell is clicked', () => {
    const onSelect = vi.fn();
    render(<EmojiGrid emojis={EMOJIS} onSelect={onSelect} />);
    const cells = screen.getAllByRole('gridcell');
    fireEvent.click(cells[1]);
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});


