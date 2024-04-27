import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

const Register = () => {
  const onFinish = (values: any) => {
    console.log("Register form values:", values);
    // Add logic for handling registration (e.g., API call)
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Register</h2>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
