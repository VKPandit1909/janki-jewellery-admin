import React from "react";
import {
  Layout,
  Row,
  Col,
  Dropdown,
  Button,
  Menu,
  message,
  Avatar,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CaretDownOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import createMenuItem from "../menu/createMenu";
import "./index.css";
import { Link } from "react-router-dom";

const { Header } = Layout;

const handleMenuClick = (e) => {
  console.log("click", e);
  if (e.key == "2") {
    message.info("Signing out...");
    logOut();
  }
};
const logOut = () => {
  window.localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("token");
  window.location.href = "/";
};
const menuItems = [
  createMenuItem(
    <Link to={"/change-password"}>Change Password</Link>,
    "1",
    <EditOutlined />
  ),
  createMenuItem("Log Out", "2", <LogoutOutlined />),
];
const menu = (
  <Menu
    onClick={(e) => {
      handleMenuClick(e);
    }}
    items={menuItems}
  />
);
const CustomisedHeader = (props) => {
  return (
    <Header className="site-layout-background header-container sticky-header">
      <Row>
        <Col xs={12} lg={16}>
          {props.collapsed ? (
            <MenuUnfoldOutlined
              id="mob_trigger"
              className="trigger_icon"
              onClick={() => props.setCollapsed(!props.collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              className="trigger_icon"
              onClick={() => props.setCollapsed(!props.collapsed)}
            />
          )}
        </Col>
        <Col xs={12} lg={8} align="right">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className="profile-container trigger_icon"
          >
            <div>
              <Avatar icon={<UserOutlined />} className="user-profile-img" />
              <label className="user-profile-name">Karan</label>{" "}
              <CaretDownOutlined size={12} />
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomisedHeader;
