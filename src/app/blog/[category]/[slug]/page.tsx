import { notFound } from 'next/navigation';
import React from 'react';

import { getBlogPost } from '../../contents/utils';
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
    <Header>
      <Container>aaa</Container>
    </Header>
  );
};

export default SlugPage;
