import React from 'react';
import { expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmojiGrid } from './EmojiGrid';

const EMOJIS = [
  { name: 'Heart', char: '❤️', category: 'Symbols' },
  { name: 'Smile', char: '😊', category: 'Faces' },
  { name: 'Star', char: '⭐', category: 'Symbols' },
  { name: 'Sun', char: '☀️', category: 'Nature' },
];

describe('useEmojiGridNavigation via EmojiGrid', () => {
  // Make layout measurement stable for columns calculation
  const originalGetComputedStyle = window.getComputedStyle;
  beforeEach(() => {
    // Mock computed style to expose gridTemplateColumns so columns = 2
    // @ts-ignore
    window.getComputedStyle = () => ({
      gridTemplateColumns: '1 1',
      gap: '0',
      getPropertyValue: (prop: string) => {
        if (prop === 'grid-template-columns') return '1 1';
        if (prop === 'gap') return '0';
        return '';
      },
    } as unknown as CSSStyleDeclaration);
    // JSDOM does not compute offsets; define minimal sizes
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 100 });
  });
  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('moves focus with arrow keys and calls onSelect on Enter', () => {
    const onSelect = vi.fn();
    render(<EmojiGrid emojis={EMOJIS} onSelect={onSelect} />);
    const grid = screen.getByRole('grid', { name: /emojis/i });

    const cells = screen.getAllByRole('gridcell');
    (cells[0] as HTMLElement).focus();

    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(cells[1]);

    fireEvent.keyDown(grid, { key: 'ArrowDown' }); // columns=2 so +2
    expect(document.activeElement).toBe(cells[3]);

    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(cells[2]);

    fireEvent.keyDown(grid, { key: 'Home' });
    expect(document.activeElement).toBe(cells[0]);

    fireEvent.keyDown(grid, { key: 'End' });
    expect(document.activeElement).toBe(cells[cells.length - 1]);

    fireEvent.keyDown(grid, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(cells.length - 1);
  });

  it('ignores navigation when focus is not on a grid cell', () => {
    const onSelect = vi.fn();
    render(<EmojiGrid emojis={EMOJIS} onSelect={onSelect} />);
    const grid = screen.getByRole('grid', { name: /emojis/i });

    // Ensure focus is on the body, not on any cell
    (document.body as HTMLElement).focus();

    const cells = screen.getAllByRole('gridcell');
    const activeBefore = document.activeElement;
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(activeBefore);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not move on ArrowUp from first row', () => {
    const onSelect = vi.fn();
    render(<EmojiGrid emojis={EMOJIS} onSelect={onSelect} />);
    const grid = screen.getByRole('grid', { name: /emojis/i });

    const cells = screen.getAllByRole('gridcell');
    (cells[0] as HTMLElement).focus();
    fireEvent.keyDown(grid, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(cells[0]);
  });

  it('falls back to computed columns when grid-template-columns is none', () => {
    const originalGetComputedStyleLocal = window.getComputedStyle;
    // grid-template-columns is 'none' so fallback math is used
    // @ts-ignore
    window.getComputedStyle = () => ({
      gridTemplateColumns: 'none',
      gap: '20',
      getPropertyValue: (prop: string) => (prop === 'gap' ? '20' : 'none'),
    } as unknown as CSSStyleDeclaration);

    const onSelect = vi.fn();
    render(<EmojiGrid emojis={EMOJIS} onSelect={onSelect} />);
    const grid = screen.getByRole('grid') as HTMLElement;
    const cells = screen.getAllByRole('gridcell') as HTMLElement[];

    // Make container 240px, child 100px, gap 20px -> columns = floor((240+20)/(100+20)) = 2
    Object.defineProperty(grid, 'offsetWidth', { configurable: true, value: 240 });
    Object.defineProperty(cells[0], 'offsetWidth', { configurable: true, value: 100 });

    (cells[0] as HTMLElement).focus();
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    // With 2 columns, ArrowDown from index 0 should go to index 2
    expect(document.activeElement).toBe(cells[2]);

    window.getComputedStyle = originalGetComputedStyleLocal;
  });
});


