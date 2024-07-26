import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { Table } from "antd";

function Appointment() {
  const [appointment, setAppointment] = useState();
  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointment(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Appointments</h1>
      <Table columns={columns} dataSource={appointment} />
    </Layout>
  );
}

export default Appointment;
