const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
}

// =========================
// AUTHENTICATION
// =========================

export async function login(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// =========================
// EMPLOYEES
// =========================

export async function getEmployees() {
  return apiRequest("/employees");
}

// =========================
// ATTENDANCE
// =========================

export async function getAttendance() {
  return apiRequest("/attendance");
}

// =========================
// LEAVES
// =========================

export async function getLeaves() {
  return apiRequest("/leaves");
}

// =========================
// PAYROLL
// =========================

export async function getPayroll() {
  return apiRequest("/payroll");
}

// =========================
// REPORTS
// =========================

