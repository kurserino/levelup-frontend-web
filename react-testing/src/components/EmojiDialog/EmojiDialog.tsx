"use client";

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './EmojiDialog.module.css';
import { useEmojiDialogController } from './useEmojiDialogController';

type Emoji = {
  name: string;
  char: string;
  category: string;
} | null;

type Props = {
  open: boolean;
  emoji: Emoji;
  onOpenChange: (open: boolean) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  emojisLength: number;
};

export function EmojiDialog({ open, emoji, onOpenChange, onPrevious, onNext, disablePrevious = false, disableNext = false, emojisLength }: Props) {
  const {
    previousButtonRef,
    nextButtonRef,
    contentRef,
    handleContentKeyDown,
    handlePreviousClick,
    handleNextClick,
  } = useEmojiDialogController({ open, emoji, onOpenChange, onPrevious, onNext, disablePrevious, disableNext, emojisLength });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          aria-label="Emoji details"
          onKeyDown={handleContentKeyDown}
          ref={contentRef}
          tabIndex={-1}
        >
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>Details</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close dialog" className={styles.closeButton}>
                <span aria-hidden className={styles.closeIcon}>×</span>
              </button>
            </Dialog.Close>
          </div>
          {emoji ? (
            <div className={styles.emojiRow}>
              <span className={styles.emojiChar}>{emoji.char}</span>
              <div>
                <p className={styles.name}>{emoji.name}</p>
                <p className={styles.category}>{emoji.category}</p>
              </div>
            </div>
          ) : (
            <p>No emoji selected</p>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              aria-label="Previous emoji"
              aria-keyshortcuts="ArrowLeft"
              onClick={handlePreviousClick}
              title="Previous"
              ref={previousButtonRef}
              className={styles.navButton}
              disabled={disablePrevious}
            >
              <span aria-hidden className={styles.navIcon}>←</span>
            </button>
            <button
              type="button"
              aria-label="Next emoji"
              aria-keyshortcuts="ArrowRight"
              onClick={handleNextClick}
              title="Next"
              ref={nextButtonRef}
              className={styles.navButton}
              disabled={disableNext}
            >
              <span aria-hidden className={styles.navIcon}>→</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


