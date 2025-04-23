import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: '名前は必須です' })
      .min(1, '名前は必須です'),
    email: z
      .string({ required_error: 'メールアドレスは必須です' })
      .min(1, 'メールアドレスは必須です')
      .email('メールアドレスが不正です'),
    password: z
      .string({ required_error: 'パスワードは必須です' })
      .min(1, 'パスワードは必須です')
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(32, 'パスワードは32文字以内で入力してください'),
    confirmPassword: z
      .string({ required_error: '確認用パスワードは必須です' })
      .min(1, '確認用パスワードは必須です'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });
