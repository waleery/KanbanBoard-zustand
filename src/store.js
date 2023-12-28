import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import {devtools} from 'zustand/middleware'

const store = (set) => ({
    tasks: [
        { title: "TestTask", state: "PLANNED" },
        { title: "TestTask2", state: "PLANNED" },
    ],
    draggedTask: null,
    addTask: (title, state) =>
        set((store) => ({ tasks: [...store.tasks, { title, state }] })),
    deleteTask: (title) =>
        set((store) => ({
            tasks: store.tasks.filter((task) => task.title !== title),
        })),
    setDraggedTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) =>
        set((store) => ({
            tasks: store.tasks.map((task) => {
                if (task.title === title) {
                    return { title, state };
                } else {
                    return task;
                }
            }),
        })),
});

// https://github.com/pmndrs/zustand/discussions/1937
export const useStore = createWithEqualityFn(devtools(store, shallow));

//When we need custom compare function then second argument is 'Object.is'
//export const useStore = createWithEqualityFn(store, Object.is);
