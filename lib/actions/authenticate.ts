'use server';

import { AuthError } from 'next-auth';
// eslint-disable-next-line import/order
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが正しくありません。';
        default:
          return 'エラーが発生しました。';
      }
    }
    throw error;
  }
}
