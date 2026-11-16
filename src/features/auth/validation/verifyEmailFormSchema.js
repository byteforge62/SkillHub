import {z} from "zod"
const verifyEmailFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email address")
        .toLowerCase(),

    otp: z
        .string()
        .trim()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),
});

export default verifyEmailFormSchema;