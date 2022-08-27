import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../../logo.svg";
import {
    BookOutlined,
  WalletOutlined,
  DashboardOutlined,
  FileImageOutlined,
  TeamOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import createMenuItem from "../menu/createMenu";
import "./index.css";

const { Sider } = Layout;

const items = [
    createMenuItem(<Link to={"/"}>Dashboard</Link>, "/", <DashboardOutlined />),
  createMenuItem("Orders", "orders", <RiseOutlined />, [
    createMenuItem(<Link to={"/orders"}>All Orders</Link>, "/orders"),
    createMenuItem("Option 2", "2"),
  ]),
  createMenuItem("Products", "products", <ShoppingCartOutlined />, [
    createMenuItem(<Link to={"/add-product"}>Add Product</Link>, "/add-product"),
    createMenuItem(<Link to={"/products"}>All Products</Link>, "/products"),
    createMenuItem(<Link to={"/attributes"}>Attributes</Link>, "/attributes"),
    createMenuItem("Submenu", "sub3", null, [
      createMenuItem("Option 7", "5"),
      createMenuItem("Option 8", "6"),
    ]),
  ]),
  createMenuItem("Categories", "categories", <PartitionOutlined />, [
    createMenuItem(<Link to={"/add-category"}>Add Category</Link>, "/add-category"),
    createMenuItem(<Link to={"/view-categories"}>View Categories</Link>, "/view-categories"),
  ]),
  createMenuItem("Customers", "customers", <TeamOutlined />, [
    createMenuItem("Option 9", "7"),
  ]),
  createMenuItem("Refunds", "refunds", <WalletOutlined />, [
    createMenuItem("Option 9", "8"),
  ]),
  createMenuItem("Images", "images", <FileImageOutlined />, [
    createMenuItem("Option 9", "9"),
  ]),
  createMenuItem("Reports", "reports", <FileTextOutlined />, [
    createMenuItem("Option 9", "10"),
  ]),
  createMenuItem("Blogs", "blogs", <BookOutlined />, [
    createMenuItem("Option 9", "11"),
  ]),
  createMenuItem("Marketing", "marketing", <BarChartOutlined />, [
    createMenuItem("Option 9", "12"),
  ]),
  createMenuItem("Support", "support", <CustomerServiceOutlined />, [
    createMenuItem("Option 9", "13"),
  ]),
  createMenuItem("System Settings", "system", <SettingOutlined />, [
    createMenuItem("Option 9", "14"),
  ]),
  createMenuItem("Staff", "staff", <TeamOutlined />, [
    createMenuItem("Option 9", "15"),
  ]),
  createMenuItem("Web Settings", "web", <SettingOutlined />, [
    createMenuItem("Option 9", "16"),
  ]),
];
const rootSubmenuKeys = ["dashboard", "orders", "products", "categories", "customers", "refunds", "images", "reports", "blogs", "marketing", "support", "system", "staff", "web" ];

const SideBar = (props) => {
  const [openKeys, setOpenKeys] = useState([""]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  let location = useLocation();
    const [current, setCurrent] = useState(
        location.pathname === "/" || location.pathname === ""
            ? "/"
            : location.pathname,
    );
    //or simply use const [current, setCurrent] = useState(location.pathname)        

    useEffect(() => {
        if (location) {
            if( current !== location.pathname ) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    function handleClick(e) {
        setCurrent(e.key);
    }


  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed} className="sticky-sidebar">
      <div className="logo">
        <Link to="/">
          <img
            className={props.collapsed ? "small_logo_img" : "large_logo_img"}
            src={logo}
          />
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={"/"}
        selectedKeys={[current]}
        onClick={handleClick}
        items={items}
      />
    </Sider>
  );
};
export default SideBar;
