import React, { useState, useEffect } from 'react';
// import { examsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Plus, X, FileText } from 'lucide-react';
import { examsAPI } from '../utilities/api';



const emptyExam = {
  name: '',
  class_id: '',
  subject: '',
  exam_date: '',
  max_marks: '100',
  passing_marks: '35',
  academic_year: '2024-25',
};

const mockExams = [
  {
    id: 1,
    name: 'Unit Test 1',
    subject: 'Mathematics',
    class_id: 8,
    exam_date: '2025-09-20',
    max_marks: 50,
    passing_marks: 17,
    academic_year: '2024-25',
  },
  {
    id: 2,
    name: 'Unit Test 1',
    subject: 'Science',
    class_id: 8,
    exam_date: '2025-09-25',
    max_marks: 50,
    passing_marks: 17,
    academic_year: '2024-25',
  },
  {
    id: 3,
    name: 'Mid-Term Exam',
    subject: 'English',
    class_id: 9,
    exam_date: '2025-05-05',
    max_marks: 100,
    passing_marks: 35,
    academic_year: '2024-25',
  },
  {
    id: 4,
    name: 'Final Exam',
    subject: 'Social Studies',
    class_id: 10,
    exam_date: '2025-04-10',
    max_marks: 100,
    passing_marks: 35,
    academic_year: '2024-25',
  },
];

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyExam);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 500);
  }, []);

  const handleSave = () => {
    if (!form.name || !form.subject) {
      toast.error('Name and Subject required');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const newExam = {
        id: exams.length + 1,
        ...form,
      };

      setExams((prev) => [...prev, newExam]);

      toast.success('Exam scheduled successfully');

      setForm(emptyExam);
      setShowModal(false);
      setSaving(false);
    }, 700);
  };

  const f = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  const today = new Date().toISOString().split('T')[0];

  const upcoming = exams.filter((e) => e.exam_date >= today);

  const past = exams.filter((e) => e.exam_date < today);

  return (
    <div
      style={{
        padding: '24px',
        background: '#f8fafc',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            Exams & Results
          </h1>

          <p
            style={{
              margin: '6px 0 0',
              color: '#64748b',
              fontSize: '14px',
            }}
          >
            Schedule exams and manage results
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyExam);
            setShowModal(true);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '12px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          <Plus size={16} />
          Schedule Exam
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          marginBottom: '24px',
        }}
      >
        {[
          {
            label: 'Total Exams',
            value: exams.length,
            bg: '#dbeafe',
            color: '#1d4ed8',
          },
          {
            label: 'Upcoming',
            value: upcoming.length,
            bg: '#fef3c7',
            color: '#d97706',
          },
          {
            label: 'Completed',
            value: past.length,
            bg: '#d1fae5',
            color: '#059669',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={26} color={item.color} />
            </div>

            <div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                }}
              >
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UPCOMING */}
      <div
        style={{
          background: '#fff',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid #e2e8f0',
            fontWeight: 700,
            fontSize: '18px',
            color: '#0f172a',
          }}
        >
          📅 Upcoming Exams
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '750px',
            }}
          >
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {[
                  'Exam Name',
                  'Subject',
                  'Class',
                  'Date',
                  'Max Marks',
                  'Passing Marks',
                  'Status',
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '14px',
                      textAlign: 'left',
                      fontSize: '13px',
                      color: '#64748b',
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding: '30px',
                      textAlign: 'center',
                    }}
                  >
                    Loading exams...
                  </td>
                </tr>
              ) : upcoming.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding: '30px',
                      textAlign: 'center',
                      color: '#94a3b8',
                    }}
                  >
                    No upcoming exams
                  </td>
                </tr>
              ) : (
                upcoming.map((exam) => (
                  <tr
                    key={exam.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <td
                      style={{
                        padding: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {exam.name}
                    </td>

                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          background: '#dbeafe',
                          color: '#1d4ed8',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {exam.subject}
                      </span>
                    </td>

                    <td style={{ padding: '14px' }}>
                      Class {exam.class_id}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.exam_date}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.max_marks}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.passing_marks}
                    </td>

                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          background: '#dbeafe',
                          color: '#2563eb',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        Upcoming
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPLETED */}
      <div
        style={{
          background: '#fff',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid #e2e8f0',
            fontWeight: 700,
            fontSize: '18px',
            color: '#0f172a',
          }}
        >
          ✅ Completed Exams
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '700px',
            }}
          >
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {[
                  'Exam Name',
                  'Subject',
                  'Class',
                  'Date',
                  'Max Marks',
                  'Academic Year',
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '14px',
                      textAlign: 'left',
                      fontSize: '13px',
                      color: '#64748b',
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {past.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: '40px',
                      textAlign: 'center',
                      color: '#94a3b8',
                    }}
                  >
                    No completed exams
                  </td>
                </tr>
              ) : (
                past.map((exam) => (
                  <tr
                    key={exam.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    <td
                      style={{
                        padding: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {exam.name}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.subject}
                    </td>

                    <td style={{ padding: '14px' }}>
                      Class {exam.class_id}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.exam_date}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.max_marks}
                    </td>

                    <td style={{ padding: '14px' }}>
                      {exam.academic_year}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          onClick={(e) =>
            e.target === e.currentTarget && setShowModal(false)
          }
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '700px',
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: 700,
                }}
              >
                Schedule New Exam
              </h2>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                padding: '24px',
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(220px,1fr))',
                gap: '18px',
              }}
            >
              {[
                ['Exam Name *', 'name', 'text'],
                ['Subject *', 'subject', 'text'],
                ['Exam Date', 'exam_date', 'date'],
                ['Max Marks', 'max_marks', 'number'],
                ['Passing Marks', 'passing_marks', 'number'],
                ['Academic Year', 'academic_year', 'text'],
              ].map(([label, field, type]) => (
                <div key={field}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </label>

                  <input
                    type={type}
                    value={form[field]}
                    onChange={f(field)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Class
                </label>

                <select
                  value={form.class_id}
                  onChange={f('class_id')}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select Class</option>

                  {[6, 7, 8, 9, 10].map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                padding: '18px 24px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#2563eb',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {saving ? 'Saving...' : 'Schedule Exam'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}