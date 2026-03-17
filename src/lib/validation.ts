import { z } from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  author: z.string().min(2, "Author name required"),
  excerpt: z.string().max(200).optional().or(z.literal('')),
  content: z.string().min(20, "Content too short"),
  published_at: z.string(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
});

export const executiveSchema = z.object({
  name: z.string().min(2, "Name required"),
  position: z.string().min(2, "Position required"),
  bio: z.string().optional().or(z.literal('')),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  social_link: z.string().url("Invalid URL").optional().or(z.literal('')),
  display_order: z.number().int().min(0),
  is_active: z.boolean(),
});

export const lecturerSchema = z.object({
  name: z.string().min(2, "Name required"),
  title: z.string().min(2, "Title required"),
  specialization: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  display_order: z.number().int().min(0),
  is_active: z.boolean(),
});

export const timetableSchema = z.object({
  course: z.string().min(2),
  course_code: z.string().min(2),
  lecturer: z.string().min(2),
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:MM format"),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, "Use HH:MM format"),
  location: z.string().min(2),
  level: z.enum(['100L', '200L', '300L', '400L', '500L']),
  semester: z.enum(['First Semester', 'Second Semester']),
}).refine(data => data.end_time > data.start_time, {
  message: "End time must be after start time",
  path: ["end_time"],
});

export const paymentSubmissionSchema = z.object({
  full_name: z.string().min(3, "Full name required"),
  matric_number: z.string().min(5, "Valid matric number required"),
  amount: z.string().min(1, "Amount required"),
  receipt_url: z.string().url("Please upload your receipt screenshot"),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;
export type ExecutiveFormData = z.infer<typeof executiveSchema>;
export type LecturerFormData = z.infer<typeof lecturerSchema>;
export type TimetableFormData = z.infer<typeof timetableSchema>;
export type PaymentSubmissionFormData = z.infer<typeof paymentSubmissionSchema>;
