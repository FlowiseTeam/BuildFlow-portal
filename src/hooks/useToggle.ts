import { useReducer } from 'react';

export function useToggle(initialValue: boolean = false) {
  return useReducer((val) => !val, initialValue);
}
