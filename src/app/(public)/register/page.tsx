"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "O nome de usuário deve conter no mínimo 2 dígitos."
  }),
  email: z.string().email({
    message: "E-mail inválido."
  }),
  password: z.string().min(4, {
    message: "A senha deve conter no mínimo 4 dígitos."
  })
})

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post('/api/v1/user/register', {
        name: values?.username,
        email: values?.email,
        password: values?.password,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 ">
        <h1 className="text-4xl font-bold">Crie sua conta</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-72 sm:w-96">
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: John Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-72 sm:w-96">
                  <FormLabel>Seu email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: nome@exemplo.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-72 sm:w-96">
                  <FormLabel>Sua senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-72 sm:w-96">Cadastrar</Button>
          </form>
        </Form>
        <div className="w-full flex flex-row items-center justify-center text-xs text-center uppercase">
          <hr className="w-1/3"></hr>
          <span className="w-1/3">Ou continue com</span>
          <hr className="w-1/3"></hr>
        </div>
        <Button onClick={() => signIn('google')} className="w-1/2">Google</Button>
      </div>
    </div>
  )
}
