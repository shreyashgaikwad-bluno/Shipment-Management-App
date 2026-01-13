import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Space, Typography, Popconfirm, Empty,Tag } from "antd";
import api from "../api";
const { Title, Text } = Typography;

export default function MyShipments() {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const res = await api.get("/user/shipments");
      setShipments(res.data);
    } catch (err) {
      alert("Failed to fetch shipments");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/shipments/${id}`);
      alert("Shipment deleted");
      fetchShipments();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/user/shipments/${id}/edit`);
  };

  const handleDocuments = (id) => {
    navigate(`/user/shipments/${id}/documents`);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>My Shipments</Title>

      {shipments.length === 0 && <Empty description="No shipments found" />}

      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        {shipments.map((s) => (
          <Card key={s.id} style={{ width: "100%" }}>
            <Space orientation="vertical">
              <Text><b>ID:</b> {s.id}</Text>
              <Text><b>Origin:</b> {s.originCountry}</Text>
              <Text><b>Destination:</b> {s.destinationCountry}</Text>
              <Text><b>Status:</b> <Tag
              color={
                s.status==="PENDING" ? "orange" 
                :s.status==="APPROVED" ? "green" 
                :"red"
              }>
                {s.status}
              </Tag>
              </Text>
              {/* <Text>
              <b>Status:</b>{" "}
              <Tag
                color={
                  d.verificationStatus === "PENDING"
                    ? "orange"
                    : d.verificationStatus === "VERIFIED"
                    ? "green"
                    : "red"
                }
              >
                {d.verificationStatus || "PENDING"}
              </Tag>
            </Text> */}
              <Space>
                <Button type="primary" onClick={() => handleUpdate(s.id)}>
                  Update
                </Button>

                <Popconfirm
                  title="Are you sure you want to delete this shipment?"
                  onConfirm={() => handleDelete(s.id)}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>

                <Button onClick={() => handleDocuments(s.id)}>
                  Documents
                </Button>
              </Space>
            </Space>
          </Card>
        ))}
      </Space>

      <br />
       
      <Button onClick={() => navigate(-1)}>Back</Button>
       <Button danger onClick={handleLogout}>Logout</Button>
    </div>
  );
}
