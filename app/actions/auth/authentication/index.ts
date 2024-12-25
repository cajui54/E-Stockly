'use server';
import { actionClient } from '@/app/_lib/safe-action';
import { loginSchema } from './schema';
import { returnValidationErrors } from 'next-safe-action';
import { redirect } from 'next/navigation';

export const authUser = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const users = [{ username: 'tiago_silva', password: '123456' }];

    const findUser = users.find(
      (user) =>
        user.username === parsedInput.username &&
        user.password === parsedInput.password,
    );
    if (findUser) {
      redirect('/dashboard');
    } else {
      returnValidationErrors(loginSchema, {
        _errors: ['Username ou Senha, inválido!'],
      });
    }
  });
