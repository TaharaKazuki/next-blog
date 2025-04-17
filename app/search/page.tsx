import PostCard from '@/components/post/PostCard';
import { searchPosts } from '@/lib/post';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q || '';
  const posts = searchQuery ? await searchPosts(searchQuery) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        {searchQuery ? `「${searchQuery}」の検索結果` : '検索'}
      </h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {searchQuery
            ? '検索結果が見つかりませんでした。'
            : '検索キーワードを入力してください。'}
        </p>
      )}
    </div>
  );
}
