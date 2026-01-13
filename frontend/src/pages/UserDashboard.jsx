import { useNavigate } from "react-router-dom";
import { Card, Button, Space, Typography } from "antd";
import api from "../api";
const { Title } = Typography;

export default function UserDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
      <Card style={{ width: 300, textAlign: "center" }}>
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>User Dashboard</Title>

          <Button
            type="primary"
            block
            onClick={() => navigate("/user/create-shipment")}
          >
            Create Shipment
          </Button>

          <Button
            type="default"
            block
            onClick={() => navigate("/user/shipments")}
          >
            My Shipments
          </Button>
          
          <Button block onClick={() => navigate(-1)}>

            Back
          </Button>
          <Button danger onClick={handleLogout}>Logout</Button>
        </Space>
      </Card>
    </div>
  );
}
