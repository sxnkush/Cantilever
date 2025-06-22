import React, { useState } from "react";
import axios from "axios";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { setTodos } = useTodo();
  const add = async (e) => {
    e.preventDefault();
    if (!todo) return;

    const formData = {
      userId: userId,
      taskInfo: todo,
      toggleCheck: false,
    };

    try {
      const response = await axios.post(`/api/task`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodos(response.data);
      setTodo("");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
