import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const updatedTodo = async (id, todo) => {
    try {
      const res = await fetch(`http://localhost:8001/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // to specify JSON format
        },
        body: JSON.stringify(todo),
      });
      const todos = await res.json();
      setTodos(todos);
    } catch (err) {
      console.log("ERROR in updating", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:8001/task/${id}`, {
        method: "DELETE",
      });
      const todos = await res.json();
      setTodos((prev) => prev.filter((item) => item._id !== todos.deleted._id));
    } catch (err) {
      console.log("ERROR in deleting", err);
    }
  };

  const toggleCheck = async(todo) => {
    try {
      const res = await fetch(`http://localhost:8001/task/toggle/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // to specify JSON format
        },
        body: JSON.stringify(todo),
      });
      const todos = await res.json();
      setTodos(todos);
    } catch (err) {
      console.log("ERROR in toggling", err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:8001/task", {
          method: "GET",
        });
        const todos = await res.json();
        if (todos && todos.length >= 0) {
          setTodos(todos);
        }
      } catch (err) {
        console.log("ERROR", err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <TodoProvider
      value={{ todos, setTodos, updatedTodo, deleteTodo, toggleCheck }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo._id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
