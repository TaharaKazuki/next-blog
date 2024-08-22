import { notFound } from 'next/navigation';
import React from 'react';

import { formatDate, getBlogPost } from '../../contents/utils';
import { BreadcrumbWithCustomSeparator } from '@/components/Breadcrumb';
import Container from '@/components/Container';
import Header from '@/components/Header';

type SlugPageProps = {
  params: {
    category: string;
    slug: string;
  };
};

const SlugPage = ({ params: { category, slug } }: SlugPageProps) => {
  const post = getBlogPost().find((post) => post.slug === slug);

  if (!post) notFound();

  return (
    <>
      <Header>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={post.metadata.category}
            slug={post.slug}
          />
          <h1 className="title mt-4 text-2xl font-semibold tracking-tighter">
            {post.metadata.title}
          </h1>
          <div className="mb-4 mt-2 flex items-center justify-between text-sm">
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Container>
      </Header>
    </>
  );
};

export default SlugPage;
