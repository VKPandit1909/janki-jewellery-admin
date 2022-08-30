import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, message, Popconfirm, Row, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const ContactSubjects = () => {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  function onReset() {
    form.resetFields();
  };
  //   API Call
  const onFinish = (values) => {
    console.log(values);
    fetch("http://localhost:5001/admin/contact/subject/add", {
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
          message.success("Added Attribute Succesfully.");
          onReset();
          getSubjects();
        } else {
          message.error(data.error);
        }
      });
  };

  const getSubjects = useCallback(async () => {
    fetch("http://localhost:5001/admin/contact/subject/view", {
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
          setDataSource(result.data);
          console.log(result.data);
        } else {
          message.error("Error fetching data.");
        }
      });
  }, []);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a className="dlt-btn">
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const handleDelete = (id) => {
    fetch("http://localhost:5001/admin/contact/subject/delete", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Deleted Attribute Succesfully.");
          const newData = dataSource.filter((item) => item.id !== id);
          setDataSource(newData);
        } else {
          message.error("Error deleting the attributes");
        }
      });
  };

  return (
    <section>
      <div className="main-attr-container">
        <div className="d-block">
          <h2 className="section-title">Add Contact Us Subject</h2>
        </div>
        <Card title="Add Subject" className="attribute-container">
          <Form
            form={form}
            name="add_subject"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Subject"
                  name={"subject"}
                  rules={[{ required: true, message: "Please input subject!" }]}
                >
                  <TextArea placeholder="Subject" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
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
      <div className="mt-40">
        <div className="d-block">
          <h2 className="section-title">All Subjects</h2>
          <p className="section-lead">
            You have total {dataSource.length} Subjects
          </p>
        </div>
        <Card title="Attributes" className="main-attr-container">
          <Table columns={columns} dataSource={dataSource} />
        </Card>
      </div>
    </section>
  );
};
export default ContactSubjects;
