import { Post as PostPrisma, User } from '@prisma/client';

export type Post = Omit<
  PostPrisma,
  'authorId' | 'published' | 'userId' | 'updatedAt'
> & {
  author: {
    name: User['name'];
  };
};

export type PostCardProps = { post: Post };
