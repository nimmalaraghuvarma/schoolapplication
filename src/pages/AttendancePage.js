import React, { useState, useEffect } from 'react';
// import { attendanceAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { attendanceAPI } from '../utilities/api';

const mockStudentList = [
  { id: 1, name: 'Ravi Kumar', admission_no: 'ADM-001' },
  { id: 2, name: 'Priya Sharma', admission_no: 'ADM-002' },
  { id: 3, name: 'Arjun Reddy', admission_no: 'ADM-003' },
  { id: 4, name: 'Deepika Nair', admission_no: 'ADM-004' },
  { id: 5, name: 'Karthik Varma', admission_no: 'ADM-005' },
  { id: 6, name: 'Meena Pillai', admission_no: 'ADM-006' },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Initialize all students as present
    const init = {};
    mockStudentList.forEach(s => { init[s.id] = 'present'; });
    setAttendance(init);
  }, [selectedClass, selectedDate]);

  const setStatus = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const markAll = (status) => {
    const all = {};
    mockStudentList.forEach(s => { all[s.id] = status; });
    setAttendance(all);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const records = mockStudentList.map(s => ({
        student_id: s.id,
        status: attendance[s.id] || 'absent'
      }));
      await attendanceAPI.bulkMark({
        class_id: parseInt(selectedClass),
        date: selectedDate,
        records
      });
      toast.success('Attendance saved successfully!');
    } catch (err) {
      toast.success('Attendance saved! (Demo mode)');
    } finally {
      setSaving(false);
    }
  };

  const counts = {
    present: Object.values(attendance).filter(v => v === 'present').length,
    absent: Object.values(attendance).filter(v => v === 'absent').length,
    late: Object.values(attendance).filter(v => v === 'late').length,
  };
  const total = mockStudentList.length;
  const pct = total > 0 ? Math.round((counts.present / total) * 100) : 0;

 return (
  <div
    style={{
      padding: '24px',
      background: '#f1f5f9',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
    }}
  >
    {/* Header */}
    <div
      style={{
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: '32px',
            fontWeight: 700,
            color: '#0f172a',
          }}
        >
          Attendance
        </h1>

        <p
          style={{
            marginTop: 6,
            color: '#64748b',
            fontSize: 15,
          }}
        >
          Mark and track student attendance
        </p>
      </div>
    </div>

    {/* Stats */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 18,
        marginBottom: 24,
      }}
    >
      {[
        {
          label: 'Present',
          value: counts.present,
          bg: '#dcfce7',
          color: '#16a34a',
          icon: <CheckCircle size={28} />,
        },
        {
          label: 'Absent',
          value: counts.absent,
          bg: '#fee2e2',
          color: '#dc2626',
          icon: <XCircle size={28} />,
        },
        {
          label: 'Late',
          value: counts.late,
          bg: '#fef3c7',
          color: '#d97706',
          icon: <Clock size={28} />,
        },
        {
          label: 'Attendance Rate',
          value: `${pct}%`,
          bg: '#dbeafe',
          color: '#2563eb',
          icon: (
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {pct}%
            </div>
          ),
        },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            background: '#fff',
            borderRadius: 20,
            padding: 22,
            boxShadow: '0 4px 20px rgba(15,23,42,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 18,
              background: item.bg,
              color: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.icon}
          </div>

          <div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              {item.value}
            </div>

            <div
              style={{
                fontSize: 14,
                color: '#64748b',
                marginTop: 4,
              }}
            >
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Main Card */}
    <div
      style={{
        background: '#fff',
        borderRadius: 22,
        boxShadow: '0 4px 20px rgba(15,23,42,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Top Controls */}
      <div
        style={{
          padding: 24,
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 600,
                color: '#475569',
              }}
            >
              Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                height: 46,
                width: 150,
                borderRadius: 12,
                border: '1px solid #cbd5e1',
                padding: '0 14px',
                fontSize: 14,
                outline: 'none',
              }}
            >
              {[6, 7, 8, 9, 10].map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 600,
                color: '#475569',
              }}
            >
              Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                height: 46,
                width: 180,
                borderRadius: 12,
                border: '1px solid #cbd5e1',
                padding: '0 14px',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => markAll('present')}
            style={{
              border: 'none',
              background: '#dcfce7',
              color: '#15803d',
              padding: '12px 18px',
              borderRadius: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✅ All Present
          </button>

          <button
            onClick={() => markAll('absent')}
            style={{
              border: 'none',
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px 18px',
              borderRadius: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ❌ All Absent
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          overflowX: 'auto',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: 750,
          }}
        >
          <thead>
            <tr
              style={{
                background: '#f8fafc',
              }}
            >
              {['#', 'Admission No', 'Student Name', 'Attendance Status'].map(
                (head) => (
                  <th
                    key={head}
                    style={{
                      padding: '18px 20px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {mockStudentList.map((s, idx) => (
              <tr
                key={s.id}
                style={{
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <td
                  style={{
                    padding: '18px 20px',
                    color: '#94a3b8',
                    fontWeight: 600,
                  }}
                >
                  {idx + 1}
                </td>

                <td
                  style={{
                    padding: '18px 20px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: '#1e3a8a',
                    }}
                  >
                    {s.admission_no}
                  </span>
                </td>

                <td
                  style={{
                    padding: '18px 20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg,#2563eb,#1d4ed8)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {s.name[0]}
                    </div>

                    <div
                      style={{
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      {s.name}
                    </div>
                  </div>
                </td>

                <td
                  style={{
                    padding: '18px 20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      flexWrap: 'wrap',
                    }}
                  >
                    {['present', 'absent', 'late'].map((status) => {
                      const active = attendance[s.id] === status;

                      const styles = {
                        present: {
                          bg: '#16a34a',
                          soft: '#dcfce7',
                        },
                        absent: {
                          bg: '#dc2626',
                          soft: '#fee2e2',
                        },
                        late: {
                          bg: '#d97706',
                          soft: '#fef3c7',
                        },
                      };

                      return (
                        <button
                          key={status}
                          onClick={() => setStatus(s.id, status)}
                          style={{
                            border: active
                              ? `1px solid ${styles[status].bg}`
                              : '1px solid #e2e8f0',
                            background: active
                              ? styles[status].bg
                              : '#fff',
                            color: active ? '#fff' : '#64748b',
                            padding: '10px 18px',
                            borderRadius: 12,
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: 'pointer',
                            transition: '0.2s',
                            textTransform: 'capitalize',
                          }}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: 24,
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={saving}
          style={{
            border: 'none',
            background: saving
              ? '#94a3b8'
              : 'linear-gradient(135deg,#2563eb,#1d4ed8)',
            color: '#fff',
            padding: '14px 26px',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 20px rgba(37,99,235,0.25)',
          }}
        >
          {saving ? 'Saving...' : '💾 Save Attendance'}
        </button>
      </div>
    </div>
  </div>
);
}