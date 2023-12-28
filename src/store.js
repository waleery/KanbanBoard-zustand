import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) =>
        // false/true tells zustand to just manipulate or replace object in store
        set(
            (store) => ({ tasks: [...store.tasks, { title, state }] }),
            false,
            "addTask"
        ),
    deleteTask: (title) =>
        set(
            (store) => ({
                tasks: store.tasks.filter((task) => task.title !== title),
            }),
            false,
            "deleteTask"
        ),
    setDraggedTask: (title) =>
        set({ draggedTask: title }, false, "setDraggedTask"),
    moveTask: (title, state) =>
        set(
            (store) => ({
                tasks: store.tasks.map((task) => {
                    if (task.title === title) {
                        return { title, state };
                    } else {
                        return task;
                    }
                }),
            }),
            false,
            "moveTask"
        ),
});
console.log(store);

// https://github.com/pmndrs/zustand/discussions/1937
export const useStore = createWithEqualityFn(
    persist(devtools(store, shallow), { name: "store" })
);

//When we need custom compare function then second argument is 'Object.is'
//export const useStore = createWithEqualityFn(store, Object.is);
