import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", done: false },
    { id: 1, content: "코딩 공부하기", done: false },
    { id: 2, content: "잠 자기", done: false },
  ]);

  return (
    
    <>
    <header className="header">
      <h1>📝 Todo App</h1>
    </header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (!inputValue.trim()) return;

    setTodoList(prev => [
      ...prev,
      { id: Number(new Date()), content: inputValue }
    ]);
    setInputValue("");
  }

  return (
    <>

      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="input Todo"
      />
      <button
        className="button-add"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsediting] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const updateTodo = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
    setIsediting(false);
  };

  return (
    <li className={`todo ${todo.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() =>
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, done: !el.done } : el
            )
          )
        }
      />

      {isEditing ? (
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span>{todo.content}</span>
      )}

    <div className="todo-buttons">
      {isEditing ? (
        <button className="button-edit" onClick={updateTodo}>
          완료
        </button>
      ) : (
        <button className="button-edit" onClick={() => setIsediting(true)}>
          수정
        </button>
      )}

      <button
        className="button-delete"
        onClick={() =>
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id))
        }
      >
        삭제
      </button>
      </div>
    </li>
  );
}

export default App;
