import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
    const {updatedTodo, deleteTodo, toggleCheck} = useTodo()
    const [isTodoEditable, setIsTodoEditable] = useState(false)

    const [todoMsg,setTodoMsg] = useState(todo.taskInfo)

    const editTodo=()=>{
        updatedTodo(todo._id, {...todo, taskInfo: todoMsg})
        setIsTodoEditable(false)
    }
    const toggleChecked = () => {
        toggleCheck(todo)
    }
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.toggleCheck ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.toggleCheck}
                onChange={toggleChecked}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.toggleCheck ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
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
            {/* Delete Todo Button */}
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
