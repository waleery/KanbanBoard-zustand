import { render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { useStore } from "./store";

vi.mock("zustand/traditional");

function TestComponent({ selector, effect }) {
    const items = useStore(selector);
    
    effect(items);

    return null;
}

test("should return default value (empty array) at the start", () => {
    const selector = (store) => store.tasks;
    const effect = vi.fn();

    render(<TestComponent selector={selector} effect={effect} />);

    //Checking with how many arguments the function 'effect' was executed
    expect(effect).toHaveBeenCalledWith([]);
});

test("should add ann items to the store and rerun the effect", () => {
    const selector = (store) => ({
        tasks: store.tasks,
        addTask: store.addTask,
    });
    const effect = vi.fn().mockImplementation((items) => {
        if (items.tasks.length === 0) {
            items.addTask("a", "b");
        }
    });

    render(<TestComponent selector={selector} effect={effect} />);

    //Checking with how many arguments the function 'effect' was executed
    expect(effect).toHaveBeenCalledTimes(2);

    //Checking with what argument function 'effect' was executed
    expect(effect).toHaveBeenCalledWith(
        expect.objectContaining({ tasks: [{ title: "a", state: "b" }] })
    );
});

test("should add an items to the store, delete item and rerun the effect", () => {
    const selector = (store) => ({
        tasks: store.tasks,
        addTask: store.addTask,
        deleteTask: store.deleteTask,
    });

    let createdTaks = false;

    const effect = vi.fn().mockImplementation((items) => {
        console.log(items.tasks);
        if (!createdTaks) {
            items.addTask("a", "b");
            createdTaks = true;
        } else if (items.tasks.length === 1) {
            items.deleteTask("a");
        }
    });

    render(<TestComponent selector={selector} effect={effect} />);

    //Checking with how many arguments the function 'effect' was executed
    expect(effect).toHaveBeenCalledTimes(3);

    //Checking with what argument function 'effect' was executed
    expect(effect).toHaveBeenCalledWith(
        expect.objectContaining({ tasks: [{ title: "a", state: "b" }] })
    );
});
