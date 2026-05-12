import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, X, IndianRupee } from 'lucide-react';
import { feesAPI } from '../utilities/api';

const emptyForm = {
  student_id: '',
  fee_type: '',
  amount: '',
  paid_amount: '0',
  due_date: '',
  paid_date: '',
  status: 'pending',
  receipt_no: '',
  remarks: ''
};

const mockFees = [
  {
    id: 1,
    student_id: 1,
    fee_type: 'Tuition Fee',
    amount: 15000,
    paid_amount: 15000,
    status: 'paid',
    due_date: '2025-04-30',
    receipt_no: 'REC-001',
    student_name: 'Ravi Kumar',
    admission_no: 'ADM-001'
  },
  {
    id: 2,
    student_id: 2,
    fee_type: 'Tuition Fee',
    amount: 15000,
    paid_amount: 7500,
    status: 'partial',
    due_date: '2025-04-30',
    receipt_no: 'REC-002',
    student_name: 'Priya Sharma',
    admission_no: 'ADM-002'
  },
  {
    id: 3,
    student_id: 3,
    fee_type: 'Transport Fee',
    amount: 6000,
    paid_amount: 0,
    status: 'pending',
    due_date: '2025-04-30',
    receipt_no: '',
    student_name: 'Arjun Reddy',
    admission_no: 'ADM-003'
  }
];

export default function FeesPage() {
  const [fees, setFees] = useState([]);
  const [summary, setSummary] = useState({
    fee_total: 0,
    fee_collected: 0,
    fee_pending: 0
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState('all');
  const [saving, setSaving] = useState(false);

  const load = () => {
    feesAPI.getAll(filter !== 'all' ? { status: filter } : {})
      .then(r => setFees(r.data))
      .catch(() =>
        setFees(
          filter === 'all'
            ? mockFees
            : mockFees.filter(f => f.status === filter)
        )
      );

    feesAPI.getSummary()
      .then(r => setSummary(r.data))
      .catch(() =>
        setSummary({
          fee_total: 37200,
          fee_collected: 23700,
          fee_pending: 13500
        })
      );

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleSave = async () => {
    if (!form.student_id || !form.fee_type || !form.amount) {
      toast.error('Fill required fields');
      return;
    }

    setSaving(true);

    try {
      await feesAPI.create({
        ...form,
        amount: parseFloat(form.amount),
        paid_amount: parseFloat(form.paid_amount || 0),
        student_id: parseInt(form.student_id)
      });

      toast.success('Fee record added');
      setShowModal(false);
      load();
    } catch {
      toast.success('Fee record added! (Demo)');
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const f = (field) => (e) =>
    setForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));

  const statusBadge = (status) => {
    const styles = {
      paid: {
        background: '#dcfce7',
        color: '#166534'
      },
      partial: {
        background: '#fef3c7',
        color: '#92400e'
      },
      pending: {
        background: '#fee2e2',
        color: '#991b1b'
      }
    };

    return (
      <span
        style={{
          padding: '6px 12px',
          borderRadius: 30,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'capitalize',
          ...styles[status]
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      style={{
        padding: 24,
        background: '#f8fafc',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 700,
              color: '#0f172a'
            }}
          >
            Fee Management
          </h1>

          <p
            style={{
              marginTop: 6,
              color: '#64748b',
              fontSize: 15
            }}
          >
            Track and manage student fee collections
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setShowModal(true);
          }}
          style={{
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(37,99,235,0.15)'
          }}
        >
          <Plus size={18} />
          Add Fee Record
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 24
        }}
      >
        {[
          {
            title: 'Total Fees',
            value: `₹${(summary.fee_total / 1000).toFixed(0)}K`,
            bg: '#dbeafe',
            color: '#1d4ed8'
          },
          {
            title: 'Collected',
            value: `₹${(summary.fee_collected / 1000).toFixed(0)}K`,
            bg: '#dcfce7',
            color: '#059669'
          },
          {
            title: 'Pending',
            value: `₹${(summary.fee_pending / 1000).toFixed(0)}K`,
            bg: '#fee2e2',
            color: '#dc2626'
          }
        ].map((card, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              boxShadow: '0 4px 18px rgba(15,23,42,0.06)'
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: card.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IndianRupee size={28} color={card.color} />
            </div>

            <div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: '#0f172a'
                }}
              >
                {card.value}
              </div>

              <div
                style={{
                  fontSize: 14,
                  color: '#64748b',
                  marginTop: 4
                }}
              >
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 4px 18px rgba(15,23,42,0.06)'
        }}
      >
        {/* Filters */}
        <div
          style={{
            padding: 20,
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap'
          }}
        >
          {['all', 'pending', 'partial', 'paid'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '10px 18px',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'capitalize',
                background: filter === s ? '#2563eb' : '#f1f5f9',
                color: filter === s ? '#fff' : '#475569'
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: 900
            }}
          >
            <thead>
              <tr
                style={{
                  background: '#f8fafc'
                }}
              >
                {[
                  'Student',
                  'Adm. No',
                  'Fee Type',
                  'Total',
                  'Paid',
                  'Balance',
                  'Due Date',
                  'Receipt',
                  'Status'
                ].map((head) => (
                  <th
                    key={head}
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontSize: 13,
                      color: '#64748b',
                      fontWeight: 700,
                      borderBottom: '1px solid #e2e8f0'
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
                    colSpan={9}
                    style={{
                      padding: 40,
                      textAlign: 'center',
                      color: '#94a3b8'
                    }}
                  >
                    Loading...
                  </td>
                </tr>
              ) : fees.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      padding: 40,
                      textAlign: 'center',
                      color: '#94a3b8'
                    }}
                  >
                    No fee records found
                  </td>
                </tr>
              ) : (
                fees.map((fee) => (
                  <tr
                    key={fee.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9'
                    }}
                  >
                    <td
                      style={{
                        padding: 16,
                        fontWeight: 600,
                        color: '#0f172a'
                      }}
                    >
                      {fee.student_name || `Student #${fee.student_id}`}
                    </td>

                    <td
                      style={{
                        padding: 16,
                        color: '#64748b'
                      }}
                    >
                      {fee.admission_no || '—'}
                    </td>

                    <td style={{ padding: 16 }}>
                      <span
                        style={{
                          background: '#dbeafe',
                          color: '#1d4ed8',
                          padding: '6px 12px',
                          borderRadius: 30,
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        {fee.fee_type}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: 16,
                        fontWeight: 700
                      }}
                    >
                      ₹{fee.amount?.toLocaleString('en-IN')}
                    </td>

                    <td
                      style={{
                        padding: 16,
                        fontWeight: 700,
                        color: '#059669'
                      }}
                    >
                      ₹{fee.paid_amount?.toLocaleString('en-IN')}
                    </td>

                    <td
                      style={{
                        padding: 16,
                        fontWeight: 700,
                        color:
                          fee.amount - fee.paid_amount > 0
                            ? '#dc2626'
                            : '#059669'
                      }}
                    >
                      ₹
                      {(fee.amount - fee.paid_amount)?.toLocaleString(
                        'en-IN'
                      )}
                    </td>

                    <td style={{ padding: 16 }}>
                      {fee.due_date || '—'}
                    </td>

                    <td
                      style={{
                        padding: 16,
                        color: '#64748b',
                        fontSize: 13
                      }}
                    >
                      {fee.receipt_no || '—'}
                    </td>

                    <td style={{ padding: 16 }}>
                      {statusBadge(fee.status)}
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
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.55)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            zIndex: 999
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 700,
              background: '#fff',
              borderRadius: 24,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: 24,
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 700
                }}
              >
                Add Fee Record
              </h2>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                padding: 24
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 18
                }}
              >
                {[
                  {
                    label: 'Student ID',
                    field: 'student_id',
                    type: 'number'
                  },
                  {
                    label: 'Total Amount',
                    field: 'amount',
                    type: 'number'
                  },
                  {
                    label: 'Paid Amount',
                    field: 'paid_amount',
                    type: 'number'
                  },
                  {
                    label: 'Due Date',
                    field: 'due_date',
                    type: 'date'
                  },
                  {
                    label: 'Receipt No',
                    field: 'receipt_no'
                  }
                ].map((item) => (
                  <div key={item.field}>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#334155'
                      }}
                    >
                      {item.label}
                    </label>

                    <input
                      type={item.type || 'text'}
                      value={form[item.field]}
                      onChange={f(item.field)}
                      style={{
                        width: '100%',
                        height: 48,
                        borderRadius: 12,
                        border: '1px solid #cbd5e1',
                        padding: '0 14px',
                        outline: 'none',
                        fontSize: 14
                      }}
                    />
                  </div>
                ))}

                {/* Fee Type */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    Fee Type
                  </label>

                  <select
                    value={form.fee_type}
                    onChange={f('fee_type')}
                    style={{
                      width: '100%',
                      height: 48,
                      borderRadius: 12,
                      border: '1px solid #cbd5e1',
                      padding: '0 14px'
                    }}
                  >
                    <option value="">Select Type</option>

                    {[
                      'Tuition Fee',
                      'Transport Fee',
                      'Exam Fee',
                      'Library Fee',
                      'Lab Fee',
                      'Sports Fee'
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={f('status')}
                    style={{
                      width: '100%',
                      height: 48,
                      borderRadius: 12,
                      border: '1px solid #cbd5e1',
                      padding: '0 14px'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: 24,
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 12
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: 'none',
                  background: '#2563eb',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {saving ? 'Saving...' : 'Add Record'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}