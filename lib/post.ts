import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { ClientPostSchema, Post } from '@/types/post';

export const getPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return z.array(ClientPostSchema).parse(posts);
};
