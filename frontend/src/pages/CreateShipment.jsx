import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Space, Typography } from "antd";
import api from "../api";
const { Title } = Typography;

export default function CreateShipment() {
  const [form, setForm] = useState({
    originCountry: "",
    destinationCountry: "",
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      await api.post("/user/shipments", form);
      alert("Shipment created");
      navigate("/user/shipments");
    } catch (err) {
      console.error(err);
      alert("Failed to create shipment");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Card style={{ width: 400 }}>
        <Title level={3}>Create Shipment</Title>

        <form onSubmit={handleSubmit}>
          <Space orientation="vertical" style={{ width: "100%" }}>
            <Input
              name="originCountry"
              placeholder="Origin Country"
              value={form.originCountry}
              onChange={handleChange}
              required
            />

            <Input
              name="destinationCountry"
              placeholder="Destination Country"
              value={form.destinationCountry}
              onChange={handleChange}
              required
            />

            <Button type="primary" htmlType="submit">
              Create
            </Button>

            <Button onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button danger onClick={handleLogout}>Logout</Button>
          </Space>
        </form>
      </Card>
    </div>
  );
}
