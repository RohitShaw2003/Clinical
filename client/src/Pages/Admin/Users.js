import React, { useEffect, useState } from "react";
import Layout from "./../../Components/Layout";
import axios from "axios";
import { Button, Table } from "antd";
function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        // Fixed route typo
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="">
          <Button className="">Block</Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Layout>
        <h1 className="text-center m-2">All Users</h1>
        <Table columns={columns} dataSource={users} />
      </Layout>
    </>
  );
}

export default Users;
