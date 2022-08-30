import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, message, Popconfirm, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const ViewBlogs = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      render: (_, record) => 
      <div
      dangerouslySetInnerHTML={{
        __html: record.content
      }}></div>
      
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a className="dlt-btn"><DeleteOutlined /></a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const getCategories = useCallback(async () => {
    fetch("http://localhost:5001/admin/blogs/view", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.status, "status");
        if (result.status == "ok") {
          setDataSource(result.data);
          console.log(result.data);
        } else {
          message.error("Error fetching data.");
        }
      });
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleDelete = (id) => {
    fetch("http://localhost:5001/admin/blogs/delete", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Deleted Blogs Succesfully.");
          const newData = dataSource.filter((item) => item.id !== id);
          setDataSource(newData);
        } else {
          message.error("Error deleting the blogs");
        }
      });
  };

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Blogs</h2>
        <p className="section-lead">You have total {dataSource.length} Blogs</p>
      </div>
      <Card title="Blogs" className="main-attr-container">
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </div>
  );
};
export default ViewBlogs;
