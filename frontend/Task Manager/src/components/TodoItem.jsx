import { useState, useRef, useEffect } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const pRef = useRef(null);
  const textAreaRef = useRef(null);
  const { updatedTodo, deleteTodo, toggleCheck } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [height, setHeight] = useState(0);
  const [todoMsg, setTodoMsg] = useState(todo.taskInfo);

  const editTodo = () => {
    updatedTodo(todo._id, { ...todo, taskInfo: todoMsg });
    setIsTodoEditable(false);
  };
  const toggleChecked = () => {
    toggleCheck(todo);
    const sound = new Audio("/delete.wav")
    if(!todo.toggleCheck)
    {
      sound.play()
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
        <p
          className={`w-full text-justify p-2 ${
            todo.toggleCheck ? "line-through" : ""
          }`}
          ref={pRef}
        >
          {todoMsg}
        </p>
      )}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.toggleCheck) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.toggleCheck}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo._id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
