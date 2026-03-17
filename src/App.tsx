import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ExecutivesPage = lazy(() => import("@/pages/ExecutivesPage"));
const LecturersPage = lazy(() => import("@/pages/LecturersPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
const AnnouncementDetailPage = lazy(() => import("@/pages/AnnouncementDetailPage"));
const TimetablePage = lazy(() => import("@/pages/TimetablePage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const PayDuesPage = lazy(() => import("@/pages/PayDuesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

const AdminLoginPage = lazy(() => import("@/pages/admin/AdminLoginPage"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminAnnouncementsPage = lazy(() => import("@/pages/admin/AdminAnnouncementsPage"));
const AdminAnnouncementFormPage = lazy(() => import("@/pages/admin/AdminAnnouncementFormPage"));
const AdminExecutivesPage = lazy(() => import("@/pages/admin/AdminExecutivesPage"));
const AdminExecutiveFormPage = lazy(() => import("@/pages/admin/AdminExecutiveFormPage"));
const AdminLecturersPage = lazy(() => import("@/pages/admin/AdminLecturersPage"));
const AdminLecturerFormPage = lazy(() => import("@/pages/admin/AdminLecturerFormPage"));
const AdminGalleryPage = lazy(() => import("@/pages/admin/AdminGalleryPage"));
const AdminTimetablePage = lazy(() => import("@/pages/admin/AdminTimetablePage"));
const AdminPayDuesPage = lazy(() => import("@/pages/admin/AdminPayDuesPage"));
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettingsPage"));

const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <Routes>
              {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/executives" element={<ExecutivesPage />} />
              <Route path="/lecturers" element={<LecturersPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/announcements/:slug" element={<AnnouncementDetailPage />} />
              <Route path="/timetable" element={<TimetablePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/pay-dues" element={<PayDuesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
  
            {/* Admin login (public) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
  
            {/* Admin protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
                <Route path="/admin/announcements/new" element={<AdminAnnouncementFormPage />} />
                <Route path="/admin/announcements/:id/edit" element={<AdminAnnouncementFormPage />} />
                <Route path="/admin/executives" element={<AdminExecutivesPage />} />
                <Route path="/admin/executives/new" element={<AdminExecutiveFormPage />} />
                <Route path="/admin/executives/:id/edit" element={<AdminExecutiveFormPage />} />
                <Route path="/admin/lecturers" element={<AdminLecturersPage />} />
                <Route path="/admin/lecturers/new" element={<AdminLecturerFormPage />} />
                <Route path="/admin/lecturers/:id/edit" element={<AdminLecturerFormPage />} />
                <Route path="/admin/gallery" element={<AdminGalleryPage />} />
                <Route path="/admin/timetable" element={<AdminTimetablePage />} />
                <Route path="/admin/pay-dues" element={<AdminPayDuesPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
              </Route>
            </Route>
  
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
