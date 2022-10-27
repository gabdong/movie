import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setTodos] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();

    if (toDo === "") return;

    setTodos((currentArray) => [...currentArray, toDo]);
    setToDo("");
  };

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          type="text"
          placeholder="Write your to do..."
          onChange={onChange}
        />
        <button>Add To Do</button>
      </form>
    </div>
  );
}

export default App;
