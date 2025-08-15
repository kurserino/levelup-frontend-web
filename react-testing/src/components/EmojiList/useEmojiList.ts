import { useCallback, useEffect, useMemo, useState } from 'react';
import { emojis } from '../../data/emojis';

export function useEmojiList() {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState(1);

  const filteredEmojis = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return emojis;
    return emojis.filter((e) => e.name.toLowerCase().includes(query) || e.char.includes(query));
  }, [search]);

  const selectedEmoji = filteredEmojis[selectedIndex] ?? null;

  // Determine the current number of columns by measuring how many cells are on the first row
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const grid = document.querySelector('[role="grid"]') as HTMLElement | null;
    if (!grid) return;

    const measureColumns = () => {
      const cells = Array.from(grid.querySelectorAll('[role="gridcell"]')) as HTMLElement[];
      if (!cells.length) {
        setColumns(1);
        return;
      }
      const firstTop = Math.round(cells[0].getBoundingClientRect().top);
      let count = 0;
      for (const cell of cells) {
        const top = Math.round(cell.getBoundingClientRect().top);
        if (top !== firstTop) break;
        count += 1;
      }
      setColumns(Math.max(1, count || 1));
    };

    // Initial measure and on next frame to account for layout
    measureColumns();
    requestAnimationFrame(measureColumns);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureColumns) : null;
    ro?.observe(grid);
    window.addEventListener('resize', measureColumns);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measureColumns);
    };
  }, [filteredEmojis.length]);

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

  // Removed global key handlers; arrow navigation now only works when focus is on a grid cell

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
    // no handleKeyDown exported anymore
  };
}


