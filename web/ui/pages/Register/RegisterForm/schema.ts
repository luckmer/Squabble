import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'Must include one uppercase letter')
  .regex(/[0-9]/, 'Must include one number')

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'At least 3 characters')
      .max(20, 'No more than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers and underscores only'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      const passwordValid = passwordSchema.safeParse(data.password).success
      if (!passwordValid || !data.confirmPassword) return true
      return data.password === data.confirmPassword
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

export type RegisterFormValues = z.infer<typeof registerSchema>
