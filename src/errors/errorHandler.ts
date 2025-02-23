import { NextApiResponse } from "next";
import { BaseErrors } from "./BaseErrors";

export function errorHandler(res: NextApiResponse, error: unknown) {
  if (error instanceof BaseErrors) {
    res.status(error.statusCode).json({ error: error.message })
  } else {
    console.log(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}
