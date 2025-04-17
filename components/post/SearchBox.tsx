'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';

export default function SearchBox() {
  const { search, setSearch } = useSearch();

  return (
    <div className="relative">
      <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-500" />
      <Input
        placeholder="記事を検索..."
        className="w-[200px] pl-8 lg:w-[300px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
