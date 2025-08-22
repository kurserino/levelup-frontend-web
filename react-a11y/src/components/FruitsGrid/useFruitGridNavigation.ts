"use client";
import { useRef, KeyboardEvent } from "react";

export function useFruitGridNavigation() {
  const gridRef = useRef<HTMLDivElement>(null);

  const onKeyDownGrid = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;

    const focusableElements = gridRef.current.querySelectorAll(
      '[role="listitem"] [role="button"]'
    );

    const currentElement = document.activeElement;
    const currentIndex = Array.from(focusableElements).indexOf(
      currentElement as Element
    );

    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    const columns = getColumnsCount();
    const totalItems = focusableElements.length;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        newIndex =
          currentIndex < totalItems - 1 ? currentIndex + 1 : currentIndex;
        break;

      case "ArrowLeft":
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        break;

      case "ArrowDown":
        event.preventDefault();
        newIndex = currentIndex + columns;
        if (newIndex >= totalItems) {
          newIndex = currentIndex;
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        newIndex = currentIndex - columns;
        if (newIndex < 0) {
          newIndex = currentIndex;
        }
        break;

      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;

      case "End":
        event.preventDefault();
        newIndex = totalItems - 1;
        break;

      default:
        return;
    }

    const targetElement = focusableElements[newIndex] as HTMLElement;
    if (targetElement) {
      targetElement.focus();
    }
  };

  const getColumnsCount = (): number => {
    if (!gridRef.current) return 1;

    // Try to get the Grid element inside the container
    const gridElement = gridRef.current.querySelector('[role="list"]');
    if (!gridElement) return 1;

    const gridStyles = window.getComputedStyle(gridElement);
    const gridTemplateColumns = gridStyles.gridTemplateColumns;

    if (gridTemplateColumns && gridTemplateColumns !== "none") {
      return gridTemplateColumns.split(" ").length;
    }

    // Fallback: calculate based on element widths
    const children = gridElement.children;
    if (children.length === 0) return 1;

    const firstChild = children[0] as HTMLElement;
    const containerWidth = (gridElement as HTMLElement).offsetWidth;
    const childWidth = firstChild.offsetWidth;
    const gap = parseInt(gridStyles.gap) || 0;

    return Math.floor((containerWidth + gap) / (childWidth + gap)) || 1;
  };

  return {
    gridRef,
    onKeyDownGrid,
  };
}
