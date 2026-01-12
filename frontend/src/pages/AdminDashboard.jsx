import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/admin/shipments/all")}>
        All Shipments
      </button>

      <button onClick={() => navigate("/admin/shipments/PENDING")}>
        Pending Shipments
      </button>

      <button onClick={() => navigate("/admin/shipments/APPROVED")}>
        Approved Shipments
      </button>

      <button onClick={() => navigate("/admin/shipments/REJECTED")}>
        Rejected Shipments
      </button>
    </div>
  );
}
