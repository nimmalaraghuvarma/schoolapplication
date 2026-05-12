import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const navItems = [
  {
    path: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
    section: 'MAIN',
  },
  {
    path: '/students',
    icon: GraduationCap,
    label: 'Students',
    section: 'ACADEMIC',
  },
  {
    path: '/teachers',
    icon: Users,
    label: 'Teachers',
    section: 'ACADEMIC',
  },
  {
    path: '/attendance',
    icon: CalendarCheck,
    label: 'Attendance',
    section: 'ACADEMIC',
  },
  {
    path: '/exams',
    icon: FileText,
    label: 'Exams & Results',
    section: 'ACADEMIC',
  },
  {
    path: '/fees',
    icon: CreditCard,
    label: 'Fee Management',
    section: 'FINANCE',
  },
  {
    path: '/notices',
    icon: Bell,
    label: 'Notice Board',
    section: 'COMMUNICATION',
  },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = [...new Set(navItems.map((i) => i.section))];

  const pageTitle =
    navItems.find((i) => i.path === location.pathname)?.label ||
    'Dashboard';

  const isMobile = window.innerWidth < 900;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* MOBILE OVERLAY */}
      {mobileOpen && isMobile && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.5)',
            zIndex: 999,
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          width: 260,
          background: '#0f172a',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: isMobile ? (mobileOpen ? 0 : -320) : 0,
          height: '100vh',
          transition: '0.3s ease',
          zIndex: 1000,
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* BRAND */}
        <div
          style={{
            padding: '28px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              background:
                'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            🏫
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 800,
                lineHeight: 1.3,
              }}
            >
              Srinivasa
              <br />
              Vidhyanikethan
            </h2>

            <div
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 4,
              }}
            >
              School Management
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '22px 14px',
          }}
        >
          {sections.map((section) => (
            <div key={section} style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.45)',
                  padding: '0 14px',
                  marginBottom: 12,
                }}
              >
                {section}
              </div>

              {navItems
                .filter((i) => i.section === section)
                .map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 16px',
                      marginBottom: 6,
                      borderRadius: 16,
                      textDecoration: 'none',
                      color: isActive
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.72)',
                      background: isActive
                        ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                        : 'transparent',
                      fontWeight: isActive ? 700 : 500,
                      transition: '0.25s',
                      boxShadow: isActive
                        ? '0 10px 20px rgba(37,99,235,0.25)'
                        : 'none',
                    })}
                  >
                    <item.icon size={19} />
                    {item.label}
                  </NavLink>
                ))}
            </div>
          ))}
        </div>

        {/* USER CARD */}
        <div
          style={{
            padding: 20,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {user?.name || 'Admin'}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 2,
                }}
              >
                {user?.role || 'Administrator'}
              </div>
            </div>

            <button
              onClick={logout}
              style={{
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                width: 38,
                height: 38,
                borderRadius: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: isMobile ? 0 : 0,
          minWidth: 0,
        }}
      >
        {/* HEADER */}
        <header
          style={{
            height: 80,
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Menu size={20} />
              </button>
            )}

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                {pageTitle}
              </h1>

              <div
                style={{
                  fontSize: 13,
                  color: '#64748b',
                  marginTop: 4,
                }}
              >
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* MOBILE CLOSE */}
          {mobileOpen && isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                border: 'none',
                background: '#f1f5f9',
                width: 42,
                height: 42,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
          )}
        </header>

        {/* PAGE */}
        <main
          style={{
            flex: 1,
            padding: isMobile ? 18 : 28,
            overflow: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}