import { Register } from "@/services/user/Register";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    name,
    email,
    password,
  } = await req.json()

  const register = new Register()
  const data = await register.create({
    name,
    email,
    password,
  }, 'app')

  return Response.json({
    status: 201,
    message: 'Success',
    data,
  })
}
