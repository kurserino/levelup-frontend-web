import { renderHook, act } from '@testing-library/react';
import { useEmojiList } from '../components/EmojiList/useEmojiList';

describe('useEmojiList', () => {
  it('filters by name', () => {
    const { result } = renderHook(() => useEmojiList());
    act(() => result.current.setSearch('heart'));
    expect(result.current.filteredEmojis.every((e) => e.name.toLowerCase().includes('heart'))).toBe(true);
  });

  it('navigates with arrows and opens/closes dialog', () => {
    const { result } = renderHook(() => useEmojiList());
    act(() => result.current.handleKeyDown({ key: 'ArrowRight' } as any));
    expect(result.current.selectedIndex).toBe(1);
    act(() => result.current.handleKeyDown({ key: 'Enter' } as any));
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.handleKeyDown({ key: 'Escape' } as any));
    expect(result.current.isOpen).toBe(false);
  });
});


