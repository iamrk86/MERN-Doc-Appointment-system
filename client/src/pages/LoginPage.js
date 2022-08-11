import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
const LoginPage = () => {
  const submitHandler = (values) => {
    console.log("input values", values);
  };
  return (
    <>
      <div className="auth">
        <div className="authform card p-3">
          <h1 className="card-title">Welcome Back </h1>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <Button className="primaryBtn" htmlType="submit">
              REGISTER
            </Button>
            <Link to="/register" className="formLink ">
              Not Register ? Please click here to register !
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
