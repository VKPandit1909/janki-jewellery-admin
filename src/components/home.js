import { Layout } from "antd";
import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Basic Structure
import SideBar from "./sidebar";
import CustomisedHeader from "./header";
import CustomisedFooter from "./footer";

// Pages
const Dashboard = lazy(() => import("../pages/dashboard"));
const Products = lazy(() => import("../pages/products"));
const NotFound = lazy(() => import("./errors/404"));
const Orders = lazy(() => import("../pages/orders"));
const ChangePassword = lazy(() => import("./auth/change-password"));
const AddCategory= lazy(() => import("../pages/categories/add-category"));
const ViewCategories= lazy(() => import("../pages/categories/view-categories"));
const Attributes = lazy(() => import("../pages/products/attributes"));
const AddProduct = lazy(() => import("../pages/products/add-product"));

const { Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar collapsed={collapsed} />
      <Layout className="site-layout main-container">
        <CustomisedHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
            }}
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/view-categories" element={<ViewCategories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/attributes" element={<Attributes />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </Content>
        <CustomisedFooter />
      </Layout>
    </Layout>
  );
};

export default Home;
