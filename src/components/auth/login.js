import { Form, Input, Button, Checkbox, Card, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "../../index.css";

// Auth CSS
import "./index.css";
import logo from "../../logo.svg";

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
    fetch("http://localhost:5001/admin/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Signing in...");
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("token", data.data);
          window.location.href = "/";
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
    <div className="login_container">
      <div>
        <div className="logo_icon">
          <img className="" src={logo} />
        </div>
        <Card className="card_login">
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

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
    </div>
  );
};

export default Login;
