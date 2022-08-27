import { DeleteOutlined } from "@ant-design/icons";
import { Card, message, Popconfirm, Table } from "antd";
import React, { useState } from "react";

const ViewAttributes = (props) => {
  const [dataSource, setDataSource] = useState(props.data);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "attribute_title",
    },
    {
      title: "Type",
      dataIndex: "attribute_type",
    },
    {
      title: "Value",
      dataIndex: "attribute_value",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        props.data.length >= 1 ? (
          <div
        //    className="flex-evenly"
           >
            {/* <div>Edit</div> */}
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

  const handleDelete = (id) => {
    fetch("http://localhost:5001/admin/products/attributes/delete", {
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
          var datas = dataSource == null ? props.data : dataSource;
          const newData = datas.filter((item) => item.id !== id);
          setDataSource(newData);
        } else {
          message.error("Error deleting the attributes");
        }
      });
  };

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Attribute</h2>
        <p className="section-lead">You have total {dataSource == null ? props.total : dataSource.length} Attributes</p>
      </div>
      <Card title="Attributes" className="main-attr-container">
        <Table
          columns={columns}
          dataSource={dataSource == null ? props.data : dataSource}
        />
      </Card>
    </div>
  );
};
export default ViewAttributes;
