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
    selectedIndex,
    selectedEmoji,
    isOpen,
    closeDialog,
    handleKeyDown,
    openDialog,
    selectPrevious,
    selectNext
  } = useEmojiList();

  return (
    <main className={styles.container} onKeyDown={handleKeyDown} tabIndex={0} aria-label="Emoji Explorer">
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

      <p className={styles.kbd}>Arrows: navigate | Enter: details | Esc: close</p>

      <EmojiGrid
        emojis={filteredEmojis}
        selectedIndex={selectedIndex}
        onSelect={openDialog}
      />

      <EmojiDialog
        open={isOpen}
        emoji={selectedEmoji}
        onOpenChange={(open) => (open ? undefined : closeDialog())}
        onPrevious={selectPrevious}
        onNext={selectNext}
        disablePrevious={selectedIndex <= 0}
        disableNext={selectedIndex >= filteredEmojis.length - 1}
        emojisLength={filteredEmojis.length}
      />
    </main>
  );
}


