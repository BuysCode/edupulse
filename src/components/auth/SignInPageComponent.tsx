"use client"

import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/schemas";
import { Eye, EyeClosed, User } from "lucide-react";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export function SignInPageComponent() {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, setError } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema)
  })

  const submitFunc = async (data: z.infer<typeof signinSchema>) => {
    setIsSubmitting(true)
		try {
      const request = await fetch('http://localhost:9000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (!request.ok) {
        setError('username_or_email', { message: 'Credenciais inválidas' })
        setError('password', { message: 'Credenciais inválidas' })
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      return router.replace('/dashboard')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Card className="flex w-full max-w-md flex-col border border-gray-300 bg-white p-4 text-gray-800 shadow-lg dark:bg-gray-900 dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Entre na sua conta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
          Username
        </Label>
        <div className="relative flex flex-row-reverse items-center">
          <User className="absolute top-1/2 -translate-y-1/2 mr-2 text-vibe-500 pointer-events-none" />
          <Input
            id="username"
            placeholder="Digite seu nome de usuário ou email"
            {...register("username_or_email")}
            className="p-2 border border-gray-300"
          />
        </div>
        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
          Password
        </Label>
        <div className="relative flex flex-row-reverse items-center">
          {
            showPassword ? (
              <EyeClosed className="absolute top-1/2 -translate-y-1/2 mr-2 text-vibe-500 cursor-pointer hover:text-vibe-700" onClick={() => setShowPassword(false)} />
            ) : (
              <Eye className="absolute top-1/2 -translate-y-1/2 mr-2 text-vibe-500 cursor-pointer hover:text-vibe-700" onClick={() => setShowPassword(true)} />
            )
          }
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            {...register("password")}
            className="p-2 border border-gray-300"
          />
        </div>
        <Link href="/forgot-password" className="flex justify-end text-sm hover:underline">
          Esqueci a senha
        </Link>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <Button onSubmit={() => handleSubmit(submitFunc)} className="w-full cursor-pointer font-bold p-4 text-lg bg-vibe-600 hover:bg-vibe-700 text-white flex items-center justify-center">
            {isSubmitting ? (
              <>
                <Spinner className="w-5 h-5 mr-2 text-white" />
                <p>Entrando...</p>
              </>
            ) : "Entrar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}