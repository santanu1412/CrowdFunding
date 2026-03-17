import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" })
});

export const campaignSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Please provide more details"),
  goalAmount: z.number().min(10, "Minimum goal is $10"),
  category: z.string().nonempty("Category is required"),
  deadline: z.string().nonempty("Deadline is required")
});