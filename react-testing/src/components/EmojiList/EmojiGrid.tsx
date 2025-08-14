"use client";

import React from 'react';
import styles from '../../app/page.module.css';
import clsx from 'clsx';

export type EmojiItem = {
  name: string;
  char: string;
  category: string;
};

type Props = {
  emojis: EmojiItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function EmojiGrid({ emojis, selectedIndex, onSelect }: Props) {
  return (
    <div className={styles.grid} role="grid" aria-label="Emojis">
      {emojis.map((emoji, index) => (
        <button
          key={`${emoji.char}-${index}`}
          role="gridcell"
          aria-label={`${emoji.name} ${emoji.char}`}
          className={clsx(styles.emojiCard, index === selectedIndex && 'outline outline-2 outline-indigo-500')}
          onClick={() => onSelect(index)}
          data-testid={index === selectedIndex ? 'selected' : undefined}
        >
          <span className={styles.emoji}>{emoji.char}</span>
          <span className={styles.name}>{emoji.name}</span>
        </button>
      ))}
    </div>
  );
}


