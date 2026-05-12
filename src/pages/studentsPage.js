import React, { useState, useEffect } from 'react';
// import { studentsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, Eye, X } from 'lucide-react';
import { studentsAPI } from '../utilities/api';

const emptyForm = {
  admission_no: '', first_name: '', last_name: '', date_of_birth: '',
  gender: '', address: '', phone: '', email: '', class_id: '',
  parent_name: '', parent_phone: '', parent_email: '', blood_group: ''
};

export default function StudentsPage() {
const [students, setStudents] = useState(mockStudents);
const [loading, setLoading] = useState(false);


  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

useEffect(() => {
  if (!search.trim()) {
    setStudents(mockStudents);
    return;
  }

  const filtered = mockStudents.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.admission_no}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  setStudents(filtered);
}, [search]);


  const openNew = () => { setForm(emptyForm); setEditingId(null); setShowModal(true); };
  const openEdit = (s) => {
    setForm({
      admission_no: s.admission_no, first_name: s.first_name, last_name: s.last_name,
      date_of_birth: s.date_of_birth || '', gender: s.gender || '',
      address: s.address || '', phone: s.phone || '', email: s.email || '',
      class_id: s.class_id || '', parent_name: s.parent_name || '',
      parent_phone: s.parent_phone || '', parent_email: s.parent_email || '',
      blood_group: s.blood_group || ''
    });
    setEditingId(s.id); setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.admission_no || !form.first_name || !form.last_name) {
      toast.error('Admission No, First Name, Last Name are required'); return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await studentsAPI.update(editingId, form);
        toast.success('Student updated');
      } else {
        await studentsAPI.create(form);
        toast.success('Student added');
      }
      setShowModal(false);
      loading();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error saving student');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this student?')) return;
    try {
      await studentsAPI.delete(id);
      toast.success('Student removed');
      loading();
    } catch { toast.error('Error removing student'); }
  };

return (
  <div
    style={{
      padding: window.innerWidth < 768 ? "16px" : "24px",
      background: "#f1f5f9",
      minHeight: "100vh",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: window.innerWidth < 768 ? "flex-start" : "center",
        flexDirection: window.innerWidth < 768 ? "column" : "row",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: window.innerWidth < 768 ? "26px" : "34px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          Students
        </h1>

        <p
          style={{
            marginTop: "6px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage all student records
        </p>
      </div>

      <button
        onClick={openNew}
        style={{
          border: "none",
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "14px",
          boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
        }}
      >
        <Plus size={18} />
        Add Student
      </button>
    </div>

    {/* Main Card */}
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: window.innerWidth < 768 ? "18px" : "24px",
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: window.innerWidth < 768 ? "flex-start" : "center",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "0 14px",
            width: window.innerWidth < 768 ? "100%" : "340px",
            height: "48px",
          }}
        >
          <Search size={18} color="#94a3b8" />

          <input
            placeholder="Search by name or admission no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              marginLeft: "10px",
              width: "100%",
              fontSize: "14px",
              color: "#0f172a",
            }}
          />
        </div>

        <div
          style={{
            background: "#eff6ff",
            color: "#1d4ed8",
            padding: "10px 16px",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          {students.length} Students
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          overflowX: "auto",
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
              }}
            >
              {[
                "Adm. No",
                "Name",
                "Class",
                "Gender",
                "Phone",
                "Parent",
                "Blood",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#94a3b8",
                    fontSize: "15px",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "50px 20px",
                    }}
                  >
                    <div style={{ fontSize: "48px" }}>🎓</div>

                    <p
                      style={{
                        color: "#64748b",
                        marginTop: "12px",
                        fontSize: "15px",
                      }}
                    >
                      No students found
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s.id}
                  style={{
                    borderTop: "1px solid #f1f5f9",
                    transition: "0.2s",
                  }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: "700",
                      color: "#1d4ed8",
                    }}
                  >
                    {s.admission_no}
                  </td>

                  <td style={{ padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg,#2563eb,#1d4ed8)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                        }}
                      >
                        {s.first_name?.[0]}
                      </div>

                      <div>
                        <div
                          style={{
                            fontWeight: "700",
                            color: "#0f172a",
                          }}
                        >
                          {s.first_name} {s.last_name}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color: "#94a3b8",
                            marginTop: "4px",
                          }}
                        >
                          {s.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "16px", color: "#475569" }}>
                    {s.class_id ? `Class ${s.class_id}` : "—"}
                  </td>

                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "700",
                        background:
                          s.gender === "Male"
                            ? "#dbeafe"
                            : "#dcfce7",
                        color:
                          s.gender === "Male"
                            ? "#1d4ed8"
                            : "#15803d",
                      }}
                    >
                      {s.gender || "—"}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "16px",
                      color: "#475569",
                    }}
                  >
                    {s.phone || "—"}
                  </td>

                  <td style={{ padding: "16px" }}>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {s.parent_name || "—"}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#94a3b8",
                        marginTop: "4px",
                      }}
                    >
                      {s.parent_phone}
                    </div>
                  </td>

                  <td style={{ padding: "16px" }}>
                    {s.blood_group ? (
                      <span
                        style={{
                          background: "#fee2e2",
                          color: "#dc2626",
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {s.blood_group}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td style={{ padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => openEdit(s)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          border: "none",
                          background: "#eff6ff",
                          color: "#2563eb",
                          cursor: "pointer",
                        }}
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(s.id)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          border: "none",
                          background: "#fee2e2",
                          color: "#dc2626",
                          cursor: "pointer",
                        }}
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

    {/* Modal */}
    {showModal && (
      <div
        onClick={(e) =>
          e.target === e.currentTarget && setShowModal(false)
        }
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.6)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "#fff",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                {editingId ? "Edit Student" : "Add New Student"}
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Fill student information below
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              style={{
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "#f1f5f9",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div
            style={{
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768
                    ? "1fr"
                    : "1fr 1fr",
                gap: "20px",
              }}
            >
              {[
                ["Admission No *", "admission_no"],
                ["First Name *", "first_name"],
                ["Last Name *", "last_name"],
                ["Phone", "phone"],
                ["Email", "email"],
                ["Parent Name", "parent_name"],
                ["Parent Phone", "parent_phone"],
                ["Parent Email", "parent_email"],
              ].map(([label, field]) => (
                <div key={field}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      color: "#334155",
                    }}
                  >
                    {label}
                  </label>

                  <input
                    value={form[field]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        [field]: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      height: "52px",
                      borderRadius: "14px",
                      border: "1px solid #dbe2ea",
                      padding: "0 16px",
                      outline: "none",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "14px",
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  height: "50px",
                  padding: "0 22px",
                  borderRadius: "14px",
                  border: "1px solid #dbe2ea",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  height: "50px",
                  padding: "0 24px",
                  borderRadius: "14px",
                  border: "none",
                  background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "700",
                  boxShadow:
                    "0 10px 25px rgba(37,99,235,0.25)",
                }}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Student"
                  : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

const mockStudents = [
  {
    id: 1,
    admission_no: 'ADM-001',
    first_name: 'Ravi',
    last_name: 'Kumar',
    gender: 'Male',
    phone: '9876543210',
    email: 'ravi@gmail.com',
    class_id: 8,
    parent_name: 'Suresh Kumar',
    parent_phone: '9876543200',
    blood_group: 'B+'
  },
  {
    id: 2,
    admission_no: 'ADM-002',
    first_name: 'Priya',
    last_name: 'Sharma',
    gender: 'Female',
    phone: '9876543211',
    email: 'priya@gmail.com',
    class_id: 9,
    parent_name: 'Rajesh Sharma',
    parent_phone: '9876543201',
    blood_group: 'A+'
  },
  {
    id: 3,
    admission_no: 'ADM-003',
    first_name: 'Arjun',
    last_name: 'Reddy',
    gender: 'Male',
    phone: '9876543212',
    email: 'arjun@gmail.com',
    class_id: 10,
    parent_name: 'Venkat Reddy',
    parent_phone: '9876543202',
    blood_group: 'O+'
  },
  {
    id: 4,
    admission_no: 'ADM-004',
    first_name: 'Sneha',
    last_name: 'Patel',
    gender: 'Female',
    phone: '9876543213',
    email: 'sneha@gmail.com',
    class_id: 7,
    parent_name: 'Mahesh Patel',
    parent_phone: '9876543203',
    blood_group: 'AB+'
  },
  {
    id: 5,
    admission_no: 'ADM-005',
    first_name: 'Karthik',
    last_name: 'Varma',
    gender: 'Male',
    phone: '9876543214',
    email: 'karthik@gmail.com',
    class_id: 6,
    parent_name: 'Ramesh Varma',
    parent_phone: '9876543204',
    blood_group: 'B-'
  },
  {
    id: 6,
    admission_no: 'ADM-006',
    first_name: 'Ananya',
    last_name: 'Iyer',
    gender: 'Female',
    phone: '9876543215',
    email: 'ananya@gmail.com',
    class_id: 8,
    parent_name: 'Sridhar Iyer',
    parent_phone: '9876543205',
    blood_group: 'O-'
  },
  {
    id: 7,
    admission_no: 'ADM-007',
    first_name: 'Rahul',
    last_name: 'Mehta',
    gender: 'Male',
    phone: '9876543216',
    email: 'rahul@gmail.com',
    class_id: 9,
    parent_name: 'Amit Mehta',
    parent_phone: '9876543206',
    blood_group: 'A-'
  },
  {
    id: 8,
    admission_no: 'ADM-008',
    first_name: 'Pooja',
    last_name: 'Nair',
    gender: 'Female',
    phone: '9876543217',
    email: 'pooja@gmail.com',
    class_id: 10,
    parent_name: 'Suresh Nair',
    parent_phone: '9876543207',
    blood_group: 'B+'
  },
  {
    id: 9,
    admission_no: 'ADM-009',
    first_name: 'Vikram',
    last_name: 'Singh',
    gender: 'Male',
    phone: '9876543218',
    email: 'vikram@gmail.com',
    class_id: 7,
    parent_name: 'Ajay Singh',
    parent_phone: '9876543208',
    blood_group: 'O+'
  },
  {
    id: 10,
    admission_no: 'ADM-010',
    first_name: 'Meera',
    last_name: 'Joshi',
    gender: 'Female',
    phone: '9876543219',
    email: 'meera@gmail.com',
    class_id: 6,
    parent_name: 'Rajesh Joshi',
    parent_phone: '9876543209',
    blood_group: 'A+'
  },
  {
    id: 11,
    admission_no: 'ADM-011',
    first_name: 'Aditya',
    last_name: 'Rao',
    gender: 'Male',
    phone: '9876543220',
    email: 'aditya@gmail.com',
    class_id: 8,
    parent_name: 'Mohan Rao',
    parent_phone: '9876543210',
    blood_group: 'AB-'
  },
  {
    id: 12,
    admission_no: 'ADM-012',
    first_name: 'Divya',
    last_name: 'Kapoor',
    gender: 'Female',
    phone: '9876543221',
    email: 'divya@gmail.com',
    class_id: 9,
    parent_name: 'Rohit Kapoor',
    parent_phone: '9876543211',
    blood_group: 'O+'
  },
  {
    id: 13,
    admission_no: 'ADM-013',
    first_name: 'Sai',
    last_name: 'Teja',
    gender: 'Male',
    phone: '9876543222',
    email: 'saiteja@gmail.com',
    class_id: 10,
    parent_name: 'Krishna Teja',
    parent_phone: '9876543212',
    blood_group: 'B+'
  },
  {
    id: 14,
    admission_no: 'ADM-014',
    first_name: 'Lavanya',
    last_name: 'Reddy',
    gender: 'Female',
    phone: '9876543223',
    email: 'lavanya@gmail.com',
    class_id: 7,
    parent_name: 'Nagesh Reddy',
    parent_phone: '9876543213',
    blood_group: 'A+'
  },
  {
    id: 15,
    admission_no: 'ADM-015',
    first_name: 'Harsha',
    last_name: 'Vardhan',
    gender: 'Male',
    phone: '9876543224',
    email: 'harsha@gmail.com',
    class_id: 6,
    parent_name: 'Srinivas Vardhan',
    parent_phone: '9876543214',
    blood_group: 'O-'
  },
  {
    id: 16,
    admission_no: 'ADM-016',
    first_name: 'Neha',
    last_name: 'Agarwal',
    gender: 'Female',
    phone: '9876543225',
    email: 'neha@gmail.com',
    class_id: 8,
    parent_name: 'Anil Agarwal',
    parent_phone: '9876543215',
    blood_group: 'AB+'
  },
  {
    id: 17,
    admission_no: 'ADM-017',
    first_name: 'Rohan',
    last_name: 'Das',
    gender: 'Male',
    phone: '9876543226',
    email: 'rohan@gmail.com',
    class_id: 9,
    parent_name: 'Subhash Das',
    parent_phone: '9876543216',
    blood_group: 'B-'
  },
  {
    id: 18,
    admission_no: 'ADM-018',
    first_name: 'Aishwarya',
    last_name: 'Menon',
    gender: 'Female',
    phone: '9876543227',
    email: 'aishwarya@gmail.com',
    class_id: 10,
    parent_name: 'Raj Menon',
    parent_phone: '9876543217',
    blood_group: 'A-'
  },
  {
    id: 19,
    admission_no: 'ADM-019',
    first_name: 'Nikhil',
    last_name: 'Chowdary',
    gender: 'Male',
    phone: '9876543228',
    email: 'nikhil@gmail.com',
    class_id: 7,
    parent_name: 'Prasad Chowdary',
    parent_phone: '9876543218',
    blood_group: 'O+'
  },
  {
    id: 20,
    admission_no: 'ADM-020',
    first_name: 'Sanjana',
    last_name: 'Mishra',
    gender: 'Female',
    phone: '9876543229',
    email: 'sanjana@gmail.com',
    class_id: 6,
    parent_name: 'Ravi Mishra',
    parent_phone: '9876543219',
    blood_group: 'B+'
  }
];