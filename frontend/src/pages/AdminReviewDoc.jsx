import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Input, Space, Button, Tag } from "antd";
import api from "../api";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function AdminReviewDoc() {
  const { shipmentId, docId } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const [doc, setDoc] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoc();
  }, []);

  const fetchDoc = async () => {
    try {
      const res = await api.get(
        `/admin/shipments/${shipmentId}/documents/${docId}`
      );
      setDoc(res.data);
      setNote(res.data.notes || "");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch document");
      setLoading(false);
    }
  };

  const handleAction = async (approved) => {
    try {
      await api.post(
        `/admin/shipments/${shipmentId}/documents/${docId}/status`,
        {
          approved: approved,
          notes: note,
        }
      );

      alert(approved ? "Document Verified" : "Document Rejected");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  if (loading) return <Title level={4}>Loading...</Title>;

  return (
    <div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 500 }}>
        <Title level={3}>Review Document</Title>

        {doc && (
          <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
            <Text><b>ID:</b> {doc.id}</Text>
            <Text><b>Type:</b> {doc.docType}</Text>
            <Text><b>File URL:</b> {doc.fileUrl}</Text>
            <Text>
              <b>Status:</b>{" "}
              <Tag
                color={
                  doc.verificationStatus === "PENDING"
                    ? "orange"
                    : doc.verificationStatus === "VERIFIED"
                    ? "green"
                    : "red"
                }
              >
                {doc.verificationStatus}
              </Tag>
            </Text>

            <TextArea
              placeholder="Enter notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />

            <Space>
              <Button type="primary" onClick={() => handleAction(true)}>
                Verify
              </Button>

              <Button danger onClick={() => handleAction(false)}>
                Reject
              </Button>
                
              <Button onClick={() => navigate(-1)}>Back</Button>
              <Button danger onClick={handleLogout}>Logout</Button>
            </Space>
          </Space>
        )}
      </Card>
    </div>
  );
}
