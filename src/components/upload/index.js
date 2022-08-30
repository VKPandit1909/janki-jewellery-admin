import React, { useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Col, Form, Row, Upload } from "antd";

const UploadImage = ({getFile, maxCount}) => {
  // File for Upload
  const [fileList, setFileList] = useState([]);
  // file for preview
  const [fileLists, setFileLists] = useState([]);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileLists;
  };

  const handleFileChange = ({ fileLists }) => {
    setFileLists(fileLists);
    // Passing the data to parent component
    getFile(fileList);
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

  // upload file props
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

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item
          label={maxCount == undefined ? "Image" : "Image (Max: "+ maxCount + ")"}
          name="images"
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
      </Col>
    </Row>
  );
};
export default UploadImage;
