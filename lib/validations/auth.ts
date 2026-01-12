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
