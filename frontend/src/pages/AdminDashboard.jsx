import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  // Fetch users (backend API connect later)
  useEffect(() => {
    fetch("/api/admin/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>👑 Admin Panel</h2>
        <ul>
          <li>📊 Dashboard</li>
          <li>👤 Users</li>
          <li>🏋️ Workouts</li>
          <li>🥗 Diet Plans</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        <h1>Welcome Admin 🚀</h1>

        <div className="cards">
          <div className="card">Total Users: {users.length}</div>
          <div className="card">Active Plans: 0</div>
          <div className="card">AI Requests: 0</div>
        </div>

        {/* USERS TABLE */}
        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;