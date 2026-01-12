import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Register</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
