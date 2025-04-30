"use client"

import type React from "react"

import { useState, useCallback } from "react"
import type { FormState, ErrorState, FieldName } from "@/types/types"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useFormValidation = () => {
  const [, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<ErrorState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword] = useState({
    password: false,
    confirmPassword: false,
  })

  const nameValidator = useCallback((value: string) => (value ? "" : "Le nom est requis"), [])

  const emailValidator = useCallback((value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? "" : "Email invalide"
  }, [])

  const passwordValidator = useCallback(
    (value: string) => (value.length >= 6 ? "" : "Le mot de passe doit avoir au moins 6 caractères"),
    [],
  )

  const confirmPasswordValidator = useCallback(
    (password: string) => (value: string) => (value === password ? "" : "Les mots de passe ne correspondent pas"),
    [],
  )

  const validateField = useCallback(
    (field: FieldName, value: string) => {
      let processedValue = value

      if (field === "name") {
        processedValue = value.toUpperCase()
      }

      setFormState((prev) => ({ ...prev, [field]: processedValue }))

      let errorMessage = ""
      switch (field) {
        case "name":
          errorMessage = nameValidator(processedValue)
          break
        case "email":
          errorMessage = emailValidator(value)
          break
        case "password":
          errorMessage = passwordValidator(value)
          break
        case "confirmPassword":
          errorMessage = confirmPasswordValidator(formState.password)(value)
          break
        default:
          break
      }

      setErrors((prev) => ({ ...prev, [field]: errorMessage }))
    },
    [formState.password, nameValidator, emailValidator, passwordValidator, confirmPasswordValidator],
  )

  const getPasswordStrength = (password: string) => {
    if (!password) return { value: 0, color: "bg-gray-200" }

    const strength = Math.min(100, password.length * 16.6)

    if (strength < 33) return { value: strength, color: "bg-red-500" }
    if (strength < 66) return { value: strength, color: "bg-yellow-500" }
    return { value: strength, color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength(formState.password)

  const isValid =
    Object.values(errors).every((error) => error === "") && Object.values(formState).every((field) => field !== "")


  const isFieldValid = (field: FieldName) => {
    return formState[field] && !errors[field]
  }

  return {
    formState,
    errors,
    showPassword,
    validateField,
    passwordStrength,
    isValid,
    isFieldValid,
    onSubmitForm: async (e: React.FormEvent) => {
      e.preventDefault()
      if (isValid) {
        console.log(formState)
        navigate("/dashboard")
        setIsLoading(true)

        try {

          toast.success("Connexion réussie !")
          navigate("/dashboard")
        } catch (error) {
          toast.error("Erreur de connexion", { description: ` ${error}Veuillez vérifier vos identifiants.` })
        } finally {
          setIsLoading(false)
        }
      }

    },
  }
}

