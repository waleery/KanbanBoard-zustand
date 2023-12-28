import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import { useState } from "react";
import classNames from "classnames";

//import { useMemo } from "react";
//import { shallow } from "zustand/shallow";

const Column = ({ state }) => {
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [drop, setDrop] = useState(false);

    //when only 'tasks' changes this component will rerender

    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state)

        //shallow is second argument when hook is created with 'createWithEqualityFn' instead of 'create'.
        // shallow

        //filter will always create new instane of en array. Even if the content of the array is the same. This will cause rerender
        // const tasks = useStore((store) =>
        //     store.tasks.filter((task) => task.state === title)
        // );

        //one solution
        // const filtered = useMemo(
        //     () => tasks.filter((task) => task.status === title),
        //     [tasks, title]
        // );

        //second solution
        //check if state are equal (custom comparision function)
        // (prev, next) => {
        //     const longest = prev.length > next.length ? prev.length : next.length

        //     for(let i =0; i<longest; i++){
        //         if(!prev[i] || !next[i]) return false
        //         if(prev[i] !== next[i]) return false
        //     }
        //     return true
        // }
    );
    const addTask = useStore((store) => store.addTask);
    const setDraggedTask = useStore((store) => store.setDraggedTask);
    const draggedTask = useStore((store) => store.draggedTask);
    const moveTask = useStore((store) => store.moveTask);

    return (
        <div
            className={classNames("column", { drop: drop })}
            onDragOver={(e) => {
                setDrop(true);
                e.preventDefault();
            }}
            onDragLeave={(e) => {
                setDrop(false);
                e.preventDefault();
            }}
            onDrop={() => {
                setDrop(false);
                setDraggedTask(null);
                moveTask(draggedTask, state);
            }}
        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick={() => setOpenModal(true)}>Add</button>
            </div>
            {tasks.map((task) => (
                <Task title={task.title} key={task.title} />
            ))}
            {openModal && (
                <div className="modal">
                    <div className="modalContent">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                addTask(text, state);
                                setText("");
                                setOpenModal(false);
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Column;
