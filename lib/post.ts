import { z } from 'zod';

import { ClientPost, ClientPostSchema, PostSchema } from '@/types/post';

import { prisma } from './prisma';

export const getPosts = async (): Promise<ClientPost[]> => {
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

  // zodを使ってデータを検証・変換
  return z
    .array(PostSchema)
    .parse(posts)
    .map((post) => ClientPostSchema.parse(post));
};
