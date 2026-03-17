export interface Executive {
  id: string;
  name: string;
  position: string;
  photo_url: string | null;
  bio: string | null;
  email: string | null;
  social_link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface Lecturer {
  id: string;
  name: string;
  title: string;
  specialization: string | null;
  photo_url: string | null;
  bio: string | null;
  email: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  featured_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  display_order: number;
  uploaded_at: string | null;
}

export interface TimetableEntry {
  id: string;
  course: string;
  course_code: string;
  lecturer: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  start_time: string;
  end_time: string;
  location: string;
  level: '100L' | '200L' | '300L' | '400L' | '500L';
  semester: 'First Semester' | 'Second Semester';
  created_at: string | null;
  updated_at: string | null;
}

export interface SiteSettings {
  [key: string]: string;
}

export interface PaymentSubmission {
  id: string;
  full_name: string;
  matric_number: string;
  amount: string;
  receipt_url: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}
