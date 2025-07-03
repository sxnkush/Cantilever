import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaEnvelope,
  FaFilter,
} from "react-icons/fa";
import "react-clock/dist/Clock.css";
import DigitClock from "./components/DigitClock";

axios.defaults.withCredentials = true;

function Home() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [showLogout, setShowLogout] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const format = (num) => num.toString().padStart(2, "0");
  const hours = format(time.getHours());
  const minutes = format(time.getMinutes());
  const seconds = format(time.getSeconds());

  const updatedTodo = async (id, todo) => {
    try {
      const res = await axios.patch(`${BASE_URL}/api/task/${id}`, todo, {
        withCredentials: true,
      });
      setTodos(res.data);
    } catch (err) {
      console.log("ERROR in updating", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/task/${id}`, {
        withCredentials: true,
      });
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
        `${BASE_URL}/api/task/toggle/${todo._id}`,
        todo,
        { withCredentials: true }
      );
      setTodos(res.data);
    } catch (err) {
      console.log("ERROR in toggling", err);
    }
  };

  const starMark = async (todo) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/task/star/${todo._id}`,
        todo,
        { withCredentials: true }
      );
      setTodos(res.data);
    } catch (err) {
      console.log("ERROR in Star Mark", err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/task`, {
          withCredentials: true,
        });
        if (res.data.message === "not found") {
          navigate("/login");
        } else {
          setTodos(res.data);
        }
      } catch (err) {
        console.log("ERROR in fetching", err);
      }
    };

    const fetchUser = async () => {
      try {
        console.log("Fetching User...")
        const res = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });
        if (res.data.message === "not found") {
          navigate("/login");
        } else {
          setUser(res.data);
        }
      } catch (err) {
        console.log("ERROR in fetching User", err);
      }
    };

    fetchTodos();
    fetchUser();
  }, []);

  return (
    <TodoProvider
      value={{
        todos,
        setTodos,
        updatedTodo,
        deleteTodo,
        toggleCheck,
        starMark,
      }}
    >
      <div className="min-h-screen bg-[#001d31] text-white">
        <nav className="w-full flex justify-between items-start px-4 py-3 bg-[#02293e] shadow-lg lg:hidden">
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              {[...hours, ":", ...minutes, ":", ...seconds].map((char, idx) =>
                char === ":" ? (
                  <span key={idx} className="text-xl font-mono">
                    :
                  </span>
                ) : (
                  <DigitClock key={idx} digit={char} />
                )
              )}
            </div>
            <div className="mt-2">
              <div className="flex space-x-2 text-sm text-gray-400">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day, idx) => {
                    const today = time.getDay();
                    return (
                      <span
                        key={idx}
                        className={`${
                          today === idx
                            ? "text-[#00ffcc] font-bold"
                            : "text-gray-400"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  }
                )}
              </div>
              <div className="text-gray-300 mt-2 text-sm">
                <div className="mt-2 flex justify-center items-baseline space-x-2 font-mono">
                  <span className="text-4xl font-bold text-[#00ffcc]">
                    {time.getDate().toString().padStart(2, "0")} /
                  </span>
                  <span className="text-xl text-gray-300">
                    {(time.getMonth() + 1).toString().padStart(2, "0")} /
                  </span>
                  <span className="text-sm text-gray-500">
                    {time.getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="flex flex-col items-center gap-3 mb-6 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowLogout((prev) => !prev);
            }}
          >
            <img
              src={"/User.png"}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-[#00c2ff]"
            />
            <div className="flex flex-col text-left truncate">
              <p className="font-medium truncate">{user[0]?.name || "..."}</p>
            </div>
            {showLogout && (
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer text-sm"
                onClick={async () => {
                  await axios.post(`${BASE_URL}/api/user/logout`, {
                    withCredentials: true,
                  });
                  navigate("/login");
                }}
              >
                Log Out
              </button>
            )}
          </button>
        </nav>

        <div className="relative flex flex-col sm:flex-row">
          <aside className="fixed left-0 w-72 bg-[#011c2b] px-6 py-8 lg:flex flex-col justify-between shadow-xl hidden">
            <div>
              <h2 className="text-2xl font-semibold mb-8 text-center tracking-wide">
                Dashboard
              </h2>
              <button
                className="flex items-center gap-3 mb-6 w-full focus:outline-none cursor-pointer"
                onClick={() => {
                  setShowLogout((prev) => !prev);
                  setArrowDown((prev) => !prev);
                }}
              >
                <img
                  src={"/User.png"}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-[#00c2ff]"
                />
                <div className="flex flex-col text-left truncate">
                  <p className="font-medium truncate">
                    {user[0]?.name || "..."}
                  </p>
                </div>
                {arrowDown ? (
                  <FaChevronDown className="ml-auto" />
                ) : (
                  <FaChevronRight className="ml-auto" />
                )}
              </button>

              {showLogout && (
                <div className="bg-[#02293e] p-4 rounded-lg text-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <FaEnvelope />
                    <span>{user[0]?.email || "Loading..."}</span>
                  </div>
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md cursor-pointer"
                    onClick={async () => {
                      await axios.post(`${BASE_URL}/api/user/logout`, {
                        withCredentials: true,
                      });
                      navigate("/login");
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}

              <div className="mt-10">
                <p className="text-sm text-gray-400 mb-2">Current Time</p>
                <div className="flex p-3 rounded-lg justify-center">
                  {[...hours, ":", ...minutes, ":", ...seconds].map(
                    (char, idx) =>
                      char === ":" ? (
                        <div
                          key={idx}
                          className="text-4xl font-mono text-white mt-2.5"
                        >
                          :
                        </div>
                      ) : (
                        <DigitClock key={idx} digit={char} />
                      )
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="flex justify-center space-x-3">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day, idx) => {
                        const today = time.getDay();
                        const isToday = today === idx;
                        return (
                          <span
                            key={idx}
                            className={`transition-all duration-200 ${
                              isToday
                                ? "text-[#00ffcc] scale-110 font-bold"
                                : "text-gray-400 scale-90"
                            }`}
                          >
                            {day}
                          </span>
                        );
                      }
                    )}
                  </div>
                  <div className="text-gray-300 mt-2 text-sm">
                    <div className="mt-2 flex justify-center items-baseline space-x-2 font-mono">
                      <span className="text-4xl font-bold text-[#00ffcc]">
                        {time.getDate().toString().padStart(2, "0")} /
                      </span>
                      <span className="text-xl text-gray-300">
                        {(time.getMonth() + 1).toString().padStart(2, "0")} /
                      </span>
                      <span className="text-sm text-gray-500">
                        {time.getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 py-12 px-6 lg:ml-72">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#00ffcc] tracking-wide">
                Manage Your Tasks
              </h1>

              {filterValue !== "none" && (
                <p className="text-center text-lg font-medium text-gray-300 mb-4">
                  Showing:{" "}
                  <span className="text-[#00ffcc] capitalize">
                    {filterValue}
                  </span>
                </p>
              )}

              <div className="relative mb-8">
                <TodoForm />
                <button
                  className="absolute top-16 bg-[#02293e] hover:bg-[#00c2ff] hover:text-black p-2 rounded-md"
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  <FaFilter className="text-xl" />
                </button>

                {showFilters && (
                  <div className="ml-10 mt-2.5 w-52 bg-[#02293e] shadow-xl rounded-lg p-2 z-10">
                    {[
                      "all",
                      "completed task",
                      "star marked task",
                      "incomplete task",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setFilterValue(item);
                          setShowFilters(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-md text-sm transition ${
                          filterValue === item
                            ? "bg-[#00c2ff] text-black"
                            : "text-white hover:bg-[#00c2ff] hover:text-black"
                        }`}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-16 columns-1 sm:columns-2 gap-4 space-y-4">
                {todos.map((todo) => {
                  switch (filterValue) {
                    case "all":
                      if (!todo.toggleCheck)
                        return <TodoItem key={todo._id} todo={todo} />;
                      break;
                    case "completed task":
                      if (todo.toggleCheck)
                        return <TodoItem key={todo._id} todo={todo} />;
                      break;
                    case "star marked task":
                      if (todo.starMarked && !todo.toggleCheck)
                        return <TodoItem key={todo._id} todo={todo} />;
                      break;
                    case "incomplete task":
                      if (!todo.toggleCheck)
                        return <TodoItem key={todo._id} todo={todo} />;
                      break;
                    default:
                      return null;
                  }
                })}
              </div>

              {completed && filterValue === "all" && (
                <p className="text-2xl font-semibold mt-16 mb-10">
                  Completed Tasks
                </p>
              )}

              {filterValue === "all" && (
                <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                  {todos.map((todo) => {
                    if (todo.toggleCheck) {
                      if (!completed) setCompleted(true);
                      return <TodoItem key={todo._id} todo={todo} />;
                    }
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </TodoProvider>
  );
}

export default Home;
