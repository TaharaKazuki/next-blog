'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authenticate } from '@/lib/actions/authenticate';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'ログイン中...' : 'ログイン'}
          </Button>
          {errorMessage && (
            <div>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
