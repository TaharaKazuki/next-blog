import { Post, Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

const dummyUsers: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    email: 'test1@example.com',
    name: 'Test User 1',
    password: 'password123',
  },
  {
    email: 'test2@example.com',
    name: 'Test User 2',
    password: 'password456',
  },
];

const dummyImages: string[] = [
  'https://picsum.photos/seed/post1/600/400',
  'https://picsum.photos/seed/post2/600/400',
  'https://picsum.photos/seed/post3/600/400',
  'https://picsum.photos/seed/post4/600/400',
  'https://picsum.photos/seed/post5/600/400',
];

const getRandomImage = (): string =>
  dummyImages[Math.floor(Math.random() * dummyImages.length)];

const dummyPostsData: Omit<
  Post,
  'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'topImage' | 'userId'
>[] = [
  {
    title: 'お料理のブログです',
    content: 'お料理のレシピを紹介します。',
    published: true,
  },
  {
    title: '趣味ブログ',
    content: 'これは趣味のブログです',
    published: true,
  },
  {
    title: '技術ブログ',
    content: '最新の技術トレンドについて書いています。',
    published: true,
  },
  {
    title: '旅行記録',
    content: '先日訪れた場所についての記録です。',
    published: false,
  },
];

async function main() {
  // データをクリア
  await Promise.all([prisma.post.deleteMany(), prisma.user.deleteMany()]);

  // ユーザーを作成
  const users = await Promise.all(
    dummyUsers.map(async (userData) => {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      return prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    })
  );

  // 投稿を作成 (各ユーザーに対して異なる投稿を割り当て)
  const postsData: Prisma.PostCreateInput[] = [];

  users.forEach((user, userIndex) => {
    // 各ユーザーに2つの投稿を割り当て
    const startIdx = userIndex * 2;
    const userPosts = dummyPostsData
      .slice(startIdx, startIdx + 2)
      .map((post) => ({
        ...post,
        topImage: getRandomImage(),
        author: {
          connect: {
            id: user.id,
          },
        },
      }));

    postsData.push(...userPosts);
  });

  const posts = await Promise.all(
    postsData.map((postData) =>
      prisma.post.create({
        data: postData,
      })
    )
  );

  console.info(`ユーザーが作成されました`, users);
  console.info(`投稿が作成されました`, posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
