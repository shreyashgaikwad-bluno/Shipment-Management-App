import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Space, Button, Tag } from "antd";
import api from "../api";

const { Title, Text } = Typography;

export default function AdminDocuments() {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await api.get(
        `/admin/shipments/${shipmentId}/documents`
      );
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Title level={4}>Loading documents...</Title>;

  return (
    <div style={{ padding: 30 }}>
      <Title level={3}>Documents for Shipment {shipmentId}</Title>

      {documents.length === 0 && <Text>No documents found.</Text>}

      <Space orientation="vertical" style={{ width: "100%" }} size="large">
        {documents.map((d) => (
          <Card
            key={d.id}
            hoverable
            onClick={() =>
              navigate(`/admin/shipments/${shipmentId}/documents/${d.id}`)
            }
          >
            <Text><b>ID:</b> {d.id}</Text><br />
            <Text><b>Type:</b> {d.docType || "N/A"}</Text><br />
            <Text>
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
            </Text>
            <br />
            <Text><b>Notes:</b> {d.notes || "No notes"}</Text>
          </Card>
        ))}
      </Space>

      <br />
        
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Button danger onClick={handleLogout}>Logout</Button>
    </div>
  );
}
