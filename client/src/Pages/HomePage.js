import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import { Row } from "antd";
import DoctorList from "../Components/DoctorList";

function HomePage() {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors data
  const getAllDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token correctly
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Doctor List</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
}

export default HomePage;
