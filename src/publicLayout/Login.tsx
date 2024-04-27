// Login.js
import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { HttpService } from "../common/requestHandler";

interface IProps {
  onLogin: any;
}

const Login = ({ onLogin }: IProps) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const allValues = form.getFieldsValue();
    console.log('All fields values: ', allValues);
    console.log(`login screen`);
    HttpService.post(`/login`, values).then((response) => {
      console.log(response);
      if (response) {
        onLogin(response);
      } else {
        message.error(response);
      }
    });
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Login</h2>
      <Form name="login" form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
