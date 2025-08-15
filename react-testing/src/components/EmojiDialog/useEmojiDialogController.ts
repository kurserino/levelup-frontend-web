import { useCallback, useEffect, useRef } from 'react';

type Emoji = {
  name: string;
  char: string;
  category: string;
} | null;

type ControllerParams = {
  open: boolean;
  emoji: Emoji;
  onOpenChange: (open: boolean) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  emojisLength: number;
};

  export function useEmojiDialogController({ onPrevious, onNext, disablePrevious = false, disableNext = false }: ControllerParams) {
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const focusAsync = (element: HTMLElement | null | undefined) => {
    if (!element) return;
    requestAnimationFrame(() => element.focus());
  };

  const focusFirstEnabledOrContent = () => {
    const prevEl = previousButtonRef.current;
    const nextEl = nextButtonRef.current;
    if (prevEl && !prevEl.disabled) return focusAsync(prevEl);
    if (nextEl && !nextEl.disabled) return focusAsync(nextEl);
    focusAsync(contentRef.current);
  };

  

  const handleContentKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious?.();
        // After state updates, keep focus on a valid target
        requestAnimationFrame(() => {
          if (!disablePrevious) focusAsync(previousButtonRef.current);
          else focusFirstEnabledOrContent();
        });
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext?.();
        requestAnimationFrame(() => {
          if (!disableNext) focusAsync(nextButtonRef.current);
          else focusFirstEnabledOrContent();
        });
      }
    },
    [onPrevious, onNext, disablePrevious, disableNext]
  );

  const handlePreviousClick = useCallback(() => {
    if (disablePrevious) return;
    onPrevious?.();
    requestAnimationFrame(() => {
      if (!disablePrevious) {
        focusAsync(previousButtonRef.current);
      } else if (!disableNext) {
        focusAsync(nextButtonRef.current);
      } else {
        focusFirstEnabledOrContent();
      }
    });
  }, [onPrevious, disablePrevious]);

  const handleNextClick = useCallback(() => {
    if (disableNext) return;
    onNext?.();
    requestAnimationFrame(() => {
      if (!disableNext) {
        focusAsync(nextButtonRef.current);
      } else if (!disablePrevious) {
        focusAsync(previousButtonRef.current);
      } else {
        focusFirstEnabledOrContent();
      }
    });
  }, [onNext, disableNext]);

  // If a focused button becomes disabled at bounds, move focus to the other or the content
  useEffect(() => {
    const prevEl = previousButtonRef.current;
    const nextEl = nextButtonRef.current;
    const active = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;
    if (disablePrevious && active === prevEl) {
      if (nextEl && !nextEl.disabled) {
        nextEl.focus();
      } else if (contentRef.current) {
        contentRef.current.focus();
      }
    } else if (disableNext && active === nextEl) {
      if (prevEl && !prevEl.disabled) {
        prevEl.focus();
      } else if (contentRef.current) {
        contentRef.current.focus();
      }
    }
  }, [disablePrevious, disableNext]);

  return {
    previousButtonRef,
    nextButtonRef,
    contentRef,
    handleContentKeyDown,
    handlePreviousClick,
    handleNextClick,
  };
}


