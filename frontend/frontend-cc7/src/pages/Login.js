import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import axios from '../config/axios';
import LocalStorageService from "../services/localStorage";
import { withRouter } from 'react-router-dom';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};


function Login(props) {
  const onFinish = ({ username, password }) => {
    axios.post("/users/login", { username, password })
      .then(res => {
        notification.success({
          description: "Login Success"
        });
        LocalStorageService.setToken(res.data.token);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        notification.error({
          description: "Login Not Success"
        });
      });
  };

  return (
    <div style={{}}>
      <Row justify="center">
        <h2>Login Form</h2>
      </Row>
      <Row justify="center">
        <Col span={10}>
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
                </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);