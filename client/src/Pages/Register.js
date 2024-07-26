import React from "react";
import { Form, Input, message } from "antd";
import "../Style/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/Features/AlertSlice";
import BrandImage from "../Components/Images/Brand Logo.jpg"; // Ensure this path is correct

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="brand-container">
          <img
            src={BrandImage}
            alt="Healing Hands Medical Center"
            className="brand-logo"
          />
          <h2 className="brand-name">Healing Hands Medical Center</h2>
        </div>
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Here</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            <button className="btn btn-primary">Login</button>
          </Link>
          <button className="btn btn-primary">Register</button>
        </Form>
      </div>
    </>
  );
}

export default Register;
