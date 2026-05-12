import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import StudentsPage from './pages/studentsPage';
import TeachersPage from './pages/TeachersPage';
import AttendancePage from './pages/AttendancePage';
import FeesPage from './pages/FeesPage';
import ExamsPage from './pages/ExamsPage';
// import NoticesPage from './pages/';
import Layout from './sidebar/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import NoticeBoardPage from './pages/NoticePeriod';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="loading-screen">
      <div className="loader"></div>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <DashboardPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/students" element={<ProtectedRoute><Layout><StudentsPage /></Layout></ProtectedRoute>} />
      <Route path="/teachers" element={<ProtectedRoute><Layout><TeachersPage /></Layout></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Layout><AttendancePage /></Layout></ProtectedRoute>} />
      <Route path="/fees" element={<ProtectedRoute><Layout><FeesPage /></Layout></ProtectedRoute>} />
      <Route path="/exams" element={<ProtectedRoute><Layout><ExamsPage /></Layout></ProtectedRoute>} />
      <Route path="/notices" element={<ProtectedRoute><Layout><NoticeBoardPage /></Layout></ProtectedRoute>} />
      {/* <Route path="/notices" element={<ProtectedRoute><Layout><NoticesPage /></Layout></ProtectedRoute>} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}