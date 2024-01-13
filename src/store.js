import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { uniqueId } from "lodash";

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    taskInPlanned: 0,
    taskInOngoing: 0,
    taskInDone: 0,
    //addTask: async(title, state) =>
    addTask: (title, state) =>
        // false/true tells zustand to just manipulate or replace object in store
        set(
            (store) => ({
                tasks: [...store.tasks, { id: uniqueId(Date.now().toString().slice(7) + "-"), title, state }],
            }),
            false,
            "addTask"
        ),
    deleteTask: (id) =>
        set(
            (store) => ({
                tasks: store.tasks.filter((task) => task.id !== id),
            }),
            false,
            "deleteTask"
        ),
    setDraggedTask: (id) =>
        set({ draggedTask: id }, false, "setDraggedTask"),
    moveTask: (id, state) =>
        set(
            (store) => ({
                tasks: store.tasks.map((task) => {
                    if (task.id === id) {
                        return { ...task, state};
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
            console.log("%c START log middleware ------------- ", "color:red");
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
    log(
        subscribeWithSelector(
            persist(devtools(store, shallow), { name: "store" })
        )
    )

    //logWithGetData(devtools(store, shallow))
);

//When we need custom compare function then second argument is 'Object.is'
//export const useStore = createWithEqualityFn(store, Object.is);

//subscribe with selector => need to use 'subscribeWithSelector' when store is created
useStore.subscribe(
    (store) => store.tasks,
    (newTasks, prevTasks) => {
        useStore.setState({
            taskInPlanned: newTasks.filter((task) => task.state === "PLANNED")
                .length,
            taskInOngoing: newTasks.filter((task) => task.state === "ONGOING")
                .length,
            taskInDone: newTasks.filter((task) => task.state === "DONE")
                .length,
        });
    }
);

//subscribe without selector

// useStore.subscribe((newStore, prevStore) => {
//     if(newStore.tasks !== prevStore.tasks){
//         useStore.setState({
//             taskInOngoing: newStore.tasks.filter((task) => task.state === "ONGOING").length
//         })
//     }
// })
