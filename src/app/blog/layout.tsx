import { type ReactNode } from 'react';

import Container from '@/components/Container';
import { MainNav } from '@/components/main-nav';

type BlogLayout = {
  children: ReactNode;
};

const BlogLayout = ({ children }: BlogLayout) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800">
        <Container>
          <MainNav />
        </Container>
      </div>
      {children}
    </>
  );
};

export default BlogLayout;
