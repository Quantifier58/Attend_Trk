import React, { useState } from "react";

const PersonForm = () => {
  const defaultFormData = {
    person_id: "",
    name: "",
    email: ""
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/People", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) {
      throw new Error("Failed to create person");
    }
  };

  const styles = `
    .container {
      min-height: calc(100vh - 72px); /* Adjust according to your layout */
      padding: 6rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f3f4f6;
    }

    .title {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .form {
      max-width: 400px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 1rem;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .label {
      font-size: 1.25rem;
      color: #374151;
    }

    .input {
      padding: 1rem;
      width: 100%;
      font-size: 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      transition: border-color 0.2s ease-in-out;
    }

    .input:focus {
      outline: none;
      border-color: #2563eb;
    }

    .button {
      padding: 1rem;
      font-size: 1rem;
      background-color: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .button:hover {
      background-color: #1e4bb7;
    }
  `;

  return (
    <div className="container">
      <style>{styles}</style>
      <div className="form">
        <h1 className="title">Enter Person Details</h1>
        <form className="form" method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="person_id">Person ID</label>
            <input
              className="input"
              id="person_id"
              name="person_id"
              type="text"
              value={formData.person_id}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="name">Name</label>
            <input
              className="input"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button className="button" type="submit">Create Person</button>
        </form>
      </div>
    </div>
  );
};

export default PersonForm;
