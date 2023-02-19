import React, { useEffect, useState } from "react";
import { Button, TextField, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // console.log(e.target.value);
  };

  //Todo 추가
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    // input 에 text가 빈칸이 아닐때.
    setTodos([...todos, { text: inputValue }]);
    setInputValue("");
  };

  // Todo 삭제
  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  // 완료한 Todo 체크박스
  const handleCheckBox = (index, checked) => {
    // spread 연산자 사용
    const newTodos = [...todos];
    newTodos[index].checked = checked;
    // console.log(newTodos[index]);
    setTodos(newTodos);
  };
  // check된 할일 제거
  const handleCheckRemove = () => {
    const newTodos = [...todos];
    const falseArr = newTodos.filter((e) => !e.checked);
    // console.log(falseArr);
    setTodos(falseArr);
  };
  // useEffect 를 사용하여 컴포넌트 렌더링
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    setTodos(JSON.parse(storedTodos));
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // console.log(todos);
  return (
    <div className="todoContainer">
      <div className="todoList">
        <h1 className="todoTitle">오늘 당장 할 일</h1>
        <form onSubmit={handleFormSubmit}>
          <TextField
            className="todoAddText"
            id="filled-required"
            label="할 일을 입력해주세요."
            variant="filled"
            size="small"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            className="todoAddBtn"
            variant="contained"
            type="submit"
            style={{ borderRadius: "0%" }}
          >
            <AddIcon fontSize="medium" />
          </Button>
        </form>
        <Button variant="contained" onClick={handleCheckRemove}>
          완료된 일 제거
        </Button>
        <ul>
          {/* 배열에 null or undifined 가 아닌지 확인 */}
          {todos &&
            todos.map((todo, index) => (
              <li key={index}>
                <div className={todo.checked ? "check" : ""}>{todo.text}</div>
                <Checkbox
                  size="small"
                  checked={todo.checked ? "checked" : ""}
                  // 디스트럭처링
                  onChange={({ target: { checked } }) =>
                    handleCheckBox(index, checked)
                  }
                />
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRemoveTodo(index)}
                >
                  ❌
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
