import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { teachersAPI } from '../utilities/api';

const emptyForm = {
  employee_id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  subject: '',
  qualification: '',
  date_of_joining: '',
  salary: '',
  gender: '',
  address: '',
};

const mockTeachers = [
  {
    id: 1,
    employee_id: 'EMP-001',
    first_name: 'Sunitha',
    last_name: 'Rao',
    email: 'sunitha@school.edu',
    phone: '9876543300',
    subject: 'Mathematics',
    qualification: 'M.Sc, B.Ed',
    date_of_joining: '2018-06-01',
    gender: 'Female',
    salary: '45000',
    address: 'Hyderabad',
  },
  {
    id: 2,
    employee_id: 'EMP-002',
    first_name: 'Ramesh',
    last_name: 'Babu',
    email: 'ramesh@school.edu',
    phone: '9876543301',
    subject: 'Science',
    qualification: 'M.Sc',
    date_of_joining: '2019-07-15',
    gender: 'Male',
    salary: '42000',
    address: 'Warangal',
  },
  {
    id: 3,
    employee_id: 'EMP-003',
    first_name: 'Kavitha',
    last_name: 'Devi',
    email: 'kavitha@school.edu',
    phone: '9876543302',
    subject: 'English',
    qualification: 'M.A, B.Ed',
    date_of_joining: '2020-06-01',
    gender: 'Female',
    salary: '40000',
    address: 'Karimnagar',
  },
  {
    id: 4,
    employee_id: 'EMP-004',
    first_name: 'Anil',
    last_name: 'Kumar',
    email: 'anil@school.edu',
    phone: '9876543303',
    subject: 'Physics',
    qualification: 'M.Sc Physics',
    date_of_joining: '2017-04-10',
    gender: 'Male',
    salary: '48000',
    address: 'Nizamabad',
  },
  {
    id: 5,
    employee_id: 'EMP-005',
    first_name: 'Deepa',
    last_name: 'Sharma',
    email: 'deepa@school.edu',
    phone: '9876543304',
    subject: 'Chemistry',
    qualification: 'M.Sc Chemistry',
    date_of_joining: '2021-01-12',
    gender: 'Female',
    salary: '41000',
    address: 'Vijayawada',
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

const load = () => {
  setLoading(true);

  // STATIC DATA FILTER
  const filtered = mockTeachers.filter((t) => {
    const q = search.toLowerCase();

    return (
      t.first_name.toLowerCase().includes(q) ||
      t.last_name.toLowerCase().includes(q) ||
      t.employee_id.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q)
    );
  });

  setTeachers(filtered);

  setLoading(false);
};

  useEffect(() => {
    load();
  }, [search]);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (t) => {
    setForm({
      ...t,
      salary: t.salary || '',
      date_of_joining: t.date_of_joining || '',
      address: t.address || '',
    });

    setEditingId(t.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (
      !form.employee_id ||
      !form.first_name ||
      !form.last_name
    ) {
      toast.error('Employee ID and Name are required');
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await teachersAPI.update(editingId, form);

        setTeachers((prev) =>
          prev.map((t) =>
            t.id === editingId ? { ...t, ...form } : t
          )
        );

        toast.success('Teacher updated');
      } else {
        const newTeacher = {
          id: Date.now(),
          ...form,
        };

        await teachersAPI.create(form).catch(() => {});

        setTeachers((prev) => [newTeacher, ...prev]);

        toast.success('Teacher added');
      }

      setShowModal(false);
    } catch (err) {
      toast.error(
        err.response?.data?.detail || 'Error saving'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this teacher?')) return;

    try {
      await teachersAPI.delete(id).catch(() => {});

      setTeachers((prev) =>
        prev.filter((t) => t.id !== id)
      );

      toast.success('Teacher removed');
    } catch {
      toast.error('Error');
    }
  };

  const f =
    (field) =>
    (e) =>
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

  return (
    <>
      <style>{`
        .teachers-page {
          padding: 24px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 14px;
        }

        .primary-btn {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
        }

        .card {
          background: white;
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 10px 35px rgba(15, 23, 42, 0.06);
          border: 1px solid #e2e8f0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          padding: 0 14px;
          min-width: 280px;
          height: 46px;
        }

        .search-box input {
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          font-size: 14px;
        }

        .teacher-count {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        thead {
          background: #f8fafc;
        }

        th {
          text-align: left;
          padding: 16px;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 700;
          border-bottom: 1px solid #e2e8f0;
        }

        td {
          padding: 18px 16px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
          color: #334155;
        }

        .teacher-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #065f46;
        }

        .teacher-name {
          font-weight: 700;
          color: #0f172a;
        }

        .teacher-email {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 3px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          background: #dbeafe;
          color: #1d4ed8;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: none;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .delete-btn {
          color: #ef4444;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background: white;
          width: 100%;
          max-width: 900px;
          border-radius: 24px;
          overflow: hidden;
        }

        .modal-header {
          padding: 22px 28px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
        }

        .modal-close {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: none;
          background: #f8fafc;
          cursor: pointer;
        }

        .modal-body {
          padding: 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .form-control {
          height: 48px;
          border-radius: 12px;
          border: 1px solid #dbeafe;
          background: #f8fafc;
          padding: 0 14px;
          font-size: 14px;
          outline: none;
        }

        textarea.form-control {
          height: auto;
          padding: 14px;
        }

        .modal-footer {
          padding: 20px 28px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .secondary-btn {
          height: 46px;
          padding: 0 18px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background: white;
          cursor: pointer;
        }

        .save-btn {
          height: 46px;
          padding: 0 20px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          cursor: pointer;
        }
      `}</style>

      <div className="teachers-page">
        <div className="page-header">
          <div>
            <div className="page-title">Teachers</div>

            <div className="page-subtitle">
              Manage teaching staff and faculty records
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={openNew}
          >
            <Plus size={18} />
            Add Teacher
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="search-box">
              <Search size={18} color="#94a3b8" />

              <input
                placeholder="Search teachers..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="teacher-count">
              Total Teachers: {teachers.length}
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Teacher</th>
                  <th>Subject</th>
                  <th>Qualification</th>
                  <th>Phone</th>
                  <th>Joining Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: 'center',
                        padding: 40,
                      }}
                    >
                      Loading...
                    </td>
                  </tr>
                ) : teachers.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  teachers.map((t) => (
                    <tr key={t.id}>
                      <td>{t.employee_id}</td>

                      <td>
                        <div className="teacher-info">
                          <div className="avatar">
                            {t.first_name?.[0]}
                          </div>

                          <div>
                            <div className="teacher-name">
                              {t.first_name}{' '}
                              {t.last_name}
                            </div>

                            <div className="teacher-email">
                              {t.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge">
                          {t.subject}
                        </span>
                      </td>

                      <td>{t.qualification}</td>

                      <td>{t.phone}</td>

                      <td>{t.date_of_joining}</td>

                      <td>
                        <div className="actions">
                          <button
                            className="icon-btn"
                            onClick={() => openEdit(t)}
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            onClick={() =>
                              handleDelete(t.id)
                            }
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div
            className="modal-overlay"
            onClick={(e) =>
              e.target === e.currentTarget &&
              setShowModal(false)
            }
          >
            <div className="modal">
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingId
                    ? 'Edit Teacher'
                    : 'Add Teacher'}
                </h2>

                <button
                  className="modal-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  {[
                    [
                      'Employee ID',
                      'employee_id',
                    ],
                    ['First Name', 'first_name'],
                    ['Last Name', 'last_name'],
                    ['Email', 'email'],
                    ['Phone', 'phone'],
                    ['Subject', 'subject'],
                    [
                      'Qualification',
                      'qualification',
                    ],
                    [
                      'Date of Joining',
                      'date_of_joining',
                    ],
                    ['Salary', 'salary'],
                  ].map(([label, field]) => (
                    <div
                      className="form-group"
                      key={field}
                    >
                      <label className="form-label">
                        {label}
                      </label>

                      <input
                        className="form-control"
                        type={
                          field ===
                          'date_of_joining'
                            ? 'date'
                            : 'text'
                        }
                        value={form[field]}
                        onChange={f(field)}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="form-group"
                  style={{ marginTop: 20 }}
                >
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    rows={3}
                    className="form-control"
                    value={form.address}
                    onChange={f('address')}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="secondary-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving
                    ? 'Saving...'
                    : editingId
                    ? 'Update Teacher'
                    : 'Add Teacher'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}