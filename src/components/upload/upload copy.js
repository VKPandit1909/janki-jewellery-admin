import { CameraOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import React, { useState } from "react";

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image_file", file);
    });
    formData.append("name", "vikram");
    setUploading(true); // You can use any AJAX library you like

    fetch("http://localhost:5001/admins/upload", {
      method: "POST",
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

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const [fileLists, setFileLists] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileLists;
  };

  const handleFileChange = ({ fileLists }) => {
    setFileLists(fileLists);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <Form onFinish={handleUpload}>
      <Form.Item
        label="Upload"
        name="upload_image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          {...props}
          listType="picture-card"
          fileList={fileLists}
          onChange={handleFileChange}
          onPreview={onPreview}
          accept="image/*"
        >
          <CameraOutlined
            className="icon-uploader"
            size={30}
            style={{ fontSize: 30 }}
          />
        </Upload>
      </Form.Item>
      <Button
        type="submit"
        htmlType="submit"
        disabled={fileList.length === 0}
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
