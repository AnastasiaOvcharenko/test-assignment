import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useAuth } from "../context/FakeAuthContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values.username, values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Ошибка:", errorInfo);
  };

  useEffect(
    function () {
      if (isAuthenticated) navigate("/", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            username: "test@example.com",
            password: "qwerty",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Введите логин",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Введите пароль",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Auth;
