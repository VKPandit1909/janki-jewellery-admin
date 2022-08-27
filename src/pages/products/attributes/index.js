import { message } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../index.css";
import AddAttributes from "./add-attribute";
import ViewAttributes from "./view-attribute";

const Attributes = () => {
  // Add Attributes
  const childRef = useRef(null);
  //   API Call
  const onFinish = (values) => {
    console.log(values);
    const value =
      values.type == "Custom" || values.type == "Size"
        ? values.value
        : values.value.hex;
    console.log(value);
    fetch("http://localhost:5001/admin/products/attributes/add", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: values.title,
        type: values.type,
        value: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Added Attribute Succesfully.");
          childRef.current.onReset();
          getAttributes();
        } else {
          message.error(data.error);
        }
      });
  };

  const getAttributes = useCallback(async () => {
    fetch("http://localhost:5001/admin/products/attributes/view", {
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
          setData(result.data);
          console.log(result.data);
        } else {
          message.error("Error fetching data.");
        }
      });
  }, [childRef]);

  const [data, setData] = useState(null);
  useEffect(() => {
    getAttributes();
  }, [getAttributes]);

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
    console.log("Failed:", errorInfo);
  };
  return (
    <section>
      <AddAttributes
        ref={childRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
      <ViewAttributes total={data == null ? 0 : data.length} data={data} />
    </section>
  );
};
export default Attributes;
