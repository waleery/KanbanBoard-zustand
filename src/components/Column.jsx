import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";

//import { useMemo } from "react";
//import { shallow } from "zustand/shallow";

const Column = ({ state }) => {
    //when only 'tasks' changes this component will rerender

    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state)

        //check if state are equal (custom comparision function)
        // (prev, next) => {
        //     const longest = prev.length > next.length ? prev.length : next.length

        //     for(let i =0; i<longest; i++){
        //         if(!prev[i] || !next[i]) return false
        //         if(prev[i] !== next[i]) return false
        //     }
        //     return true
        // }

        //shallow is second argument when hook is created with 'createWithEqualityFn' instead of 'create'.
        // shallow
    );

    //filter will always create new instane of en array. Even if the content of the array is the same. This will cause rerender
    // const tasks = useStore((store) =>
    //     store.tasks.filter((task) => task.state === title)
    // );

    //one solution
    // const filtered = useMemo(
    //     () => tasks.filter((task) => task.status === title),
    //     [tasks, title]
    // );

    return (
        <div className="column">
            <p>{state}</p>
            {tasks.map((task) => <Task title={task.title} key={task.title} />)}
        </div>
    );
};

export default Column;
