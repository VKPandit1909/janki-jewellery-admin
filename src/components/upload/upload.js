import { Button, Form, message } from "antd";
import React, { useState } from "react";
import UploadImage from ".";

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    console.log(fileList);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image_file", file);
    });
    formData.append("name", "vikram");
    setUploading(true); // You can use any AJAX library you like

    fetch("http://localhost:5001/admins/upload", {
      method: "POST",
      crossDomain: true,
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const getFile = (file) => {
    console.log(file);
    setFileList(file);
  }

  return (
    <Form onFinish={handleUpload}>
      <UploadImage getFile={getFile} />
      <Button
        type="submit"
        htmlType="submit"
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </Form>
  );
};

export default UploadFile;
