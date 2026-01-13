import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateShipment() {
  const [form, setForm] = useState({
    originCountry: "",
    destinationCountry: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // important

    try {
      await api.post("/user/shipments", form);
      alert("Shipment created");
      navigate("/user/shipments");
    } catch (err) {
      console.error(err);
      alert("Failed to create shipment");
    }
  };

  return (
    <div>
      <h2>Create Shipment</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="originCountry"
          placeholder="Origin Country"
          value={form.originCountry}
          onChange={handleChange}
          required
        />

        <input
          name="destinationCountry"
          placeholder="Destination Country"
          value={form.destinationCountry}
          onChange={handleChange}
          required
        />

        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
      </form>
    </div>
  );
}
