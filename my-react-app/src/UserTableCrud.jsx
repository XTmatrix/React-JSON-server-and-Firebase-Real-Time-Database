// Task 2 of 1cd

import { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", username: "" });

  const baseURL = "http://localhost:3001/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseURL);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(baseURL, { ...newUser });
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", username: "" });
    } catch (error) {
      setError(error.message);
      alert("Error adding user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
      alert("Error deleting user");
    }
  };

  // const handleUpdateEmail = async (id) => {
  //   const newEmail = prompt("Enter new email:");
  //   if (!newEmail || newEmail.trim() === "") {
  //     alert("Email cannot be empty.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.patch(`${baseURL}/${id}`, {
  //       email: newEmail,
  //     });
  //     setUsers(users.map((user) => (user.id === id ? response.data : user)));
  //   } catch (error) {
  //     setError(error.message);
  //     alert("Error updating user");
  //   }
  // };

  const handleUpdateEmail = async (id) => {
    const newEmail = prompt("Enter new email:");

    if (!newEmail || newEmail.trim() === "") {
      alert("Email cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(`${baseURL}/${id}`, {
        email: newEmail,
      });
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      alert("Email updated successfully!");
    } catch (err) {
      console.error("Error updating email:", err.message);
      alert(
        "Failed to update email. Check your server or internet connection."
      );
    }
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <table border="1" style={{ width: "80%", margin: "20px auto" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdateEmail(user.id)}>
                      Update Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "center" }}>
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
