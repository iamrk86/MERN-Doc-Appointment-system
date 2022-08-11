import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
const RegisterPage = () => {
  const submitHandler = (values) => {
    console.log("input values", values);
  };
  return (
    <>
      <div className="auth">
        <div className="authform card p-3">
          <h1 className="card-title">Nice To Meet You</h1>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <Button className="primaryBtn" htmlType="submit">
              REGISTER
            </Button>
            <Link to="/login" className="formLink ">
              Already Register ? Please click here to login !
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
