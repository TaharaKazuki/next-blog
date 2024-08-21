import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getBlogPost } from '../contents/utils';
import Container from '@/components/Container';

type CategoryPageProps = {
  params: {
    category: string | string[];
  };
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  const posts = getBlogPost().filter(
    (post) => post.metadata.category === params.category
  );

  if (!posts) notFound();

  return (
    <Container>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              href={`/blog/${post.metadata.category}/${post.slug}`}
              key={post.slug}
            >
              aaa
            </Link>
          ))}
      </div>
    </Container>
  );
};

export default CategoryPage;
