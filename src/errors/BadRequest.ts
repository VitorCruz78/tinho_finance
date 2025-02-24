import { ZodIssueBase } from "zod"

export const BadRequest = (error: IBadRequestError[]) => {
  return error.map((err) => {
    return `O campo ${err.path} é obrigatório e deve ser ${err.expected}.`
  })
}

export interface IBadRequestError extends ZodIssueBase {
  expected: string
}
