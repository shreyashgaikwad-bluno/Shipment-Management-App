import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Card, Input, Button, Typography, Space } from "antd";

const { Title } = Typography;

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;

      localStorage.setItem("token", token);

      const meRes = await api.get("/auth/me");
      const user = meRes.data;

      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 IMPORTANT: force reload so App.jsx re-reads localStorage
      if (user.isAdmin) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 350 }}>
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>Login</Title>

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input.Password
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <Button type="primary" block onClick={handleSubmit}>
            Login
          </Button>

          <Button block onClick={() => navigate("/")}>
            Back
          </Button>
        </Space>
      </Card>
    </div>
  );
}
