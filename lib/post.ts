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

export const searchPosts = async (search: string) => {
  const decodedSearch = decodeURIComponent(search);
  const normalizedSearch = decodedSearch.replace(/[\s　]+/g, ' ').trim();
  const searchWords = normalizedSearch.split(' ').filter(Boolean);

  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  const posts = await prisma.post.findMany({
    where: { AND: filters },
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
