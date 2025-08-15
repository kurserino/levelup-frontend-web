import React from 'react';
import { expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useEmojiDialogController } from './useEmojiDialogController';

function ControllerHarness({ disablePrevious = false, disableNext = false, onPrevious, onNext }: any) {
  const {
    previousButtonRef,
    nextButtonRef,
    contentRef,
    handleContentKeyDown,
    handlePreviousClick,
    handleNextClick,
  } = useEmojiDialogController({
    open: true,
    emoji: { name: 'Heart', char: '❤️', category: 'Symbols' },
    onOpenChange: () => {},
    onPrevious,
    onNext,
    disablePrevious,
    disableNext,
    emojisLength: 3,
  } as any);

  return (
    <div>
      <div data-testid="content" ref={contentRef as any} onKeyDown={handleContentKeyDown} tabIndex={-1}>
        <button data-testid="prev" ref={previousButtonRef as any} onClick={handlePreviousClick} disabled={disablePrevious}>
          Prev
        </button>
        <button data-testid="next" ref={nextButtonRef as any} onClick={handleNextClick} disabled={disableNext}>
          Next
        </button>
      </div>
    </div>
  );
}

describe('useEmojiDialogController', () => {
  const originalRAF = window.requestAnimationFrame;
  beforeAll(() => {
    // Make rAF synchronous for focus assertions
    // @ts-ignore
    window.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0);
      // @ts-ignore
      return 0;
    };
  });
  afterAll(() => {
    window.requestAnimationFrame = originalRAF;
  });

  it('ArrowRight triggers onNext and focuses Next button when enabled', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    render(<ControllerHarness onNext={onNext} onPrevious={onPrevious} />);

    const content = screen.getByTestId('content');
    const nextBtn = screen.getByTestId('next') as HTMLButtonElement;
    (content as HTMLElement).focus();

    fireEvent.keyDown(content, { key: 'ArrowRight' });
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(nextBtn);
  });

  it('ArrowLeft triggers onPrevious and focuses Prev button when enabled', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    render(<ControllerHarness onNext={onNext} onPrevious={onPrevious} />);

    const content = screen.getByTestId('content');
    const prevBtn = screen.getByTestId('prev') as HTMLButtonElement;
    (content as HTMLElement).focus();

    fireEvent.keyDown(content, { key: 'ArrowLeft' });
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(prevBtn);
  });

  it('focuses fallback when Next is disabled after ArrowRight', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    render(<ControllerHarness onNext={onNext} onPrevious={onPrevious} disableNext />);

    const content = screen.getByTestId('content');
    const prevBtn = screen.getByTestId('prev') as HTMLButtonElement;
    (content as HTMLElement).focus();

    fireEvent.keyDown(content, { key: 'ArrowRight' });
    expect(onNext).toHaveBeenCalledTimes(1);
    // Should focus prev (enabled) since next is disabled
    expect(document.activeElement).toBe(prevBtn);
  });

  it('focuses fallback when Previous is disabled after ArrowLeft', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    render(<ControllerHarness onNext={onNext} onPrevious={onPrevious} disablePrevious />);

    const content = screen.getByTestId('content');
    const nextBtn = screen.getByTestId('next') as HTMLButtonElement;
    (content as HTMLElement).focus();

    fireEvent.keyDown(content, { key: 'ArrowLeft' });
    expect(onPrevious).toHaveBeenCalledTimes(1);
    // Should focus next (enabled) since prev is disabled
    expect(document.activeElement).toBe(nextBtn);
  });

  it('click handlers call callbacks and keep focus on enabled buttons', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    render(<ControllerHarness onNext={onNext} onPrevious={onPrevious} />);

    const prevBtn = screen.getByTestId('prev') as HTMLButtonElement;
    const nextBtn = screen.getByTestId('next') as HTMLButtonElement;

    fireEvent.click(prevBtn);
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(prevBtn);

    fireEvent.click(nextBtn);
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(nextBtn);
  });

  it('re-homes focus when a focused button becomes disabled', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const { rerender } = render(
      <ControllerHarness onNext={onNext} onPrevious={onPrevious} />
    );

    const nextBtn = screen.getByTestId('next') as HTMLButtonElement;
    nextBtn.focus();

    // Rerender with next disabled -> focus should move to prev or content
    rerender(
      <ControllerHarness onNext={onNext} onPrevious={onPrevious} disableNext />
    );

    const prevBtn = screen.getByTestId('prev') as HTMLButtonElement;
    // Either prev is focused (if enabled) or content receives focus
    const content = screen.getByTestId('content');
    expect([prevBtn, content]).toContain(document.activeElement as any);
  });

  it('moves focus to content when Prev becomes disabled and Next is also disabled', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const { rerender } = render(
      <ControllerHarness onNext={onNext} onPrevious={onPrevious} />
    );

    const prevBtn = screen.getByTestId('prev') as HTMLButtonElement;
    const content = screen.getByTestId('content');
    prevBtn.focus();

    rerender(
      <ControllerHarness onNext={onNext} onPrevious={onPrevious} disablePrevious disableNext />
    );

    expect(document.activeElement).toBe(content);
  });

  it('moves focus to content when Next becomes disabled and Prev is also disabled', () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const { rerender } = render(
      <ControllerHarness onNext={onNext} onPrevious={onPrevious} />
    );

    const nextBtn = screen.getByTestId('next') as HTMLButtonElement;
    const content = screen.getByTestId('content');
    nextBtn.focus();

    rerender(
      <ControllerHarness onNext={onNext} onPrevious={onPrevious} disablePrevious disableNext />
    );

    expect(document.activeElement).toBe(content);
  });
});


