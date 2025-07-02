import { useState, useRef, useEffect } from "react";
import { useTodo } from "../contexts";
import { FaFilter, FaPen, FaSave, FaStar, FaTrash } from "react-icons/fa";

function TodoItem({ todo }) {
  const pRef = useRef(null);
  const textAreaRef = useRef(null);
  const { updatedTodo, deleteTodo, toggleCheck, starMark } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [height, setHeight] = useState(0);
  const [todoMsg, setTodoMsg] = useState(todo.taskInfo);

  const editTodo = () => {
    updatedTodo(todo._id, { ...todo, taskInfo: todoMsg });
    setIsTodoEditable(false);
  };
  const toggleChecked = () => {
    toggleCheck(todo);
    const sound = new Audio("/delete.wav");
    if (!todo.toggleCheck) {
      sound.play();
    }
  };

  useEffect(() => {
    if (pRef.current) {
      setHeight(pRef.current.offsetHeight + 10);
    } else if (isTodoEditable && textAreaRef.current) {
      textAreaRef.current.style.height = `${height}px`;
    }
  }, [isTodoEditable]);

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 h-fit text-black opacity-90 ${
        todo.toggleCheck ? "bg-cyan-200" : "bg-sky-100"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.toggleCheck}
        onChange={toggleChecked}
      />
      {isTodoEditable ? (
        <textarea
          ref={textAreaRef}
          className="border border-black/10 px-2 w-full rounded-lg outline-none bg-transparent resize-none custom-scrollbar"
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
        />
      ) : (
        <div className="flex items-center justify-center w-full">
          <p
            className={`w-full text-justify p-2 ${
              todo.toggleCheck ? "line-through" : ""
            }`}
            ref={pRef}
          >
            {todoMsg}
          </p>
        </div>
      )}
      <div className="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:items-baseline-last justify-center">
        <button
          className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50  shrink-0 disabled:opacity-50  ${todo.toggleCheck? "hover:cursor-not-allowed" : "hover:cursor-pointer hover:bg-gray-200"}`}
          onClick={() => {
            if (todo.toggleCheck) return;
            if (isTodoEditable) { 
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.toggleCheck}
        >
          {isTodoEditable ? <FaSave /> : <FaPen className="text-blue-800" />}
        </button>
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-200 shrink-0 hover:cursor-pointer"
          onClick={() => deleteTodo(todo._id)}
        >
          <FaTrash className="text-red-700" />
        </button>
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-200 shrink-0 hover:cursor-pointer"
          onClick={() => starMark(todo)}
        >
          <FaStar className={`${todo.starMarked?"text-yellow-500" : "text-black"}`}/>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
