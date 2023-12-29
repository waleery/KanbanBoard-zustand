import { render } from "@testing-library/react";
import { useEffect } from "react";
import { expect, vi } from "vitest";
import { useStore } from "./store";

function TestComponent({selector, effect}){
    const items = useStore(selector)

    useEffect(() => {
        effect(items)
    }, [items]);

    return null
}

test('should return default value (empty array) at the start', () => {
    const selector = (store) => store.tasks
    const effect = vi.fn()

    render(<TestComponent selector={selector} effect={effect} />)

    //Checking with how many arguments the function 'effect' was executed
    expect(effect).toHaveBeenCalledWith([])
})

test('should add ann items to the store and rerun the effect', () => {
    const selector = (store) =>({tasks:store.tasks, addTask: store.addTask})
    const effect = vi.fn().mockImplementation((items) => {
        if(items.tasks.length === 0){
            items.addTask('a','b')
        }
    })

    render(<TestComponent selector={selector} effect={effect} />)

    //Checking with how many arguments the function 'effect' was executed
    expect(effect).toHaveBeenCalledTimes(2)

    //Checking with what argument function 'effect' was executed
    expect(effect).toHaveBeenCalledWith(expect.objectContaining({tasks:[{title:'a', state:'b'}]}))
})