import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    taskInOngoing:0,
    //addTask: async(title, state) =>
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

// const logWithGetData = (config) => (set, get, api) =>
//     config(
//         (...args) => {

//             const current = get()
//             if(!current) {
//                 //get state from external source
//             }

//             console.log("%c   current state", "color:#3366ff", get());
//             console.log("%c   applying", "color: #ccff33", args);
//             set(...args);
//             console.log("%c   new state", "color:#33ff66", get());

//         },
//         get,
//         api
//     );

//custom middleware to log every state change
//config is a way to manipulate the existing setters, getters and api
const log = (config) => (set, get, api) =>
    config(
        (...args) => {
            console.log("%c START log middleware ------------- ", "color:red")
            console.log("%c   current state", "color:#3366ff", get());
            console.log("%c   applying", "color: #ccff33", args);
            set(...args);
            console.log("%c   current state", "color:#3366ff", get());
            
            // console.log(set, "set");
            // console.log(get, "get");
            // console.log(api, "api");

            console.log("%c END   log middleware ------------- ", "color:red");
        },
        get,
        api
    );

// https://github.com/pmndrs/zustand/discussions/1937
export const useStore = createWithEqualityFn(
    log(persist(devtools(store, shallow), { name: "store" }))

    //logWithGetData(devtools(store, shallow))
);

//When we need custom compare function then second argument is 'Object.is'
//export const useStore = createWithEqualityFn(store, Object.is);

useStore.subscribe((newStore, prevStore) => {
    if(newStore.tasks !== prevStore.tasks){
        useStore.setState({
            taskInOngoing: newStore.tasks.filter((task) => task.state === "ONGOING").length
        })
    }
})