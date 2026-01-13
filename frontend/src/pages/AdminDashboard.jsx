import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Space } from "antd";
import api from "../api";
const { Title } = Typography;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card style={{ width: 400, textAlign: "center" }}>
        <Title level={3}>Admin Dashboard</Title>

        <Space orientation="vertical" style={{ width: "100%" }}>
          <Button type="primary" block onClick={() => navigate("/admin/shipments/all")}>
            All Shipments
          </Button>

          <Button block onClick={() => navigate("/admin/shipments/PENDING")}>
            Pending Shipments
          </Button>

          <Button block onClick={() => navigate("/admin/shipments/APPROVED")}>
            Approved Shipments
          </Button>

          <Button danger block onClick={() => navigate("/admin/shipments/REJECTED")}>
            Rejected Shipments
          </Button>
          <Button danger onClick={handleLogout}>Logout</Button>
        </Space>
      </Card>
    </div>
  );
}
