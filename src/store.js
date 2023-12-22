import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

const store = (set) => ({
    tasks: [{ title: "TestTask", state: "PLANNED" },{ title: "TestTask2", state: "PLANNED" }],
});

// https://github.com/pmndrs/zustand/discussions/1937
export const useStore = createWithEqualityFn(store, shallow);

//When we need custom compare function then second argument is 'Object.is'
//export const useStore = createWithEqualityFn(store, Object.is);


