import { Card, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const columns = [
  {
    title: "#",
    dataIndex: "serial_num",
  },
  {
    title: "Order Code",
    dataIndex: "order_code",
  },
  {
    title: "Customer",
    dataIndex: "customer",
  },
  {
    title: "Total Product",
    dataIndex: "total_product",
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
  },
  {
    title: "Delivery Status",
    dataIndex: "delivery_status",
  },
  {
    title: "Payment Status",
    dataIndex: "payment_status",
  },
];
const data = [
  {
    key: 1,
    serial_num: "1",
    order_code: "Vikcy",
    customer: 32,
    total_product: "Products",
    total_amount: "100",
    delivery_status: "Pending",
    payment_status: "Success",
  },
  {
    key: 2,
    serial_num: "2",
    order_code: "Vikram P",
    customer: 32,
    total_product: "1233 Products",
    total_amount: "100",
    delivery_status: "Pending",
    payment_status: "Success",
  },
  {
    key: 3,
    serial_num: "3",
    order_code: "John Brown",
    customer: 32,
    total_product: "100 Products",
    total_amount: "100",
    delivery_status: "Pending",
    payment_status: "Success",
  },
];

const Orders = () => {
  return (
    <section>
      <div className="site-card-wrapper">
        <Card
          title="Orders"
          className="card-container mb-24"
        >
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    </section>
  );
};

export default Orders;
