import { Button, Col, Input, notification, Row } from 'antd';
import React, { useState } from 'react';
import axios from '../config/axios';

function TodoItem(props) {
  const { task, id } = props.todo;
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const deleteTodo = () => {
    axios.delete("/todos/" + id).then(res => {
      props.fetchTodos();
    })
      .catch(err => {
        notification.error({
          description: "Something went wrong."
        });
      });
  };

  const updateTodo = () => {
    axios.put("/todos/" + id, { task: inputValue }).then(res => {
      props.fetchTodos();
      setIsEdit(false);
    })
      .catch(err => {
        notification.error({
          description: "Something went wrong."
        });
      });
  };

  const onClickEdit = () => {
    setIsEdit(true);
    setInputValue(task);
  };

  return (
    <div style={{ width: "100%" }}>
      {isEdit ?
        <Row>
          <Col span={18}>
            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
          </Col>
          <Col span={3}>
            <Button onClick={updateTodo} style={{ color: "white", backgroundColor: "orange" }}>Done</Button>
          </Col>
          <Col span={3}>
            <Button onClick={() => setIsEdit(false)} style={{ color: "white", backgroundColor: "grey" }}>Cancel</Button>
          </Col>
        </Row>
        :
        <Row>
          <Col span={18}>
            <Row justify="start">
              {task}
            </Row>
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={onClickEdit}>Edit</Button>
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={deleteTodo} danger>Delete</Button>
          </Col>
        </Row>}
    </div>
  );
}

export default TodoItem;