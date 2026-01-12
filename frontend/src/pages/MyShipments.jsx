import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function MyShipments() {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();

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
    if (!window.confirm("Are you sure you want to delete this shipment?")) return;

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
    <div>
      <h2>My Shipments</h2>

      {shipments.length === 0 && <p>No shipments found</p>}

      {shipments.map((s) => (
        <div
          key={s.id}
          style={{
            border: "1px solid black",
            margin: 10,
            padding: 10,
          }}
        >
          <p><b>ID:</b> {s.id}</p>
          <p><b>Origin:</b> {s.originCountry}</p>
          <p><b>Destination:</b> {s.destinationCountry}</p>
          <p><b>Status:</b> {s.status}</p>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => handleUpdate(s.id)}>Update</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
            <button onClick={() => handleDocuments(s.id)}>Documents</button>
          </div>
        </div>
      ))}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
