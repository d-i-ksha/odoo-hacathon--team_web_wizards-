// Save logged-in user
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Get logged-in user
export function getUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

// Remove logged-in user
export function logout() {
  localStorage.removeItem("user");
}

// Check whether a user is logged in
export function isLoggedIn() {
  return getUser() !== null;
}

// Check whether logged-in user is admin
export function isAdmin() {
  const user = getUser();

  return user?.role === "admin";
}

// Check whether logged-in user is employee
export function isEmployee() {
  const user = getUser();

  return user?.role === "employee";
}