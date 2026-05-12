import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Student Management',
    'Attendance Tracking',
    'Fee Management',
    'Exam Results',
    'Digital Notice Board',
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 900 ? '1fr' : '1fr 1fr',
        fontFamily: 'Inter, sans-serif',
        background: '#f8fafc',
      }}
    >
      {/* LEFT SIDE */}
      {window.innerWidth > 900 && (
        <div
          style={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
            color: 'white',
            padding: '80px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 520, zIndex: 2 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
                backdropFilter: 'blur(10px)',
              }}
            >
              <GraduationCap size={42} />
            </div>

            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              Srinivasa
              <br />
              Vidhyanikethan
            </h1>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.82)',
                marginBottom: 40,
              }}
            >
              Modern school management platform for students, teachers,
              attendance, fees, exams, and academic operations.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              {features.map((feature) => (
                <div
                  key={feature}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.92)',
                  }}
                >
                  <CheckCircle2 size={20} color="#fbbf24" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Background Glow */}
          <div
            style={{
              position: 'absolute',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              top: -120,
              right: -120,
            }}
          />

          <div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              bottom: -80,
              left: -80,
            }}
          />
        </div>
      )}

      {/* RIGHT SIDE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: window.innerWidth < 768 ? 20 : 40,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 430,
            background: 'white',
            padding: window.innerWidth < 768 ? 28 : 42,
            borderRadius: 28,
            boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <GraduationCap size={30} color="#2563eb" />
            </div>

            <h2
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: 8,
              }}
            >
              Welcome Back 👋
            </h2>

            <p
              style={{
                color: '#64748b',
                fontSize: 15,
              }}
            >
              Sign in to continue to dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="admin@srinivasa.edu"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    email: e.target.value,
                  }))
                }
                style={{
                  width: '100%',
                  height: 54,
                  borderRadius: 14,
                  border: '1px solid #cbd5e1',
                  padding: '0 16px',
                  fontSize: 15,
                  outline: 'none',
                  transition: '0.2s',
                }}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                Password
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      password: e.target.value,
                    }))
                  }
                  style={{
                    width: '100%',
                    height: 54,
                    borderRadius: 14,
                    border: '1px solid #cbd5e1',
                    padding: '0 50px 0 16px',
                    fontSize: 15,
                    outline: 'none',
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#64748b',
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: 56,
                border: 'none',
                borderRadius: 14,
                background:
                  'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                transition: '0.3s',
                boxShadow: '0 10px 25px rgba(37,99,235,0.25)',
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* DEMO */}
          <div
            style={{
              marginTop: 28,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 18,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 10,
                color: '#0f172a',
              }}
            >
              Demo Credentials
            </div>

            <div
              style={{
                fontSize: 14,
                color: '#475569',
                lineHeight: 1.8,
              }}
            >
              <div>
                <strong>Email:</strong> admin@srinivasa.edu
              </div>

              <div>
                <strong>Password:</strong> Admin@123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}