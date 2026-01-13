import { useNavigate } from "react-router-dom";
import {Typography,Button,Space,Card} from "antd"
import "../css/Welcome.css"
import api from "../api";
const {Title} =Typography

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="class1">
      <Card className="card1" style={{ height:"30vh", width:"vw",border:"2px solid black",borderRadius:"4px"}}>
      <Space orientation="vertical">
      <Title level={1}>Welcome to Shipment Management App</Title>
      <div className="class2">
      <Button type="primary" size="large" onClick={() => navigate("/register")}>Register</Button>
      
      <Button type="primary" size="large" onClick={() => navigate("/login")}>Login</Button>
      </div>
      </Space>
      </Card>
    </div>
  );
}
