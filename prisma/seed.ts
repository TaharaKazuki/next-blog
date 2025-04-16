import { Post, PrismaClient, User } from '@prisma/client';
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

  // 各ユーザーごとに投稿を個別に作成
  for (const [userIndex, user] of users.entries()) {
    const startIdx = userIndex * 2;
    const endIdx = startIdx + 2;

    // 各ユーザーの投稿を作成
    await Promise.all(
      dummyPostsData.slice(startIdx, endIdx).map((post) => {
        const postData = {
          ...post,
          topImage: getRandomImage(),
          author: {
            connect: { id: user.id },
          },
        };
        return prisma.post.create({ data: postData });
      })
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
