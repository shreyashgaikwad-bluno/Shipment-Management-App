import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Input, Button, Space, Typography } from "antd";
import api from "../api";
const { Title, Text } = Typography;

export default function EditShipment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    originCountry: "",
    destinationCountry: "",
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchShipment();
  }, []);

  const fetchShipment = async () => {
    try {
      const res = await api.get(`/user/shipments/${id}`);
      setForm(res.data);
    } catch (err) {
      alert("Failed to fetch shipment");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/user/shipments/${id}`, form);
      alert("Shipment updated");
      navigate(-1);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card style={{ width: 400 }}>
        <Title level={3}>Edit Shipment</Title>

        <Space orientation="vertical" style={{ width: "100%" }} size="middle">
          <div>
            <Text strong>Origin Country</Text>
            <Input
              name="originCountry"
              value={form.originCountry}
              onChange={handleChange}
              placeholder="Origin Country"
            />
          </div>

          <div>
            <Text strong>Destination Country</Text>
            <Input
              name="destinationCountry"
              value={form.destinationCountry}
              onChange={handleChange}
              placeholder="Destination Country"
            />
          </div>

          <Space>
            <Button type="primary" onClick={handleSubmit}>
              Update
            </Button>

            <Button onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button danger onClick={handleLogout}>Logout</Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
