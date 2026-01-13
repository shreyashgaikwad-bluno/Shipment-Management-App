import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function UserDocument() {
  const { shipmentId, docId } = useParams();
  const navigate = useNavigate();

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoc();
  }, [shipmentId, docId]);

  const fetchDoc = async () => {
    try {
      const res = await api.get(
        `/user/shipments/${shipmentId}/documents/${docId}`
      );

      console.log("API DATA:", res.data);
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

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Document Details</h2>

      {!doc && <p>No document found</p>}

      {doc && (
        <>
          <p><b>ID:</b> {doc.id}</p>
          <p><b>Type:</b> {doc.doctype}</p>
          <p><b>File URL:</b> {doc.fileUrl}</p>
          <p><b>Status:</b> {doc.status}</p>
          <p><b>Notes:</b> {doc.notes || "No notes yet"}</p>
          <p><b>Uploaded At:</b> {doc.uploadedAt}</p>

          <br />

          
        </>
      )}

      <br /><br />

      {doc?.status === "PENDING" && (
        <button onClick={deleteDoc}>Delete</button>
      )}

      <button onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
        Back
      </button>
    </div>
  );
}
