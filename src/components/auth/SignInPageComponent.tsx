"use client"

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SignInSchemaT } from "@/infra/users/users.schemas";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { handleSignIn } from "@/infra/users/users.handlers";

export function SignInPageComponent() {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, setError } = useForm<SignInSchemaT>({
    resolver: zodResolver(signinSchema)
  })

  const submitFunc = async (data: SignInSchemaT) => {
    setIsSubmitting(true)
    try {
      handleSignIn(data).catch(() => {
        setError('email', { message: 'Credenciais inválidas' })
        setError('password', { message: 'Credenciais inválidas' })
        setIsSubmitting(false)
        return
      }).then(() => {
        setIsSubmitting(false)
        return router.replace('/dashboard')
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex min-h-full w-120 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700 dark:text-white`}>Entre na sua conta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" className="space-y-6">
          <div>
            <Label htmlFor="email" className={`block text-sm/6 font-medium text-gray-500 dark:text-gray-100`}>
              Nome de usuário ou E-mail
            </Label>
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                required
                {...register("email")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-gray-300 dark:border-gray-100/20 text-gray-500 dark:text-white dark:border-gray-100/20`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className={`block text-sm/6 font-medium text-gray-500 dark:text-gray-100`}>
                Senha
              </Label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-gray-300 dark:border-gray-100/20 text-gray-500 dark:text-white"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting ? true : false}
              onSubmit={() => handleSubmit(submitFunc)}
              className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 p-4 text-sm/6 font-semibold text-white hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
            >
              {
                isSubmitting ? (
                  <div className="flex flex-row gap-4">
                    <Spinner className="w-6 h-6" />
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}