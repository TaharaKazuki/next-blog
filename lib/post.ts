import { notFound } from 'next/navigation';
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

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) notFound();

  return ClientPostSchema.parse(post);
};
