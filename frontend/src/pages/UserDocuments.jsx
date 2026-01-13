import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

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

  const handleUpload = async () => {
    if (!form.docType || !form.fileUrl) {
      alert("All fields required");
      return;
    }

    try {
      await api.post(`/user/shipments/${shipmentId}/documents`, {
        docType: form.docType,
        fileUrl: form.fileUrl,
      });

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
    <div>
      <h2>Documents for Shipment {shipmentId}</h2>

      <h3>Upload Document</h3>

      <input
        name="docType"
        placeholder="Document Type (Invoice, Passport...)"
        value={form.docType}
        onChange={handleChange}
      />

      <br />

      <input
        name="fileUrl"
        placeholder="File URL"
        value={form.fileUrl}
        onChange={handleChange}
      />

      <br />

      <button onClick={handleUpload}>Upload</button>

      <hr />

      <h3>Uploaded Documents</h3>

      {documents.length === 0 && <p>No documents found</p>}

      {documents.map((d) => (
        <div
          key={d.id}
          style={{
            border: "1px solid black",
            margin: 10,
            padding: 10,
          }}
        >
          <p><b>ID:</b> {d.id}</p>
          <p><b>Type:</b> {d.docType}</p>
          <p><b>Status:</b> {d.verificationStatus}</p>
          <p><b>Notes:</b> {d.notes || "No notes yet"}</p>

          <button
            onClick={() =>
              navigate(`/user/shipments/${shipmentId}/documents/${d.id}`)
            }
          >
            View
          </button>

          <button
            onClick={() => handleDelete(d.id)}
            style={{
              marginLeft: 10,
              backgroundColor: "red",
              color: "white",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <br />

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
