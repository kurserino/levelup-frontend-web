"use client";

import React from 'react';
import styles from '../../app/page.module.css';
import clsx from 'clsx';
import { useEmojiGridNavigation } from './useEmojiGridNavigation';

export type EmojiItem = {
  name: string;
  char: string;
  category: string;
};

type Props = {
  emojis: EmojiItem[];
  onSelect: (index: number) => void;
};

export function EmojiGrid({ emojis, onSelect }: Props) {
  const { gridRef, onKeyDownGrid } = useEmojiGridNavigation(onSelect);

  return (
    <div
      className={styles.grid}
      role="grid"
      aria-label="Emojis"
      ref={gridRef}
      onKeyDown={onKeyDownGrid}
    >
      {emojis.map((emoji, index) => (
        <button
          key={`${emoji.char}-${index}`}
          role="gridcell"
          aria-label={`${emoji.name} ${emoji.char}`}
          className={clsx(styles.emojiCard)}
          onClick={() => onSelect(index)}
        >
          <span className={styles.emoji}>{emoji.char}</span>
          <span className={styles.name}>{emoji.name}</span>
        </button>
      ))}
    </div>
  );
}


