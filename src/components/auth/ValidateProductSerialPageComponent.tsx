"use client"

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { validateProductSerial, type ValidateProductSerialT } from "@/infra/users/users.schemas";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

import { z } from "zod";

export function ValidateProductSerialPageComponent() {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, setError } = useForm<ValidateProductSerialT>({
    resolver: zodResolver(validateProductSerial)
  })

  const submitFunc = async (data: z.infer<typeof validateProductSerial>) => {
    setIsSubmitting(true)
    try {
      const request = await fetch('/api/auth_validate_serial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (!request.ok) {
        setError('serial', { message: 'Credenciais inválidas' })
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
    <div className="flex min-h-full w-120 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700 dark:text-white`}>Ativar licença de produto</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-500 dark:text-gray-100">
                Serial do produto
              </Label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Onde encontro o serial?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="product-serial"
                type="text"
                required
                {...register("serial")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-gray-300 dark:border-gray-100/20 text-gray-500 dark:text-white dark:border-gray-100/20`}
              />
            </div>
          </div>

          <div>
            <Button
              disabled={isSubmitting ? true : false}
              type="submit"
              onSubmit={() => handleSubmit(submitFunc)}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {
                isSubmitting ? (
                  <div className="flex flex-row gap-4">
                    <Spinner className="w-6 h-6" />
                    Validando serial...
                  </div>
                ) : (
                  "Validar Serial"
                )
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}