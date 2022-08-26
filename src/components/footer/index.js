import React from "react";
import { Layout } from "antd";
import "./index.css";

const { Footer } = Layout;
const CustomisedFooter = () => {
  return (
    <Footer
      className="footer-container"
    >
      Janki Jewellery Admin ©2022 Created by The Debug Arena
    </Footer>
  );
};

export default CustomisedFooter;
