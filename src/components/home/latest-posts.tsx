import Link from 'next/link';

import { getBlogPost } from '@/app/blog/contents/utils';

const LatestPosts = () => {
  const latestPosts = getBlogPost();
  return (
    <>
      <h1>Recently Published</h1>
      {latestPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <article key={post.slug} className="my-10 max-w-md text-wrap">
            <Link
              href={`/blog/${post.metadata.category}/${post.slug}`}
              className="cursor-pointer"
            >
              <h3>{post.metadata.title}</h3>
            </Link>
          </article>
        ))}
    </>
  );
};

export default LatestPosts;
