// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import todoReducer from './slices/todoSlice'

export const apiMock = [
    {
    "_id": "623e0aee22036ce2a26dbe9f",
    "text": "My Second todo",
    "isComplete": 1
    },
    {
    "_id": "623e0ae122036ce2a26dbe9e",
    "text": "My First Todo"
    }
    ]

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { todo: todoReducer }, preloadedState: { todo: { value: apiMock } } }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }