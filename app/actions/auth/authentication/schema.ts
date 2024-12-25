import { z } from 'zod';
export const loginSchema = z.object({
  username: z.string().trim().min(6, { message: 'Preencha o campo username' }),
  password: z.string().min(6, { message: 'Preencha o campo senha.' }),
});
