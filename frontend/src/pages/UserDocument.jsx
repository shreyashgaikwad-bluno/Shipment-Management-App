import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Space, Spin, Descriptions } from "antd";
import api from "../api";
const { Title, Text } = Typography;

export default function UserDocument() {
  const { shipmentId, docId } = useParams();
  const navigate = useNavigate();

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    fetchDoc();
  }, [shipmentId, docId]);

  const fetchDoc = async () => {
    try {
      const res = await api.get(
        `/user/shipments/${shipmentId}/documents/${docId}`
      );
      setDoc(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch document");
    } finally {
      setLoading(false);
    }
  };

  const deleteDoc = async () => {
    try {
      await api.delete(
        `/user/shipments/${shipmentId}/documents/${docId}`
      );
      alert("Document deleted");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Card style={{ width: 500 }}>
        <Title level={3}>Document Details</Title>

        {!doc && <Text>No document found</Text>}

        {doc && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{doc.id}</Descriptions.Item>
            <Descriptions.Item label="Type">{doc.doctype}</Descriptions.Item>
            <Descriptions.Item label="File URL">
              {doc.fileUrl}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{doc.status}</Descriptions.Item>
            <Descriptions.Item label="Notes">
              {doc.notes || "No notes yet"}
            </Descriptions.Item>
            <Descriptions.Item label="Uploaded At">
              {doc.uploadedAt}
            </Descriptions.Item>
          </Descriptions>
        )}

        <br />

        <Space>
          {doc?.status === "PENDING" && (
            <Button danger onClick={deleteDoc}>
              Delete
            </Button>
          )}
          
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button danger onClick={handleLogout}>Logout</Button>
        </Space>
      </Card>
    </div>
  );
}
