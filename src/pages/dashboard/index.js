import {
  AppstoreOutlined,
  RiseOutlined,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Col, message, Row, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallCard from "../../components/card/small_card";
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

const Dashboard = () => {
  const [data, setData] = useState(null);
  const getDashboardData = useCallback(async () => {
    fetch("http://localhost:5001/admin/dashboard", {
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
          setData(result.data);
        } else {
          message.error("Error fetching the details");
        }
      });
  }, []);
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <section>
      <div className="site-card-wrapper">
        <Row gutter={24}>
          <Col span={6} md={6} sm={12} xs={24}>
            <SmallCard label="Orders" value="20" icon={<RiseOutlined />} />
          </Col>

          <Col span={6} md={6} sm={12} xs={24}>
            <SmallCard label="Sale" value="$10.00" icon="$" />
          </Col>
          <Col span={6} md={6} sm={12} xs={24}>
            <SmallCard
              label="Product"
              value={
                data == null
                  ? 0
                  : data.find((item) => item.table_name == "products")
                      .table_rows
              }
              icon="P"
            />
          </Col>
          <Col span={6} md={6} sm={12} xs={24}>
            <SmallCard label="Customer" value="24" icon={<TeamOutlined />} />
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={24}>
          <Col span={12} md={12} sm={24} xs={24} className="mb-24">
            <Card title="Order Statistics" className="card-container">
              <Row gutter={24}>
                <Col span={8}>
                  <div className="card-stats-item">
                    <div className="card-stats-item-count">0</div>
                    <div className="card-stats-amount-count">$0.00</div>
                    <div className="card-stats-item-label">Pending</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="card-stats-item">
                    <div className="card-stats-item-count">0</div>
                    <div className="card-stats-amount-count">$0.00</div>
                    <div className="card-stats-item-label">Processing</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="card-stats-item">
                    <div className="card-stats-item-count">0</div>
                    <div className="card-stats-amount-count">$0.00</div>
                    <div className="card-stats-item-label">Delivered</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6} md={6} sm={12} xs={24}>
            <SmallCard label="Brands" value="2" icon={<StarOutlined />} />
          </Col>
          <Col span={6} md={6} sm={12} xs={24}>
            <SmallCard
              label="Total Categories"
              value={
                data == null
                  ? 0
                  : data.find((item) => item.table_name == "categories")
                      .table_rows
              }
              icon={<AppstoreOutlined />}
            />
          </Col>
          {/* <Col span={12} md={12} sm={24} xs={24}>
            <Row gutter={24}>
                <Col span={12}><SmallCard label="Brands" value="24" icon={<TeamOutlined />} /></Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}><SmallCard label="Total Categories" value="24" icon={<TeamOutlined />} /></Col>
            </Row>
          </Col> */}
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={24}>
          <Col span={8} md={8} sm={24} xs={24} className="mb-24">
            <Card title="Top Categories" className="card-container"></Card>
          </Col>
          <Col span={8} md={8} sm={24} xs={24} className="mb-24">
            <Card title="Top Brands" className="card-container"></Card>
          </Col>
          <Col span={8} md={8} sm={24} xs={24} className="mb-24">
            <Card title="Top Products" className="card-container"></Card>
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Card
          title="Orders"
          extra={
            <Link to="/" className="view-more-btn">
              View More
            </Link>
          }
          className="card-container mb-24"
        >
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
