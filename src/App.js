import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import StudentsPage from './pages/studentsPage';
import TeachersPage from './pages/TeachersPage';
import AttendancePage from './pages/AttendancePage';
import FeesPage from './pages/FeesPage';
import ExamsPage from './pages/ExamsPage';
import NoticeBoardPage from './pages/NoticePeriod';
import SchoolLandingPage from './pages/homePage';

import Layout from './sidebar/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* LANDING PAGE */}
      <Route path="/" element={<SchoolLandingPage />} />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          user ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* STUDENTS */}
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout>
              <StudentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* TEACHERS */}
      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <Layout>
              <TeachersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ATTENDANCE */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Layout>
              <AttendancePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* FEES */}
      <Route
        path="/fees"
        element={
          <ProtectedRoute>
            <Layout>
              <FeesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* EXAMS */}
      <Route
        path="/exams"
        element={
          <ProtectedRoute>
            <Layout>
              <ExamsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* NOTICE BOARD */}
      <Route
        path="/notices"
        element={
          <ProtectedRoute>
            <Layout>
              <NoticeBoardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 3000 }}
        />

        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}