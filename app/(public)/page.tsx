import PostCard from '@/components/post/PostCard';
import { getPosts, searchPosts } from '@/lib/post';

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function PostPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || '';
  console.log(query);

  const posts = query ? await searchPosts(query) : await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
