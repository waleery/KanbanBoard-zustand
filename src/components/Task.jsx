import { useStore } from "../store";
import "./Task.css";
import classNames from "classnames";
import trashIcon from "./../assets/tash-icon.svg";

const Task = ({ title }) => {
    const task = useStore((store) =>
        store.tasks.find((task) => task.title === title)
    );

    const deleteTask = useStore((store) => store.deleteTask);

    return (
        <div className="task">
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <img
                    src={trashIcon}
                    alt="delete-icon"
                    onClick={() => deleteTask(task.title)}
                />
                <div className={classNames("status", task.state)}>
                    {task.state}
                </div>
            </div>
        </div>
    );
};
export default Task;
