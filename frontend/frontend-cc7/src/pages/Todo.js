import React from 'react';
import { Button, Col, Input, List, notification, Row } from "antd";
import { useEffect, useState } from 'react';
import axios from "../config/axios";
import TodoItem from '../containers/TodoItem';
import LocalStorageService from "../services/localStorage";
import { withRouter } from 'react-router-dom';

function Todo(props) {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchTodos = () => {
    axios.get("/todos")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = () => {
    axios.post("/todos", { task: inputValue })
      .then(res => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
        notification.error({
          description: "Something went wrong."
        });
      });
  };

  const onLogout = () => {
    LocalStorageService.clearToken();
    props.history.push("/login");
  };

  return (
    <div className="App">
      <h2>Todo-List</h2>
      <Row justify="center">
        <Col>
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </Col>
        <Col>
          <Button onClick={createTodo}>Add</Button>
        </Col>
        <Col>
          <Button onClick={onLogout}>Logout</Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <List
            size="small"
            bordered
            dataSource={data}
            renderItem={item => <List.Item><TodoItem fetchTodos={fetchTodos} todo={item} /></List.Item>}
          />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Todo);