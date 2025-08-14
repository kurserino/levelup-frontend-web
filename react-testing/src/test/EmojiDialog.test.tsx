import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmojiDialog } from '../components/EmojiDialog/EmojiDialog';

const sample = { name: 'Heart', char: '❤️', category: 'Symbols' };

describe('EmojiDialog', () => {
  it('renders details when open', () => {
    render(<EmojiDialog open emoji={sample} onOpenChange={() => {}} />);
    expect(screen.getByRole('dialog', { name: /details/i })).toBeInTheDocument();
    expect(screen.getByText('Heart')).toBeInTheDocument();
    expect(screen.getByText('Symbols')).toBeInTheDocument();
  });
});


