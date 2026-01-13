import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminDocuments() {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <h3>Loading documents...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Documents for Shipment #{shipmentId}</h2>

      {documents.length === 0 && <p>No documents found.</p>}

      {documents.map((d) => (
        <div
          key={d.id}
          style={{
            border: "1px solid black",
            margin: "10px 0",
            padding: 10,
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`/admin/shipments/${shipmentId}/documents/${d.id}`)
          }
        >
          <p><b>ID:</b> {d.id}</p>
          <p><b>Type:</b> {d.docType || "N/A"}</p>
          <p><b>Status:</b> {d.verificationStatus || "PENDING"}</p>
          <p><b>Notes:</b> {d.notes || "No notes"}</p>
        </div>
      ))}

      <br />

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
