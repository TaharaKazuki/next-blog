import Link from 'next/link';

import { Button } from '../ui/button';
import { POSTS } from '@/lib/constants';

const TopCatagories = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
      {POSTS.map((post) => (
        <Button
          key={post.title}
          variant={'secondary'}
          className="transition-all hover:scale-110"
          asChild
        >
          <Link href={post.href}>{post.title}</Link>
        </Button>
      ))}
    </div>
  );
};

export default TopCatagories;
