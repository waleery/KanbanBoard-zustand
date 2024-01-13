import { useStore } from "../store";
import "./Task.css";
import classNames from "classnames";
import trashIcon from "./../assets/tash-icon.svg";

const Task = ({ id }) => {
    const task = useStore((store) =>
        store.tasks.find((task) => task.id === id)
    );

    const setDraggedTask = useStore((store) => store.setDraggedTask)
    const deleteTask = useStore((store) => store.deleteTask);

    return (
        <div className="task" draggable onDragStart={()=> setDraggedTask(task.id)}>
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <img
                    className="trashIcon"
                    src={trashIcon}
                    alt="delete-icon"
                    onClick={() => deleteTask(task.id)}
                />
                <div className={classNames("status", task.state)}>
                    {task.state}
                </div>
            </div>
        </div>
    );
};
export default Task;
