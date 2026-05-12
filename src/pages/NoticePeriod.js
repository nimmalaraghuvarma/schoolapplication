import React, { useState } from "react";
import {
  Plus,
  Bell,
  CalendarDays,
  Trash2,
  Pin,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const initialNotice = {
  title: "",
  category: "General",
  date: "",
  description: "",
  important: false,
};

const mockNotices = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    category: "Academic",
    date: "2025-09-15",
    description:
      "Parent-Teacher meeting will be conducted for Classes 6 to 10 in the school auditorium.",
    important: true,
  },
  {
    id: 2,
    title: "Dasara Holidays",
    category: "Holiday",
    date: "2025-10-01",
    description:
      "School will remain closed from Oct 1st to Oct 10th for Dasara holidays.",
    important: false,
  },
  {
    id: 3,
    title: "Science Fair Registration",
    category: "Event",
    date: "2025-09-20",
    description:
      "Students interested in participating in the Science Fair can register before Sept 20.",
    important: true,
  },
];

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState(mockNotices);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialNotice);
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => {
    const value =
      field === "important" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!form.title || !form.description || !form.date) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const newNotice = {
        id: notices.length + 1,
        ...form,
      };

      setNotices((prev) => [newNotice, ...prev]);

      toast.success("Notice published");

      setForm(initialNotice);
      setShowModal(false);
      setSaving(false);
    }, 600);
  };

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notice removed");
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Notice Board
          </h1>

          <p
            style={{
              marginTop: "6px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Publish and manage school announcements
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            border: "none",
            background: "#2563eb",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          <Plus size={18} />
          Add Notice
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            label: "Total Notices",
            value: notices.length,
            bg: "#dbeafe",
            color: "#2563eb",
          },
          {
            label: "Important",
            value: notices.filter((n) => n.important).length,
            bg: "#fee2e2",
            color: "#dc2626",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "14px",
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={26} color={item.color} />
            </div>

            <div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NOTICE LIST */}
      <div
        style={{
          display: "grid",
          gap: "18px",
        }}
      >
        {notices.map((notice) => (
          <div
            key={notice.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "22px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              border: notice.important
                ? "1px solid #fecaca"
                : "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "10px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {notice.title}
                  </h2>

                  {notice.important && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "#fee2e2",
                        color: "#dc2626",
                        padding: "5px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      <Pin size={12} />
                      Important
                    </span>
                  )}

                  <span
                    style={{
                      background: "#dbeafe",
                      color: "#2563eb",
                      padding: "5px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {notice.category}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#64748b",
                    fontSize: "14px",
                    marginBottom: "14px",
                  }}
                >
                  <CalendarDays size={15} />
                  {notice.date}
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "#475569",
                    lineHeight: 1.7,
                    fontSize: "15px",
                  }}
                >
                  {notice.description}
                </p>
              </div>

              <button
                onClick={() => handleDelete(notice.id)}
                style={{
                  border: "none",
                  background: "#fef2f2",
                  color: "#dc2626",
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          onClick={(e) =>
            e.target === e.currentTarget && setShowModal(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
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
              maxWidth: "700px",
              background: "#fff",
              borderRadius: "22px",
              overflow: "hidden",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Add Notice
              </h2>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div
              style={{
                padding: "24px",
                display: "grid",
                gap: "18px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Notice Title *
                </label>

                <input
                  value={form.title}
                  onChange={handleChange("title")}
                  placeholder="Enter notice title"
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                  gap: "18px",
                }}
              >
                <div>
                  <label style={labelStyle}>Category</label>

                  <select
                    value={form.category}
                    onChange={handleChange("category")}
                    style={inputStyle}
                  >
                    <option>General</option>
                    <option>Academic</option>
                    <option>Holiday</option>
                    <option>Event</option>
                    <option>Examination</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Date *</label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={handleChange("date")}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Description *</label>

                <textarea
                  rows={5}
                  value={form.description}
                  onChange={handleChange("description")}
                  placeholder="Enter notice description..."
                  style={{
                    ...inputStyle,
                    resize: "none",
                    padding: "14px",
                    height: "130px",
                  }}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#334155",
                  fontWeight: 500,
                }}
              >
                <input
                  type="checkbox"
                  checked={form.important}
                  onChange={handleChange("important")}
                />
                Mark as Important Notice
              </label>
            </div>

            {/* FOOTER */}
            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#2563eb",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {saving ? "Publishing..." : "Publish Notice"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#475569",
};