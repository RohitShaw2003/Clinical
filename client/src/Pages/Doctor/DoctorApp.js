import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Button, Table, message } from "antd";
import axios from "axios";

function DoctorApp() {
  const [appointment, setAppointment] = useState();
  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointment();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
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
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <Button
                className="m-2"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </Button>
              <Button
                className="m-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-center">Appointments</h1>
      <Table columns={columns} dataSource={appointment} />
    </Layout>
  );
}

export default DoctorApp;
