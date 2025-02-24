import { BadRequest, IBadRequestError } from "@/errors/BadRequest";
import { SignIn } from "@/services/user/SignIn";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    signInSchema.parse(await req.json())

    const {
      email,
      password,
    } = await req.json()

    const signIn = new SignIn()
    const data = await signIn.signIn({
      email,
      password,
    }, "app")

    return NextResponse.json({
      message: 'Success',
      data,
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: 'Erro de validação',
        details: BadRequest(error.errors as IBadRequestError[]),
      }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Erro interno.',
      details: "Um erro interno não esperado ocorreu.",
    }, { status: 500 })
  }
}
