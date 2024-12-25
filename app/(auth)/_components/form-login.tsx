'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, LockKeyhole, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginSchema } from '@/app/actions/auth/authentication/schema';
import { useAction } from 'next-safe-action/hooks';
import { authUser } from '@/app/actions/auth/authentication';

interface IFormLogin {
  username: string;
  password: string;
}
interface IStatusSubmit {
  status: boolean;
  message: string;
  type: 'error' | 'success' | '';
}
const FormLogin = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [statusSubmit, setStatusSubmit] = useState<IStatusSubmit>({
    status: false,
    message: '',
    type: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: zodResolver(loginSchema),
  });
  const { execute: executeLoginUser } = useAction(authUser, {
    onError: ({ error: { validationErrors } }) => {
      setStatusSubmit({
        status: true,
        message: `${validationErrors?._errors}`,
        type: 'error',
      });
    },
  });
  const onReset = () => {
    reset();
    setHidePassword(false);
    setStatusSubmit({
      status: false,
      message: '',
      type: '',
    });
  };
  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    executeLoginUser(data);
    onReset();
  };
  return (
    <div className="min-h-96 w-[300px] rounded-lg p-8 shadow-lg shadow-slate-400">
      <div className="mx-auto flex w-4/5 flex-col items-center justify-center">
        <p className="text-2xl font-bold text-emerald-500">E-Stockly</p>
        <p className="-ml-6 -mt-3 text-sm text-gray-800">Login System</p>
      </div>
      <form className="m-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="relative">
            <p className="text-[13px] text-emerald-400">Username</p>
            <User className="absolute left-2 top-8 text-gray-500" />
            <input
              className="w-4/5 rounded-xl border border-emerald-400 bg-slate-100 py-3 pl-10 font-medium tracking-wide text-gray-700 outline-none"
              type="text"
              {...register('username')}
              placeholder="carlos25"
            />
            <span className="absolute -right-[18px] text-gray-500">*</span>
          </label>
          {errors.username && (
            <p className="ml-3 mt-2 text-[12px] text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mt-5">
          <label className="relative">
            <p className="text-[13px] text-emerald-400">Senha:</p>
            <LockKeyhole className="absolute left-2 top-8 text-gray-500" />
            <input
              className="w-4/5 rounded-xl border border-emerald-400 bg-slate-100 py-3 pl-10 font-medium tracking-wide text-gray-700 outline-none"
              {...register('password')}
              type={!hidePassword ? 'password' : 'text'}
              placeholder="******"
            />
            <div className="absolute right-3 top-8 cursor-pointer text-gray-500">
              {!hidePassword ? (
                <EyeClosed
                  onClick={() => setHidePassword(true)}
                  className="hover:text-emerald-400"
                />
              ) : (
                <Eye
                  onClick={() => setHidePassword(false)}
                  className="hover:text-emerald-400"
                />
              )}
            </div>

            <span className="absolute -right-[18px] text-gray-500">*</span>
          </label>
          {errors.password && (
            <p className="ml-3 mt-2 text-[12px] text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center">
          <button
            type="submit"
            className="mb-2 w-4/5 rounded-lg bg-emerald-400 py-1 text-white hover:bg-emerald-300"
          >
            Login
          </button>
          <button
            type="reset"
            onClick={onReset}
            className="mb-4 w-4/5 rounded-lg bg-gray-400 py-1 text-white hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
        {statusSubmit.status && (
          <p
            className={`${statusSubmit.type === 'error' ? 'border-red-600 bg-red-200 text-red-600' : 'border-green-600 bg-green-200 text-green-600'} m-auto my-3 w-4/5 rounded-sm border text-center text-[12px]`}
          >
            {statusSubmit.message}
          </p>
        )}
      </form>
      <Link
        className="block text-center text-[10px] text-emerald-500"
        href="https://www.linkedin.com/in/jacksoncajui/"
        target="_blank"
      >
        Para testa à aplicação, entre encontato!
      </Link>
    </div>
  );
};

export default FormLogin;
