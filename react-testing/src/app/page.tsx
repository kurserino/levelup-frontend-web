"use client";

import React from 'react';
import styles from './page.module.css';
import { useEmojiList } from '../components/EmojiList/useEmojiList';
import { EmojiGrid } from '../components/EmojiList/EmojiGrid';
import { EmojiDialog } from '../components/EmojiDialog/EmojiDialog';

export default function Page() {
  const {
    filteredEmojis,
    search,
    setSearch,
    selectedEmoji,
    isOpen,
    closeDialog,
    openDialog,
    selectPrevious,
    selectNext
  } = useEmojiList();

  return (
    <main className={styles.container} aria-label="Emoji Explorer">
      <div className={styles.header}>
        <h1 className={styles.title}>Emoji Explorer</h1>
        <input
          aria-label="Search emoji"
          className={styles.searchInput}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <EmojiGrid emojis={filteredEmojis} onSelect={openDialog} />

      <EmojiDialog
        open={isOpen}
        emoji={selectedEmoji}
        onOpenChange={(open) => (open ? undefined : closeDialog())}
        onPrevious={selectPrevious}
        onNext={selectNext}
        // disable buttons based on selectedEmoji index
        disablePrevious={!selectedEmoji || filteredEmojis.findIndex(e => e === selectedEmoji) <= 0}
        disableNext={!selectedEmoji || filteredEmojis.findIndex(e => e === selectedEmoji) >= filteredEmojis.length - 1}
        emojisLength={filteredEmojis.length}
      />
    </main>
  );
}


