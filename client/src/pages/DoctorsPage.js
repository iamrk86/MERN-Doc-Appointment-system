import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Input, TimePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
export const DoctorsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const onFinishHandle = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/users/applyDoctorAccount",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="page-title mt-1">Apply As Doctor</h1>
      <hr />
      <Form layout="vertical " onFinish={onFinishHandle}>
        <h1 className="card-title mt-4">Personal Information</h1>
        <Row gutter={20}>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="First Name" name="firstName">
              <Input placeholder="First Name" required />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Last Name" required />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input placeholder="Phone Number" required />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Website" name="website">
              <Input placeholder="your website " />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Address" name="address">
              <Input placeholder="Address" required />
            </Form.Item>
          </Col>
        </Row>
        <h1 className="card-title mt-4">Professional Information</h1>
        <hr />
        <Row gutter={20}>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Specialization" name="specialization">
              <Input placeholder="specialization" required />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Experience" name="experience">
              <Input placeholder="experience" required />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Fee Per Consultation" name="feePerConsultation">
              <Input
                placeholder="fee Per Consultation"
                required
                type="number"
              />
            </Form.Item>
          </Col>
          <Col lg={8} spam={8} xs={24} sm={24}>
            <Form.Item label="Timings" name="timings">
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button htmlType="submit" className="primaryBtn">
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};
