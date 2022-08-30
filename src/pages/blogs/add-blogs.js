import { Button, Card, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
// Text Editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

const AddBlogs = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  function onReset() {
    form.resetFields();
  }
  const onFinish = (values) => {
    console.log(values,value);
    fetch("http://localhost:5001/admin/blogs/add", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Added Blogs Succesfully.");
          onReset();
        } else {
          message.error(data.error);
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="d-block">
        <h2 className="section-title">Add Blog</h2>
      </div>
      <Card title="Add Blog" className="attribute-container">
        <Form
          form={form}
          name={"add_blog"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Title"
                name={"title"}
                rules={[
                  { required: true, message: "Please input blog title!" },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Content"
                name={"content"}
                rules={[
                  {
                    required: true,
                    message: "Please input blog content!",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  modules={{
                    toolbar: {
                      container: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        [{ align: [] }],
                        ["link", "image", "video"],
                        ["clean"],
                        [{ color: [] }],
                      ],
                    },
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddBlogs;
