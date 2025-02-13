"use client";

import { z } from "zod"

export default function SignIn() {
  const formSchema = z.object({

  })

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-[28rem] h-96 border border-default rounded-md flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Login</h1>
      </div>
    </div>
  )
}
