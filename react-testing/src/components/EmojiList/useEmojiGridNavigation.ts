"use client";

import { useRef, KeyboardEvent } from 'react';

export function useEmojiGridNavigation(onEnter?: (index: number) => void) {
  const gridRef = useRef<HTMLDivElement>(null);

  const getColumnsCount = (): number => {
    if (!gridRef.current) return 1;

    const gridStyles = window.getComputedStyle(gridRef.current);
    const gridTemplateColumns = (gridStyles as any).gridTemplateColumns as string | undefined;

    if (gridTemplateColumns && gridTemplateColumns !== 'none') {
      return gridTemplateColumns.split(' ').length;
    }

    const children = gridRef.current.children;
    if (children.length === 0) return 1;

    const firstChild = children[0] as HTMLElement;
    const containerWidth = gridRef.current.offsetWidth;
    const childWidth = firstChild.offsetWidth;
    const gap = parseInt((gridStyles as any).gap as string) || 0;

    return Math.floor((containerWidth + gap) / (childWidth + gap)) || 1;
  };

  const onKeyDownGrid = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;

    const focusableElements = gridRef.current.querySelectorAll(
      'button[role="gridcell"]'
    );

    const currentElement = document.activeElement;
    const currentIndex = Array.from(focusableElements).indexOf(currentElement as Element);

    if (currentIndex === -1) return; // only navigate when focus is on a grid cell

    let newIndex = currentIndex;
    const columns = getColumnsCount();
    const totalItems = focusableElements.length;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : currentIndex;
        break;

      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        break;

      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex + columns;
        if (newIndex >= totalItems) newIndex = currentIndex;
        break;

      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex - columns;
        if (newIndex < 0) newIndex = currentIndex;
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        newIndex = totalItems - 1;
        break;

      case 'Enter':
        if (onEnter) {
          event.preventDefault();
          onEnter(currentIndex);
        }
        return;

      default:
        return;
    }

    const targetElement = focusableElements[newIndex] as HTMLElement | undefined;
    if (targetElement) {
      targetElement.focus();
    }
  };

  return { gridRef, onKeyDownGrid };
}


