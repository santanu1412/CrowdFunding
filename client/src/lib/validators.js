import { z } from 'zod';

/**
 * Zod validation schemas.
 * These act as the single source of truth for form rules, preventing bad data
 * from ever reaching the backend API.
 */

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address format" }),
  password: z.string()
    .min(8, { message: "Security key must be at least 8 characters" })
});

export const registerSchema = loginSchema.extend({
  name: z.string()
    .min(2, { message: "Designation must be at least 2 characters" })
    .max(50, { message: "Designation cannot exceed 50 characters" })
});

export const campaignSchema = z.object({
  title: z.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string()
    .min(20, "Please provide a more detailed project vision (min 20 characters)"),
  goalAmount: z.number({ invalid_type_error: "Goal must be a numerical value" })
    .min(10, "Minimum funding goal is $10"),
  category: z.string()
    .min(1, "A sector designation is required"),
  deadline: z.string()
    .min(1, "Campaign termination date is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Deadline must be a future date",
    })
});