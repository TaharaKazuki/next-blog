import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPost } from '@/lib/post';

type Props = {
  params: Promise<{ [key: string]: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-3xl">
        {post.topImage && (
          <div className="relative h-64 w-full lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">投稿者: {post.author.name}</p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.createdAt), 'yyyy年MM月dd日', {
                locale: ja,
              })}
            </time>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="prose max-w-none"></div> */}
          {post.content}
        </CardContent>
      </Card>
    </div>
  );
}
