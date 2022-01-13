import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { signIn } from "../../reducers/Login";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import "antd/dist/antd.css";
import { Table, Tag, Space } from "antd";
import { TiDelete } from "react-icons/ti";
import "./style.css";


const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
   const { Column, ColumnGroup } = Table;



    const state = useSelector((state) => {
      return {
        token: state.Login.token,
        role: state.Login.role,
      };
    });


    /// 
    useEffect(() => {
       getAllUsers(); 
    }, [])

/// get all users
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };


/// remove user
    const removeUser = async (id) => {
      try {
        Swal.fire({
          title: " Are You Sure?",
          icon: "warning",
          iconColor: "#D11A2A",
          showCancelButton: true,
          confirmButtonText: "Delete!",
          confirmButtonColor: "#D11A2A",
          cancelButtonText: "No, cancel",
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.put(
              `${process.env.REACT_APP_BASE_URL}/remove/${id}`, {},
              {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              }
            );
          
            Swal.fire({
              title: "User Has Been Deleted!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#E07A5F",
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "Cancelled",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#E07A5F",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div>
      <Table dataSource={users}>
        <div>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="username" key="username" />
            <Column title="id" dataIndex="_id" key="id" />
            <Column title="is Deleted" dataIndex="isDel" key="isDel" />
          </ColumnGroup>

          <Column
            title="Remove"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <TiDelete  />
              </Space>
            )}
          />
        </div>
      </Table>
    </div>
  );
};

export default Dashboard;
