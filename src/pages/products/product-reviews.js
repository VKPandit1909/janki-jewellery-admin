import { Card, message, Rate, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const ProductReviews = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "product_name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (_, record) =>
          <Rate allowHalf disabled defaultValue={record.rating} />
    },
  ];

  const getProductReviews = useCallback(async () => {
    fetch("http://localhost:5001/admin/products/reviews", {
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
        console.log(result, "results");
        if (result.status == "ok") {
          setDataSource(result.data);
        } else {
          message.error("Error fetching the reviews");
        }
      });
  }, []);

  useEffect(() => {
    getProductReviews();
  }, []);

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Product Reviews</h2>
        <p className="section-lead">
          You have total {dataSource.length} Product Reviews
        </p>
      </div>
      <Card title="Product Reviews" className="main-attr-container">
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </div>
  );
};
export default ProductReviews;
