import axios from "axios";

// Base API
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attendance APIs
export const attendanceAPI = {
  bulkMark: async (data) => {
    const response = await api.post("/attendance/bulk", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/attendance");
    return response.data;
  },
};

// Student APIs
export const studentAPI = {
  getAll: async () => {
    const response = await api.get("/students");
    return response.data;
  },
};

// Teacher APIs
export const teacherAPI = {
  getAll: async () => {
    const response = await api.get("/teachers");
    return response.data;
  },
};
export const examsAPI = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [],
        });
      }, 500);
    });
  },

  create: async (data) => {
    console.log("Exam Created:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 1000);
    });
  },
};

export const studentsAPI = {
  // Get Students
  getAll: async (params = {}) => {
    console.log("Fetching students:", params);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
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
              blood_group: 'B+',
            },
          ],
        });
      }, 500);
    });
  },

  // Create Student
  create: async (data) => {
    console.log("Student Created:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 1000);
    });
  },

  // Update Student
  update: async (id, data) => {
    console.log("Student Updated:", id, data);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 1000);
    });
  },

  // Delete Student
  delete: async (id) => {
    console.log("Student Deleted:", id);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 1000);
    });
  },
};


// Demo APIs using localStorage

// ---------------- STUDENTS API ----------------


// ---------------- TEACHERS API ----------------
export const teachersAPI = {
  getAll: async () => {
    const data = JSON.parse(localStorage.getItem('teachers')) || [];
    return { data };
  },

  create: async (teacher) => {
    const data = JSON.parse(localStorage.getItem('teachers')) || [];

    const newTeacher = {
      ...teacher,
      id: Date.now(),
    };

    data.push(newTeacher);

    localStorage.setItem('teachers', JSON.stringify(data));

    return { data: newTeacher };
  },

  update: async (id, updatedTeacher) => {
    let data = JSON.parse(localStorage.getItem('teachers')) || [];

    data = data.map((t) =>
      t.id === id ? { ...t, ...updatedTeacher } : t
    );

    localStorage.setItem('teachers', JSON.stringify(data));

    return { data: updatedTeacher };
  },

  delete: async (id) => {
    let data = JSON.parse(localStorage.getItem('teachers')) || [];

    data = data.filter((t) => t.id !== id);

    localStorage.setItem('teachers', JSON.stringify(data));

    return { success: true };
  },
};

// ---------------- FEES API ----------------


// ---------------- EXAMS API ----------------


// ---------------- ATTENDANCE API ----------------

// ---------------- DASHBOARD API ----------------



export const dashboardAPI = {
  getStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            total_students: 487,
            total_teachers: 28,
            today_attendance: 92.4,
            today_present: 450,
            today_total: 487,
            fee_total: 2450000,
            fee_collected: 1870000,
            fee_pending: 580000,

            monthly_attendance: [
              { month: 'Dec 2024', percentage: 88 },
              { month: 'Jan 2025', percentage: 91 },
              { month: 'Feb 2025', percentage: 86 },
              { month: 'Mar 2025', percentage: 93 },
              { month: 'Apr 2025', percentage: 89 },
              { month: 'May 2025', percentage: 92 },
            ],

            upcoming_exams: [
              {
                id: 1,
                name: 'Unit Test 3',
                subject: 'Mathematics',
                date: '2025-06-05',
              },
            ],

            recent_notices: [
              {
                id: 1,
                title: 'Annual Sports Day',
                category: 'event',
                priority: 'high',
                date: '2025-05-20',
              },
            ],
          },
        });
      }, 1000);
    });
  },
};

export const feesAPI = {
  // Get all fees
  getAll: async (params = {}) => {
    const response = await api.get("/fees", {
      params,
    });

    return response.data;
  },

  // Fee summary
  getSummary: async () => {
    const response = await api.get("/fees/summary");

    return response.data;
  },

  // Create fee
  create: async (data) => {
    const response = await api.post("/fees", data);

    return response.data;
  },
};

export default api;