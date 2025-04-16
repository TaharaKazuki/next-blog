import { Post as PostPrisma, User } from '@prisma/client';
import { z } from 'zod';

// Prisma型を参照した型定義
type PostWithAuthor = PostPrisma & {
  author: Pick<User, 'name'>;
};

// Prismaから取得するPostの型をzodスキーマで定義
export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  topImage: z.string().nullable(),
  published: z.boolean(),
  authorId: z.string(),
  userId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: z.object({
    name: z.string(),
  }),
}) satisfies z.ZodType<PostWithAuthor>;

// クライアント側で使用するPostの型を定義
export const ClientPostSchema = PostSchema.transform((post) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  topImage: post.topImage,
  published: post.published,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  author: {
    name: post.author.name,
  },
}));

// 型定義（Prisma型を利用）
export type Post = PostWithAuthor;
export type ClientPost = z.infer<typeof ClientPostSchema>;

// PostCardで使用するprops
export type PostCardProps = {
  post: ClientPost;
};
