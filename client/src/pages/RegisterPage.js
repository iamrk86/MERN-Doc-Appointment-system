import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/users/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        dispatch(hideLoading());
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Error While Register");
    }
  };
  return (
    <>
      <div className="auth">
        <div className="authform card p-3">
          <h1 className="card-title">Nice To Meet You</h1>
          <Form layout="vertical" onFinish={onFinish}>
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
