import { SignIn } from "@/services/user/SignIn";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    password,
  } = await req.json()

  const signIn = new SignIn()
  const data = await signIn.signIn({
    email,
    password,
  }, "app")

  return Response.json({
    status: 201,
    message: 'Success',
    data,
  })
}
