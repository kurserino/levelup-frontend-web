import { renderHook, act } from '@testing-library/react';
import { useEmojiList } from '../components/EmojiList/useEmojiList';

describe('useEmojiList', () => {
  it('filters by name', () => {
    const { result } = renderHook(() => useEmojiList());
    act(() => result.current.setSearch('heart'));
    expect(result.current.filteredEmojis.every((e) => e.name.toLowerCase().includes('heart'))).toBe(true);
  });

  it('opens and closes dialog via API', () => {
    const { result } = renderHook(() => useEmojiList());
    act(() => result.current.openDialog(0));
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.closeDialog());
    expect(result.current.isOpen).toBe(false);
  });
});


