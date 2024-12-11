import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function FirebaseCrud() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const usersCollection = collection(db, "users");

  const fetchUsers = async () => {
    const data = await getDocs(usersCollection);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addUser = async () => {
    await addDoc(usersCollection, { name, age: parseInt(age) });
    setName("");
    setAge("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  const updateUser = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateDoc(doc(db, "users", id), { name: newName });
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  });

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>CRUD Operations</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      <table border="1" style={{ width: "80%", margin: "20px auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => updateUser(user.id)}>Update</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FirebaseCrud;
