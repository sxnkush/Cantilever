import React, { useState } from "react";
import axios from "axios";
import { useTodo } from "../contexts";

function TodoForm() {

  const BASE_URL = import.meta.env.VITE_API_URL;
  const [todo, setTodo] = useState("");
  const { todos, setTodos } = useTodo();
  const [alert, setAlert] = useState(false);
  const add = async (e) => {
    e.preventDefault();
    if (!todo) return;
    if (
      todos.some(
        (item) =>
          item.taskInfo.trim().toLowerCase() === todo.trim().toLowerCase()
      )
    ) {
      setAlert(true);
      return;
    }

    const formData = {
      taskInfo: todo,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/task`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodos(response.data);
      setTodo("");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    }

    setAlert(false);
  };

  return (
    <div>
      <form onSubmit={add} className="flex">
        <input
          type="text"
          placeholder="Write Task..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-amber-500 text-white shrink-0 hover:cursor-pointer hover:bg-amber-700 transition"
        >
          Add
        </button>
      </form>
      {alert ? <div className="text-red-500"> Task Already Present</div> : null}
    </div>
  );
}

export default TodoForm;
