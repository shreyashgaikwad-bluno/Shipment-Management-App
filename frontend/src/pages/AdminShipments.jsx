import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Typography, Space, Tag } from "antd";
import api from "../api";

const { Title, Text } = Typography;

export default function AdminShipments() {
  const { status } = useParams(); 
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    fetchShipments();
  }, [status]);

  const fetchShipments = async () => {
    try {
      let url = "/admin/shipments";
      if (status !== "all") {
        url += `?status=${status}`;
      }

      const res = await api.get(url);
      setShipments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch shipments");
    }
  };

  const updateStatus = async (shipmentId, approved) => {
    try {
      await api.post(
        `/admin/shipments/${shipmentId}/status?approved=${approved}`
      );

      alert(approved ? "Shipment Approved" : "Shipment Rejected");

      fetchShipments();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <Title level={3}>
        {status === "all" ? "All Shipments" : `${status} Shipments`}
      </Title>

      <Space orientation="vertical" style={{ width: "100%" }} size="large">
        {shipments.map((s) => (
          <Card key={s.id}>
            <Text><b>ID:</b> {s.id}</Text><br />
            <Text><b>Origin:</b> {s.originCountry}</Text><br />
            <Text><b>Destination:</b> {s.destinationCountry}</Text><br />
            <Text>
              <b>Status:</b>{" "}
              <Tag
                color={
                  s.status === "PENDING"
                    ? "orange"
                    : s.status === "APPROVED"
                    ? "green"
                    : "red"
                }
              >
                {s.status}
              </Tag>
            </Text>

            <br /><br />

            <Space>
              <Button onClick={() => navigate(`/admin/shipments/${s.id}/documents`)}>
                View Documents
              </Button>

              <Button
                type="primary"
                onClick={() => updateStatus(s.id, true)}
              >
                Verify
              </Button>

              <Button
                danger
                onClick={() => updateStatus(s.id, false)}
              >
                Reject
              </Button>
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
