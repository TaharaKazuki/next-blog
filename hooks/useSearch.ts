import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseSearchOptions {
  debounceMs?: number;
  searchPath?: string;
  homePath?: string;
}

/**
 * 検索機能を提供するカスタムフック
 *
 * @param options オプション設定
 * @returns 検索状態と検索を更新する関数
 */
export function useSearch({
  debounceMs = 500,
  searchPath = '/',
  homePath = '/',
}: UseSearchOptions = {}) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  // 検索入力のデバウンス処理
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [search, debounceMs]);

  // デバウンスされた検索に基づいてルーティング
  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(
        `${searchPath}?search=${encodeURIComponent(debouncedSearch.trim())}`
      );
    } else {
      router.push(homePath);
    }
  }, [debouncedSearch, router, searchPath, homePath]);

  return {
    search,
    setSearch,
    debouncedSearch,
  };
}
