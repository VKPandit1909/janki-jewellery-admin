import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
  Upload,
  Tabs,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
const { TabPane } = Tabs;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [refund, setRefund] = useState(false);
  const [cod, setCod] = useState(false);
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

  const [category, setCategory] = useState([]);
  const getCategories = useCallback(async () => {
    fetch("http://localhost:5001/admin/categories/view", {
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
          setCategory(result.data);
          console.log(result.data);
        } else {
          message.error("Error fetching data.");
        }
      });
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

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

  //   Attribute
  const [attr, setAttr] = useState([1, 2]);

  const handleDelete = (val) => {
    const newAttr = attr.filter((item) => item !== val);
    setAttr(newAttr);
  };

  const handleAdd = () => {
    let lastElement = attr.slice(-1);
    setAttr([...attr, lastElement + 1]);
  };

  return (
    <div>
      <div className="d-block">
        <h2 className="section-title">Add Product</h2>
      </div>
      <Card title="Add Product" className="attribute-container">
        <Form
          form={form}
          name="add_attribute"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Name"
                name={"name"}
                rules={[
                  { required: true, message: "Please input product name!" },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Category"
                name={"category"}
                rules={[
                  {
                    required: true,
                    message: "Please select product category!",
                  },
                ]}
              >
                <Select onChange={(val) => console.log(val)}>
                  {category.map((val, index) => {
                    console.log(val);
                    return (
                      <Select.Option key={index} value={val.category_title}>
                        {val.category_title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Tags"
                name={"tags"}
                rules={[
                  { required: true, message: "Please input product tags!" },
                ]}
              >
                <Input placeholder="eg. Bike, Car" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Stock"
                name={"stock"}
                rules={[
                  { required: true, message: "Please input product stock!" },
                ]}
              >
                <Input type={"number"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6} md={6} xs={12}>
              <Form.Item label="Refundable" name={"refundable"}>
                <Switch checked={refund} onChange={() => setRefund(!refund)} />
              </Form.Item>
            </Col>
            <Col span={6} md={6} xs={12}>
              <Form.Item label="Cash On Delivery" name={"cod"}>
                <Switch checked={cod} onChange={() => setCod(!cod)} />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Multiple Tax"
                name={"tax"}
                rules={[{ required: true, message: "Please input tax!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Labour Cost"
                name={"cost"}
                rules={[
                  { required: true, message: "Please input labour cost!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Weight"
                name={"weight"}
                rules={[
                  { required: true, message: "Please input product weight!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Tabs style={{marginBottom: 10}} type="card">
            <TabPane key={"1"} tab="General">
            <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Type of Product"
                name={"product_type"}
                rules={[
                  { required: true, message: "Please select product type!" },
                ]}
              >
                <Select onChange={(val) => console.log(val)}>
                    <Select.Option value="simple">Simple Product</Select.Option>
                    <Select.Option value="personalized">Personalized Product</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            </Row>
            </TabPane>
            <TabPane key={"2"} tab="Attributes">
              <div className="flex-between">
                <div className="attr-title">Attributes</div>
                <Button className="attr-value" onClick={handleAdd}>
                  Add Attribute
                </Button>
              </div>
              {attr.map((val, index) => {
                return (
                  <Row gutter={24} key={index}>
                    <Col span={11} md={11} xs={24}>
                      <Form.Item
                        label="Attribute Title"
                        name={"attribute_title"}
                        rules={[
                          {
                            required: true,
                            message: "Please input attribute title!",
                          },
                        ]}
                      >
                        <Select>
                            <Select key="{index}" value="{val}">val</Select>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={11} md={11} xs={24}>
                      <Form.Item
                        label="Attribute Value"
                        name={"attribute_value"}
                        rules={[
                          {
                            required: true,
                            message: "Please input attribute value!",
                          },
                        ]}
                      >
                        <Select>
                            <Select key="{index}" value="{val}">val</Select>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={2} md={2} xs={24}>
                      <p
                        className="dlt-btn dlt-container"
                        onClick={() => handleDelete(val)}
                      >
                        <DeleteOutlined />
                      </p>
                    </Col>
                  </Row>
                );
              })}
            </TabPane>
          </Tabs>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Product Description" name={"description"}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Image" valuePropName="fileList">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onPreview={onPreview}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
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
export default AddProduct;
