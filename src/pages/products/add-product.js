import {
  CaretRightOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
  Collapse,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
const { TabPane } = Tabs;
const { Panel } = Collapse;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [refund, setRefund] = useState(false);
  const [cod, setCod] = useState(false);
  const [productType, setProductType] = useState(null);
  const [type, setType] = useState(false);

  function onReset() {
    form.resetFields();
  }
  const onFinish = (values) => {
    console.log(values);
    fetch("http://localhost:5001/admin/products/add", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        product_name: values.name,
        category: values.category,
        product_tags: values.tags,
        stock: values.stock,
        gallery_image: "images",
        refundable: values.refundable == undefined || values.refundable ? 0 : 1,
        cod: values.cod == undefined || values.cod ? 0 : 1,
        product_type: productType,
        price:
          productType == "simple" || productType == "personalized"
            ? JSON.stringify({
                price: values.price,
                special_price: values.special_price,
              })
            : null,
        product_variation: JSON.stringify(attributesVals),
        multiple_tax: values.tax,
        product_desc: values.description,
        seo_meta_tags: "default",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Added Product Succesfully.");
          // onReset();
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

  // Attributes
  const [distinctAttr, setDistinctAttr] = useState([]);
  const getDistinctAttributes = useCallback(async () => {
    fetch("http://localhost:5001/admin/products/attributes/distinct", {
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
          setDistinctAttr(result.data);
          console.log(result.data);
        } else {
          message.error("Error fetching data.");
        }
      });
  });

  // Attributes Values
  const [valuesAttr, setValuesAttr] = useState([]);
  const getAttributesVals = (attribute_title) => {
    fetch(
      "http://localhost:5001/admin/products/attributes/values?attribute_title=" +
        attribute_title,
      {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.status, "status");
        if (result.status == "ok") {
          setValuesAttr(result.data);
          console.log(result.data);
        } else {
          message.error("Error fetching data.");
        }
      });
  };

  useEffect(() => {
    getCategories();
    getDistinctAttributes();
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
  const [attr, setAttr] = useState([]);

  const handleDelete = (val) => {
    const newAttr = attr.filter((item) => item !== val);
    setAttr(newAttr);
    console.log(val, attr);
    const filteredData = attributesVals.filter((items) => items.id != val);
    setAttributesVals(filteredData);
    console.log(filteredData);
    // attrs.push(filteredData);
  };

  const handleAdd = () => {
    if (attr.length == 0) {
      setAttr([...attr, 1]);
    } else {
      let lastElement = attr.slice(-1);
      setAttr([...attr, parseInt(lastElement) + 1]);
    }
  };

  // Add Attribute
  const [attributesVals, setAttributesVals] = useState([]);
  const addAttr = (type, val) => {
    // console.log(type, val);
    type = type.split(" ");
    var foundIndex = attributesVals.findIndex((vals) => vals.id == type[1]);
    if (type[0] == "title") {
      if (foundIndex == -1) {
        var newData = [...attributesVals, { id: type[1], title: val }];
        setAttributesVals(newData);
      } else {
        var newData = [...attributesVals];
        newData[foundIndex].title = val;
        setAttributesVals(newData);
      }
    } else if (type[0] == "value") {
      // console.log(foundIndex);
      var newData = [...attributesVals];
      newData[foundIndex].value = val;
      setAttributesVals(newData);
      // console.log(attributesVals);
    } else if (type[0] == "price") {
      // console.log(foundIndex);
      var newData = [...attributesVals];
      newData[foundIndex].price = val;
      setAttributesVals(newData);
      // console.log(attributesVals);
    } else if (type[0] == "special_price") {
      // console.log(foundIndex);
      var newData = [...attributesVals];
      newData[foundIndex].special_price = val;
      setAttributesVals(newData);
      // console.log(attributesVals);
    }
  };
  // Save Attributes
  // const [isDisabled, setIsDisabled] = useState(false);
  const saveAttr = () => {
    // setIsDisabled(true);
    message.success("Attributes Saved Succesfully.");
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
          {/* <Row gutter={24}>
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
          </Row> */}
          <Tabs style={{ marginBottom: 20 }} type="card">
            <TabPane key={"1"} tab="General">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="Type of Product"
                    name={"product_type"}
                    rules={[
                      {
                        required: true,
                        message: "Please select product type!",
                      },
                    ]}
                  >
                    <Select
                      onChange={(val) => setProductType(val)}
                      disabled={type}
                    >
                      <Select.Option value="simple">
                        Simple Product
                      </Select.Option>
                      <Select.Option value="variable">
                        Variable Product
                      </Select.Option>
                      <Select.Option value="personalized">
                        Personalized Product
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  {productType == "simple" || productType == "personalized" ? (
                    <div>
                      <Form.Item
                        label="Price"
                        name={"price"}
                        rules={[
                          {
                            required: true,
                            message: "Please input product price!",
                          },
                        ]}
                      >
                        <Input type={"number"} />
                      </Form.Item>
                      <Form.Item label="Special Price" name={"special_price"}>
                        <Input type={"number"} />
                      </Form.Item>
                    </div>
                  ) : null}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="button"
                      className="login-form-button"
                      onClick={() => setType(true)}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane key={"2"} tab="Attributes" disabled={!type}>
              <div className="flex-between">
                <div className="attr-title">Attributes</div>
                <div>
                  <Button className="attr-value mr-20" onClick={saveAttr}>
                    Save Attributes
                  </Button>
                  {productType == "personalized" ? null : (
                    <Button className="attr-value" onClick={handleAdd}>
                      Add Attribute
                    </Button>
                  )}
                </div>
              </div>
              {productType == "personalized" ? (
                <div>
                  <Form.Item
                    label="Font Family"
                    name={"font_family"}
                    rules={[
                      {
                        required: true,
                        message:
                          "Please select font family for personalized product!",
                      },
                    ]}
                  >
                    <Select
                      onChange={(selectVal) => {
                        console.log(selectVal);
                      }}
                    >
                      <Select.Option value={"Montserrat"}>
                        Montserrat
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              ) : (
                attr.map((val, index) => {
                  return (
                    <Row gutter={24} key={index}>
                      <Col span={11} md={11} xs={24}>
                        <Form.Item
                          label="Attribute Title"
                          name={"attribute_title" + val}
                          rules={[
                            {
                              required: true,
                              message: "Please input attribute title!",
                            },
                          ]}
                        >
                          <Select
                            onChange={(selectVal) => {
                              getAttributesVals(selectVal);
                              addAttr("title " + val, selectVal);
                            }}
                          >
                            {distinctAttr.map((value, key) => {
                              return (
                                <Select key={key} value={value.attribute_title}>
                                  {value.attribute_title}
                                </Select>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={11} md={11} xs={24}>
                        <Form.Item
                          label="Attribute Value"
                          name={"attribute_value" + val}
                          rules={[
                            {
                              required: true,
                              message: "Please input attribute value!",
                            },
                          ]}
                        >
                          <Select
                            onChange={(selectVal) =>
                              addAttr("value " + val, selectVal)
                            }
                          >
                            {valuesAttr.map((value, key) => {
                              return (
                                <Select key={key} value={value.attribute_value}>
                                  {value.attribute_value}
                                </Select>
                              );
                            })}
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
                })
              )}
            </TabPane>
            {type && productType == "variable" ? (
              <TabPane key={"3"} tab="Variations">
                {attributesVals.map((values, index) => {
                  return (
                    <Collapse
                      key={index}
                      className="site-collapse-custom-collapse"
                    >
                      <Panel
                        header={values.title + " : " + values.value}
                        key={index}
                        className="site-collapse-custom-panel variation-container"
                        // extra={
                        //   <p
                        //     className="dlt-btn dlt-handler"
                        //     onClick={() => handleDelete(values.id)}
                        //   >
                        //     <DeleteOutlined />
                        //   </p>
                        // }
                      >
                        <Row gutter={24}>
                          <Col span={12} md={12} xs={24}>
                            <Form.Item
                              label="Price"
                              name={"price" + values.id}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input product price!",
                                },
                              ]}
                            >
                              <Input
                                type={"number"}
                                onBlur={(e) =>
                                  addAttr("price " + values.id, e.target.value)
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12} md={12} xs={24}>
                            <Form.Item
                              label="Special Price"
                              name={"special_price" + values.id}
                            >
                              <Input
                                type={"number"}
                                onBlur={(e) =>
                                  addAttr(
                                    "special_price " + values.id,
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  );
                })}
              </TabPane>
            ) : null}
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
