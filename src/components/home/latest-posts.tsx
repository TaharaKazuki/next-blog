import Link from 'next/link';

import { formatDate, getBlogPost } from '@/app/blog/contents/utils';

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
              <h3 className="py-2 font-bold leading-5 hover:text-blue-400">
                {post.metadata.title}
              </h3>
            </Link>
            <p className="my-5 leading-8">{post.metadata.summary}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </article>
        ))}
    </>
  );
};

export default LatestPosts;
