import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminShipments() {
  const { status } = useParams(); // all | PENDING | APPROVED | REJECTED
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);

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

      // Refresh list but DO NOT remove buttons
      fetchShipments();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <h2>
        {status === "all" ? "All Shipments" : `${status} Shipments`}
      </h2>

      {shipments.map((s) => (
        <div
          key={s.id}
          style={{
            border: "1px solid black",
            padding: 10,
            margin: 10,
          }}
        >
          <p><b>ID:</b> {s.id}</p>
          <p><b>Origin:</b> {s.originCountry}</p>
          <p><b>Destination:</b> {s.destinationCountry}</p>
          <p><b>Status:</b> {s.status}</p>

          <button
            onClick={() =>
              navigate(`/admin/shipments/${s.id}/documents`)
            }
          >
            View Documents
          </button>

          {/* ALWAYS show buttons */}
          <button
            onClick={() => updateStatus(s.id, true)}
            style={{ marginLeft: 10 }}
          >
            Verify
          </button>

          <button
            onClick={() => updateStatus(s.id, false)}
            style={{ marginLeft: 10 }}
          >
            Reject
          </button>
        </div>
      ))}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
