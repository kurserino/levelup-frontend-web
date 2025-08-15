import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { EmojiDialog } from './EmojiDialog';

const sample = { name: 'Heart', char: '❤️', category: 'Symbols' };

describe('EmojiDialog', () => {
  it('renders details when open', () => {
    render(<EmojiDialog open emoji={sample} onOpenChange={() => {}} emojisLength={1} />);
    const dialog = screen.getByRole('dialog', { name: /details/i });
    expect(dialog).toBeInTheDocument();
    const descId = dialog.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    const descEl = descId ? document.getElementById(descId) : null;
    expect(descEl).toBeTruthy();
    expect((descEl as HTMLElement).textContent).toMatch(/Heart/i);
    expect((descEl as HTMLElement).textContent).toMatch(/Symbols/i);
    // Emoji char is rendered
    expect(screen.getByText('❤️')).toBeInTheDocument();
  });

  it('renders dialog with empty description when no emoji selected', () => {
    render(<EmojiDialog open emoji={null} onOpenChange={() => {}} emojisLength={0} /> as any);
    const dialog = screen.getByRole('dialog', { name: /details/i });
    expect(dialog).toBeInTheDocument();

    // Description exists and is empty
    const descId = dialog.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    const descEl = descId ? document.getElementById(descId) : null;
    expect(descEl).toBeTruthy();
    expect((descEl as HTMLElement).textContent?.trim()).toBe('');

    // Nav buttons still present
    expect(screen.getByRole('button', { name: /previous emoji/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next emoji/i })).toBeInTheDocument();

    // No old fallback text remains
    expect(screen.queryByText(/no emoji selected/i)).toBeNull();
  });
});


