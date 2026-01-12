import z from "zod/v3";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Por favor, ingrese su correo electrónico.",
    })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Por favor, ingrese su contraseña." })
    .trim(),
});

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Por favor, ingrese un correo electrónico válido." })
      .trim(),
    name: z
      .string()
      .min(1, {
        message: "Por favor, ingrese su nombre.",
      })
      .trim(),
    token: z.string().trim(),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .regex(/[a-zA-Z]/, { message: "La contraseña debe incluir letras." })
      .regex(/[0-9]/, { message: "La contraseña debe incluir números." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "La contraseña debe incluir caracteres especiales.",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña no coincide.",
        path: ["confirmPassword"],
      });
    }
  });
