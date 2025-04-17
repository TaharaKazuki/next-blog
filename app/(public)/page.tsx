import PostCard from '@/components/post/PostCard';
import { getPosts, searchPosts } from '@/lib/post';

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function PostPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || '';

  const posts = query ? await searchPosts(query) : await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">
            {`「${query}」の検索結果が見つかりませんでした。`}
          </p>
        )}
      </div>
    </div>
  );
}
