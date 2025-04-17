import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCardProps } from '@/types/post';

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/posts/${post.id}`}>
        {post.topImage && (
          <div className="relative h-48 w-full">
            <Image
              fill
              src={post.topImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={post.title}
              priority
              className="rounded-t-md object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 line-clamp-2 text-sm text-gray-600">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <time>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
