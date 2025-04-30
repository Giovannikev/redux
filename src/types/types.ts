export type FieldName = "name" | "email" | "password" | "confirmPassword"

export interface FormState {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ErrorState {
  name: string
  email: string
  password: string
  confirmPassword: string
}

