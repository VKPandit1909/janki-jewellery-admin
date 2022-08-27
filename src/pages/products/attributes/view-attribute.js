import { Card, Popconfirm, Table } from "antd";
import React, { useState } from "react";

const ViewAttributes = (props) => {
    const[dataSource, setDataSource] = useState(props.data);
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
          <div className="flex-evenly">
            <div>Edit</div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const handleDelete = (id) => {
    var data = dataSource == null ? props.data : dataSource;
    const newData = data.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Attribute</h2>
        <p className="section-lead">You have total {props.total} Attributes</p>
      </div>
      <Card title="Attributes" className="main-attr-container">
        <Table columns={columns} dataSource={dataSource == null ? props.data : dataSource} />
      </Card>
    </div>
  );
};
export default ViewAttributes;
