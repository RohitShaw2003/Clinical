import React from "react";
import Layout from "../Components/Layout";
import { Button, Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/Features/AlertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearNotifications } from "../Redux/Features/UserSlice";

function Notification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(clearNotifications());
        message.success(res.data.message);
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
    <Layout>
      <h4 className="text-center p-2">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread Messages" key="0">
          <div className="d-flex justify-content-end">
            <div className="p-2">
              <Button onClick={handleMarkAllRead} style={{ cursor: "pointer" }}>
                Mark all read
              </Button>
            </div>
          </div>
          {user?.notification.map((notificationMsg, index) => (
            <div
              key={index}
              className="card"
              onClick={() =>
                (window.location.href = notificationMsg.onClickPath)
              }
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read Messages" key="1">
          <div className="d-flex justify-content-end">
            <div className="p-2">
              <Button
                onClick={handleDeleteAllRead}
                style={{ cursor: "pointer" }}
              >
                Delete all read
              </Button>
            </div>
          </div>
          {user?.sennnotification.map((notificationMsg, index) => (
            <div
              key={index}
              className="card"
              onClick={() =>
                (window.location.href = notificationMsg.onClickPath)
              }
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notification;
