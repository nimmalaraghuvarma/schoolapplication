import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import {
  Users,
  GraduationCap,
  IndianRupee,
  CalendarCheck,
  Bell,
  TrendingUp
} from 'lucide-react';

import { dashboardAPI } from '../utilities/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getStats()
      .then(r => setStats(r.data))
      .catch(() => setStats(getMockStats()))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          color: '#64748b',
          background: '#f8fafc'
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  const s = stats || getMockStats();

  const styles = {
    page: {
      padding: 24,
      background: '#f1f5f9',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    },

    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 28,
      flexWrap: 'wrap',
      gap: 12
    },

    title: {
      fontSize: 30,
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: 6
    },

    subtitle: {
      color: '#64748b',
      fontSize: 14
    },

    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 20,
      marginBottom: 28
    },

    statCard: {
      background: '#fff',
      borderRadius: 20,
      padding: 22,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      boxShadow: '0 4px 20px rgba(15,23,42,0.06)',
      border: '1px solid #e2e8f0'
    },

    statIcon: {
      width: 64,
      height: 64,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    statValue: {
      fontSize: 28,
      fontWeight: 700,
      color: '#0f172a'
    },

    statLabel: {
      fontSize: 14,
      color: '#64748b',
      marginTop: 4
    },

    card: {
      background: '#fff',
      borderRadius: 20,
      padding: 22,
      boxShadow: '0 4px 20px rgba(15,23,42,0.06)',
      border: '1px solid #e2e8f0'
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: 20
    },

    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 22,
      marginBottom: 24
    },

    progressRow: {
      marginBottom: 22
    },

    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8,
      fontSize: 14
    },

    progressBarBg: {
      height: 10,
      background: '#e2e8f0',
      borderRadius: 999
    },

    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },

    th: {
      textAlign: 'left',
      padding: '12px 14px',
      fontSize: 12,
      textTransform: 'uppercase',
      color: '#64748b',
      background: '#f8fafc',
      letterSpacing: '0.05em'
    },

    td: {
      padding: '14px',
      borderBottom: '1px solid #e2e8f0',
      fontSize: 14
    },

    noticeCard: {
      padding: 16,
      borderRadius: 14,
      marginBottom: 12,
      background: '#f8fafc',
      border: '1px solid #e2e8f0'
    },

    badge: {
      padding: '5px 10px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase'
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.topBar}>
        <div>
          <div style={styles.title}>School Dashboard</div>
          <div style={styles.subtitle}>
            Welcome back 👋 Here's what's happening today
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            padding: '12px 18px',
            borderRadius: 14,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            fontSize: 14,
            color: '#475569'
          }}
        >
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: '#dbeafe' }}>
            <GraduationCap size={30} color="#2563eb" />
          </div>

          <div>
            <div style={styles.statValue}>{s.total_students}</div>
            <div style={styles.statLabel}>Total Students</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: '#dcfce7' }}>
            <Users size={30} color="#16a34a" />
          </div>

          <div>
            <div style={styles.statValue}>{s.total_teachers}</div>
            <div style={styles.statLabel}>Teachers</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: '#fef3c7' }}>
            <CalendarCheck size={30} color="#d97706" />
          </div>

          <div>
            <div style={styles.statValue}>{s.today_attendance}%</div>
            <div style={styles.statLabel}>Attendance</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: '#ede9fe' }}>
            <IndianRupee size={30} color="#7c3aed" />
          </div>

          <div>
            <div style={styles.statValue}>
              ₹{(s.fee_collected / 1000).toFixed(0)}K
            </div>
            <div style={styles.statLabel}>Fees Collected</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.grid2}>
        {/* Attendance */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            Monthly Attendance Trend
          </div>

          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.monthly_attendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />

                <Tooltip />

                <Bar
                  dataKey="percentage"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Overview */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            Fee Collection Overview
          </div>

          <div style={styles.progressRow}>
            <div style={styles.progressHeader}>
              <span>Collected</span>
              <strong>
                ₹{s.fee_collected.toLocaleString('en-IN')}
              </strong>
            </div>

            <div style={styles.progressBarBg}>
              <div
                style={{
                  height: '100%',
                  width: `${(s.fee_collected / s.fee_total) * 100}%`,
                  background: '#10b981',
                  borderRadius: 999
                }}
              />
            </div>
          </div>

          <div style={styles.progressRow}>
            <div style={styles.progressHeader}>
              <span>Pending</span>
              <strong>
                ₹{s.fee_pending.toLocaleString('en-IN')}
              </strong>
            </div>

            <div style={styles.progressBarBg}>
              <div
                style={{
                  height: '100%',
                  width: `${(s.fee_pending / s.fee_total) * 100}%`,
                  background: '#ef4444',
                  borderRadius: 999
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginTop: 28
            }}
          >
            <div
              style={{
                background: '#dcfce7',
                borderRadius: 16,
                padding: 20,
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#166534'
                }}
              >
                ₹{s.fee_collected.toLocaleString('en-IN')}
              </div>

              <div
                style={{
                  fontSize: 13,
                  marginTop: 6,
                  color: '#15803d'
                }}
              >
                Total Collected
              </div>
            </div>

            <div
              style={{
                background: '#fee2e2',
                borderRadius: 16,
                padding: 20,
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#991b1b'
                }}
              >
                ₹{s.fee_pending.toLocaleString('en-IN')}
              </div>

              <div
                style={{
                  fontSize: 13,
                  marginTop: 6,
                  color: '#dc2626'
                }}
              >
                Pending Amount
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.grid2}>
        {/* Exams */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            Upcoming Exams
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Exam</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>

            <tbody>
              {s.upcoming_exams.map(exam => (
                <tr key={exam.id}>
                  <td style={styles.td}>{exam.name}</td>

                  <td
                    style={{
                      ...styles.td,
                      color: '#64748b'
                    }}
                  >
                    {exam.subject}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background: '#dbeafe',
                        color: '#2563eb'
                      }}
                    >
                      {exam.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notices */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            Recent Notices
          </div>

          {s.recent_notices.map(n => (
            <div
              key={n.id}
              style={styles.noticeCard}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: 6
                    }}
                  >
                    {n.title}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: '#64748b'
                    }}
                  >
                    {n.category} •{' '}
                    {new Date(n.date).toLocaleDateString('en-IN')}
                  </div>
                </div>

                <span
                  style={{
                    ...styles.badge,
                    background:
                      n.priority === 'high'
                        ? '#fee2e2'
                        : n.priority === 'low'
                        ? '#dcfce7'
                        : '#dbeafe',

                    color:
                      n.priority === 'high'
                        ? '#dc2626'
                        : n.priority === 'low'
                        ? '#16a34a'
                        : '#2563eb'
                  }}
                >
                  {n.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getMockStats() {
  return {
    total_students: 487,
    total_teachers: 28,
    today_attendance: 92.4,
    fee_total: 2450000,
    fee_collected: 1870000,
    fee_pending: 580000,

    monthly_attendance: [
      { month: 'Dec', percentage: 88 },
      { month: 'Jan', percentage: 91 },
      { month: 'Feb', percentage: 86 },
      { month: 'Mar', percentage: 93 },
      { month: 'Apr', percentage: 89 },
      { month: 'May', percentage: 92 }
    ],

    upcoming_exams: [
      {
        id: 1,
        name: 'Unit Test 3',
        subject: 'Mathematics',
        date: '05 Jun'
      },
      {
        id: 2,
        name: 'Science Test',
        subject: 'Science',
        date: '07 Jun'
      },
      {
        id: 3,
        name: 'Mid-Term',
        subject: 'English',
        date: '12 Jun'
      }
    ],

    recent_notices: [
      {
        id: 1,
        title: 'Annual Sports Day — June 15',
        category: 'Event',
        priority: 'high',
        date: '2025-05-20'
      },
      {
        id: 2,
        title: 'Fee Submission Date Extended',
        category: 'Academic',
        priority: 'normal',
        date: '2025-05-18'
      },
      {
        id: 3,
        title: 'Summer Vacation Announcement',
        category: 'Holiday',
        priority: 'low',
        date: '2025-05-15'
      }
    ]
  };
}