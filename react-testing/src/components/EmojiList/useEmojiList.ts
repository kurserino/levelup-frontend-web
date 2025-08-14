import { useCallback, useMemo, useState } from 'react';
import { emojis } from '../../data/emojis';

export function useEmojiList() {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const filteredEmojis = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return emojis;
    return emojis.filter((e) => e.name.toLowerCase().includes(query) || e.char.includes(query));
  }, [search]);

  const selectedEmoji = filteredEmojis[selectedIndex] ?? null;

  const openDialog = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => setIsOpen(false), []);

  const selectPrevious = useCallback(() => {
    setSelectedIndex((i) => Math.max(i - 1, 0));
  }, []);

  const selectNext = useCallback(() => {
    setSelectedIndex((i) => Math.min(i + 1, filteredEmojis.length - 1));
  }, [filteredEmojis.length]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!filteredEmojis.length) return;
      const columns = 6; // visual grid guess for keyboard navigation
      if (event.key === 'ArrowRight') {
        setSelectedIndex((i) => Math.min(i + 1, filteredEmojis.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (event.key === 'ArrowDown') {
        setSelectedIndex((i) => Math.min(i + columns, filteredEmojis.length - 1));
      } else if (event.key === 'ArrowUp') {
        setSelectedIndex((i) => Math.max(i - columns, 0));
      } else if (event.key === 'Enter') {
        setIsOpen(true);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [filteredEmojis.length]
  );

  return {
    search,
    setSearch,
    filteredEmojis,
    selectedIndex,
    selectedEmoji,
    isOpen,
    openDialog,
    closeDialog,
    selectPrevious,
    selectNext,
    handleKeyDown
  };
}


