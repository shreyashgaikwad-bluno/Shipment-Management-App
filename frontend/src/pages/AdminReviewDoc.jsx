import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminReviewDoc() {
  const { shipmentId, docId } = useParams();
  const navigate = useNavigate();

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

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Review Document</h2>

      {doc && (
        <>
          <p><b>ID:</b> {doc.id}</p>
          <p><b>Type:</b> {doc.docType}</p>
          <p><b>Status:</b> {doc.verificationStatus}</p>

          <br />

          <textarea
            placeholder="Enter notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={5}
            cols={40}
          />

          <br /><br />

          <button onClick={() => handleAction(true)}>Verify</button>
          <button onClick={() => handleAction(false)}>Reject</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}
