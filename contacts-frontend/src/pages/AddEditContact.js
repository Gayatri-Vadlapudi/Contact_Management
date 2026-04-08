import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditContact() {
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.get(`/contacts/${id}`)
        .then(res => setContact(res.data))
        .catch(err => {
          console.error("Contact not found:", err);
          navigate("/contacts");
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await API.put(`/contacts/${id}`, contact);
      } else {
        await API.post("/contacts", contact);
      }
      navigate("/contacts");
    } catch (err) {
      console.error("Error saving contact:", err);
      // Optionally show error message
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Contact" : "Add Contact"}</h2>
      {["firstName","lastName","email","phone","address"].map(field => (
        <input key={field} className="form-control my-2" placeholder={field} value={contact[field]} onChange={(e) => setContact({...contact, [field]: e.target.value})} />
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
    </div>
  );
}