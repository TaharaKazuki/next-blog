import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getBlogPost } from '../contents/utils';
import CardCategory from '@/components/CardCategory';
import Container from '@/components/Container';
import Header from '@/components/Header';

type CategoryPageProps = {
  params: {
    category: string | string[];
  };
};

const filterPostsByCategory = (category: string | string[]) => {
  return getBlogPost().filter((post) => post.metadata.category === category);
};

const sortPostsByDate = (posts: ReturnType<typeof filterPostsByCategory>) => {
  return posts.sort((a, b) =>
    compareDesc(
      new Date(a.metadata.publishedAt),
      new Date(b.metadata.publishedAt)
    )
  );
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  const posts = filterPostsByCategory(params.category);

  if (!posts.length) notFound();

  const sortedPosts = sortPostsByDate(posts);

  return (
    <>
      <Header>
        <Container>
          <h1 className="title mt-4 text-2xl font-semibold uppercase tracking-wider">
            {posts[0]?.metadata.category}
          </h1>
        </Container>
      </Header>
      <Container>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <Link
              href={`/blog/${post.metadata.category}/${post.slug}`}
              key={post.slug}
            >
              <CardCategory
                title={post.metadata.title}
                summary={post.metadata.summary}
                date={post.metadata.publishedAt}
              />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
