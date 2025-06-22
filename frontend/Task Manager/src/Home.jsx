import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Home() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const updatedTodo = async (id, todo) => {
    try {
      const res = await axios.patch(`/api/task/${id}`, todo);
      setTodos(res.data);
    } catch (err) {
      console.log("ERROR in updating", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`/api/task/${id}`);
      setTodos((prev) =>
        prev.filter((item) => item._id !== res.data.deleted._id)
      );
    } catch (err) {
      console.log("ERROR in deleting", err);
    }
  };

  const toggleCheck = async (todo) => {
    try {
      const res = await axios.patch(
        `/api/task/toggle/${todo._id}`,
        todo
      );
      setTodos(res.data);
    } catch (err) {
      console.log("ERROR in toggling", err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log("Fetching....");
        const res = await axios.get(`/api/task`);
        console.log(res.data)
        if(res.data.message === "not found")
        {
          navigate("/login")
        }
        setTodos(res.data);
      } catch (err) {
        console.log("ERROR in fetching", err);
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
            {todos.map((todo) => (
              <div key={todo._id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={async () => {
          await axios.post("/api/user/logout");
          navigate("/login")
        }}
      >
        Log Out
      </button>
    </TodoProvider>
  );
}

export default Home;
