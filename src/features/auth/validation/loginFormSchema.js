import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase(),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

export default loginFormSchema;