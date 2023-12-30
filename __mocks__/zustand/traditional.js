import { act } from '@testing-library/react'
import { beforeEach } from 'vitest';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn as actualCreate } from 'zustand/traditional';

// https://docs.pmnd.rs/zustand/guides/testing

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createWithEqualityFn = (createState) => {

  const store = actualCreate(createState, shallow);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// Reset all stores after each test run
beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});