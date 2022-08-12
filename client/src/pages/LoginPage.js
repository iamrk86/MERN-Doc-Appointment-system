import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Form, Input, Button } from "antd";
import { hideLoading, showLoading } from "../redux/alertSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/users/login", values);
      if (res.data.success) {
        dispatch(hideLoading());
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        dispatch(hideLoading());
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Error While login");
    }
  };
  return (
    <>
      <div className="auth">
        <div className="authform card p-3">
          <h1 className="card-title">Welcome Back </h1>
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Button className="primaryBtn" htmlType="submit">
              LOGIN
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
