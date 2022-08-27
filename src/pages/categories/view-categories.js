import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, message, Popconfirm, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const ViewAttributes = () => {
  const [dataSource, setDataSource] = useState(null);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "category_title",
    },
    {
      title: "Priority Order",
      dataIndex: "category_priority",
    },
    {
      title: "Banner",
      dataIndex: "category_banner",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div
        //    className="flex-evenly"
           >
            {/* <div className="dlt-btn"><EditOutlined /></div> */}
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
    fetch("http://localhost:5001/admin/categories/view", {
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
    fetch("http://localhost:5001/admin/categories/delete", {
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
          message.success("Deleted Attribute Succesfully.");
          const newData = dataSource.filter((item) => item.id !== id);
          setDataSource(newData);
        } else {
          message.error("Error deleting the attributes");
        }
      });
  };

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Categories</h2>
        <p className="section-lead">You have total {dataSource == null ? 0 : dataSource.length} Categories</p>
      </div>
      <Card title="Attributes" className="main-attr-container">
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </div>
  );
};
export default ViewAttributes;
