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
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome de usuário deve conter no mínimo 2 dígitos."
  }),
  email: z.string().email({
    message: "E-mail inválido."
  }),
  password: z.string().min(6, {
    message: "A senha deve conter no mínimo 6 dígitos."
  })
})

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)

      await api.post('/api/v1/user/register', {
        name: values?.name,
        email: values?.email,
        password: values?.password,
      })

      form.resetField("name")
      form.resetField("email")
      form.resetField("password")

      toast({
        variant: "default",
        title: "Conta criada com sucesso",
        duration: 5000,
      })
      return router.push('/')
    } catch (err) {
      // implement erros alert
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-6 right-6">
        <Link href={'/sign-in'} className="text-sm underline hover:opacity-90">Login</Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        {
          loading ?
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <p className="text-2xl animate-pulse">Criando sua conta...</p>
            </div> :
            <>
              <h1 className="text-4xl font-bold">Crie sua conta</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center">
                  <FormField
                    control={form.control}
                    name="name"
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
            </>
        }
      </div>
    </div>
  )
}
