import { CreateUser } from "@/services/user/Create";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    name,
    email,
    password,
  } = await req.json()

  const createUser = new CreateUser()
  await createUser.create({
    name,
    email,
    password,
  }, 'app')

  return Response.json({
    status: 201,
    message: 'Success'
  })
}
