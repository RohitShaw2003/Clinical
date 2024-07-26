import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, DatePicker, TimePicker, message } from "antd";
import { showLoading, hideLoading } from "../Redux/Features/AlertSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function Booking() {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorById = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    if (!date || !time) {
      message.error("Please select both date and time");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorById();
  }, [params.doctorId]);

  return (
    <Layout>
      <h1 className="text-center">Book your Appointment</h1>
      <div className="container m-2">
        {doctor && (
          <div>
            <h3>
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <h3>Specialization: {doctor.specialization}</h3>
            <h3>Experience: {doctor.experience} years</h3>
            <div className="d-flex flex-column ">
              <DatePicker
                format="YYYY-MM-DD"
                className="m-2"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker.RangePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => setTime(moment(value).format("HH:mm"))}
              />
              <Button className="mt-2 " onClick={handleBooking}>
                Book your Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Booking;
