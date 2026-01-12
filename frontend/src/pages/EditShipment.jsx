import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditShipment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    originCity: "",
    destinationCountry: "",
  });

  useEffect(() => {
    fetchShipment();
  }, []);

  const fetchShipment = async () => {
    try {
      const res = await api.get(`/user/shipments/${id}`);
      setForm(res.data);
    } catch (err) {
      alert("Failed to fetch shipment");
    }

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/user/shipments/${id}`, form);
      alert("Shipment updated");
      navigate(-1);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Edit Shipment</h2>
        <b>Origin Country : </b>
      <input
        name="originCountry"
        value={form.originCountry}
        onChange={handleChange}
        placeholder="Origin Country"
      />
      <br />
      <br />
    <b>Destination Country : </b>
      <input
        name="destinationCountry"
        value={form.destinationCountry}
        onChange={handleChange}
        placeholder="Destination Country"
      />

      <br />
        <br />
      <button onClick={handleSubmit}>Update</button>
      
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
