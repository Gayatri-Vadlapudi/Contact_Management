import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    API.get("/contacts").then(res => setContacts(res.data));
  }, []);

  const deleteContact = async (id) => {
    await API.delete(`/contacts/${id}`);
    setContacts(contacts.filter(c => c._id !== id));
  };

  const mergeContacts = async () => {
    const res = await API.post("/contacts/merge");
    alert("Duplicates found: " + JSON.stringify(res.data));
  };

  return (
    <div className="container mt-5">
      <h2>Contacts</h2>
      <Link to="/add" className="btn btn-success mb-3">Add Contact</Link>
      <button className="btn btn-warning mb-3 ms-2" onClick={mergeContacts}>Merge Duplicates</button>
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <Link to={`/contacts/${c._id}`} className="btn btn-info btn-sm">Edit</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteContact(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}