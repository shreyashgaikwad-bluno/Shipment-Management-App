import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>User Dashboard</h2>

      <button onClick={() => navigate("/user/create-shipment")}>
        Create Shipment
      </button>

      <button onClick={() => navigate("/user/shipments")}>
        My Shipments
      </button>
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
    
    
  );
}
