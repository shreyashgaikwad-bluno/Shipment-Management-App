import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Input, Button, Space, Typography, Divider, List, Tag } from "antd";
import api from "../api";
const { Title, Text } = Typography;

export default function UserDocuments() {
  const { shipmentId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState({
    docType: "",
    fileUrl: "",
  });

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await api.get(`/user/shipments/${shipmentId}/documents`);
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch documents");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpload = async () => {
    if (!form.docType || !form.fileUrl) {
      alert("All fields required");
      return;
    }

    try {
      await api.post(`/user/shipments/${shipmentId}/documents`, form);
      alert("Document uploaded");
      setForm({ docType: "", fileUrl: "" });
      fetchDocs();
    } catch (err) {
      console.error(err);
      alert("Failed to upload document");
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await api.delete(`/user/shipments/${shipmentId}/documents/${docId}`);
      alert("Document deleted successfully");
      fetchDocs();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Delete failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Card style={{ width: 600 }}>
        <Title level={3}>Documents for Shipment {shipmentId}</Title>

        <Divider />

        <Title level={4}>Upload Document</Title>

        <Space orientation="vertical" style={{ width: "100%" }}>
          <Input
            name="docType"
            placeholder="Document Type (Invoice, Passport...)"
            value={form.docType}
            onChange={handleChange}
          />

          <Input
            name="fileUrl"
            placeholder="File URL"
            value={form.fileUrl}
            onChange={handleChange}
          />

          <Button type="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Space>

        <Divider />

        <Title level={4}>Uploaded Documents</Title>

        {documents.length === 0 && <Text>No documents found</Text>}

        <List
          dataSource={documents}
          renderItem={(d) => (
            <List.Item
              actions={[
                <Button
                  onClick={() =>
                    navigate(`/user/shipments/${shipmentId}/documents/${d.id}`)
                  }
                >
                  View
                </Button>,
                <Button danger onClick={() => handleDelete(d.id)}>
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`Document ID: ${d.id}`}
                description={
                  <>
                    <Text>Type: {d.doctype}</Text>
                    <br />
                    <Text>Status: </Text>
                    {/* <Tag color="blue">{d.status}</Tag> */}
                    <Tag color={ d.status==="VERIFIED" ? "green" : d.status==="REJECTED" ? "red" : "blue"}>{d.status} </Tag>
                    <br />
                    <Text>Notes: {d.notes || "No notes yet"}</Text>
                  </>
                }
              />
            </List.Item>
          )}
        />

        <Divider />
          
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button danger onClick={handleLogout}>Logout</Button>
      </Card>
    </div>
  );
}
