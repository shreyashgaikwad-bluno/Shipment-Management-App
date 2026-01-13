import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography, Space, Form } from "antd";
import api from "../api"; 

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      await api.post("/auth/register", values);

      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 350 }}>
        <Space orientation="vertical" style={{ width: "100%" }} size="middle">
          <Title level={3}>Register</Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>

            <Form.Item>
              <Button block onClick={() => navigate("/")}>
                Back
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
