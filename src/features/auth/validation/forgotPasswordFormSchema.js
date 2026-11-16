import {z} from "zod";

const forgotPasswordFormSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email("Please provide a valid email address")
      .toLowerCase(),
});


export default forgotPasswordFormSchema;