import { BaseErrors } from "@/errors/BaseErrors";
import { errorHandler } from "@/errors/errorHandler";
import { SignIn } from "@/services/user/SignIn";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest, res: NextApiResponse) {
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

    return res.status(201).json({
      message: 'Success',
      data,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Valide os campos informados.",
        details: error.errors,
      })
    }

    return errorHandler(res, error)
  }
}
