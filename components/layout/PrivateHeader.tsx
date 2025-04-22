import Link from 'next/link';

import { auth } from '@/auth';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import Setting from './Setting';

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('不正なリクエストです');

  return (
    <header className="border-b bg-blue-200">
      <div className="container mx-auto flex items-center justify-between p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-xl font-bold" asChild>
                <Link href="/dashboard">管理ページ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
