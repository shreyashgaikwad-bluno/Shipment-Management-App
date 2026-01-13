import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "antd/dist/reset.css";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import AdminShipments from "./pages/AdminShipments";
import AdminDocuments from "./pages/AdminDocuments";
import AdminReviewDoc from "./pages/AdminReviewDoc";

import UserDashboard from "./pages/UserDashboard";
import CreateShipment from "./pages/CreateShipment";
import MyShipments from "./pages/MyShipments";
import UserDocuments from "./pages/UserDocuments";
import UserDocument from "./pages/UserDocument";
import EditShipment from "./pages/EditShipment";

export default function App() {
  const { token, user } = useSelector((state) => state.auth);

  const isAuth = !!token;
  const isAdmin = user?.isAdmin;

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      
      <Route
        path="/admin/dashboard"
        element={
          isAuth && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/shipments/:status"
        element={
          isAuth && isAdmin ? <AdminShipments /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/shipments/:shipmentId/documents"
        element={
          isAuth && isAdmin ? <AdminDocuments /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/shipments/:shipmentId/documents/:docId"
        element={
          isAuth && isAdmin ? <AdminReviewDoc /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/user/dashboard"
        element={
          isAuth && !isAdmin ? <UserDashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/user/create-shipment"
        element={
          isAuth && !isAdmin ? <CreateShipment /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/user/shipments"
        element={
          isAuth && !isAdmin ? <MyShipments /> : <Navigate to="/login" />
        }
      />
      
      <Route
        path="/user/shipments/:id/edit"
        element={
          isAuth && !isAdmin ? <EditShipment /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/user/shipments/:shipmentId/documents"
        element={
          isAuth && !isAdmin ? <UserDocuments /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/user/shipments/:shipmentId/documents/:docId"
        element={
          isAuth && !isAdmin ? <UserDocument /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}
