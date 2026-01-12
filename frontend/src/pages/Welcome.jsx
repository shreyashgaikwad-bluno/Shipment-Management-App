import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Shipment Management App</h1>

      <button onClick={() => navigate("/register")}>Register</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}
