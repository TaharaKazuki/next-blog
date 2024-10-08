import Link from 'next/link';

import { Icons } from '../icons';
import { popularPosts } from '@/lib/placeholder-data';

const PopularPosts = () => {
  return (
    <ul className="overflow-auto">
      {popularPosts.map((post) => (
        <Link href={`/blog/`} key={post.title}>
          <li className="group flex cursor-pointer items-center gap-2 py-2">
            <Icons.arrowRight className="size-6 transition-all group-hover:translate-x-2" />
            <p>{post.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PopularPosts;
