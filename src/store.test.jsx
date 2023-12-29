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