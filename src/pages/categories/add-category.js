import { Button, Card, Col, Form, Input, message, Row } from "antd";
import React from "react";
import "./index.css";

const AddCategory = () => {
  const [form] = Form.useForm();
  function onReset() {
    form.resetFields();
  }
  const onFinish = (values) => {
    console.log(values);
    fetch("http://localhost:5001/admin/categories/add", {
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
        priority: values.priority,
        banner: "default",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Added Category Succesfully.");
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
        <h2 className="section-title">Add Category</h2>
      </div>
      <Card title="Add Category" className="attribute-container">
        <Form
          form={form}
          name={"add_category"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Title"
                name={"title"}
                rules={[
                  { required: true, message: "Please input category title!" },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Priority Order"
                name={"priority"}
                rules={[
                  { required: true, message: "Please input category priority!" },
                ]}
              >
                <Input placeholder="Priority Order" />
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
export default AddCategory;
