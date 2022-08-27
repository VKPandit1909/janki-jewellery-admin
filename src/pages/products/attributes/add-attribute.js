import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { Colorpicker } from "antd-colorpicker";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const AddAttributes = forwardRef((props, ref) => {
  // Reset Form Fields
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    onReset() {
      form.resetFields();
    },
  }));

  // Setting Colors
  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 0.5,
  });
  const [type, setType] = useState("");
  const onChange = (color) => {
    setColor(color);
  };

  return (
    <div className="main-attr-container">
      <div className="d-block">
        <h2 className="section-title">Add Attribute</h2>
      </div>
      <Card title="Add Attribute" className="attribute-container">
        <Form
          form={form}
          name="add_attribute"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={props.onFinish}
          onFinishFailed={props.onFinishFailed}
        >
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Title"
                name={"title"}
                rules={[
                  { required: true, message: "Please input attribute title!" },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Type"
                name={"type"}
                rules={[
                  { required: true, message: "Please select attribute type!" },
                ]}
              >
                <Select onChange={(val) => setType(val)}>
                  <Select.Option value="Custom">Custom</Select.Option>
                  <Select.Option value="Size">Size</Select.Option>
                  <Select.Option value="Color">Color</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Value"
                name={"value"}
                rules={[
                  { required: true, message: "Please input attribute value!" },
                ]}
                className="type-input"
              >
                {type == "Color" ? (
                  <Colorpicker
                    popup
                    blockStyles={{
                      width: "100%",
                      height: "30px",
                      //   borderRadius: "50%",
                    }}
                    value={color}
                    onChange={onChange}
                  />
                ) : (
                  <Input
                    type={type == "" || type == "Custom" ? "text" : "number"}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item className="mt-40">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
});
export default AddAttributes;
