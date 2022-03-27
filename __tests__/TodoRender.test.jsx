import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, act, apiMock } from '../test-utils'
import TodoList from '../components/TodoList'
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('/api/todo', (req, res, ctx) => {
    return res(ctx.json(apiMock), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('TodoList', () => {
  it('Renders without blowing up', async () => {
    const { getByTestId } =render(<TodoList />)
    await new Promise((resolve) => setTimeout(resolve, 200));

  apiMock.forEach(({_id, isComplete}) => {
    expect(getByTestId(`todo-item-${_id}`)).toBeDefined();
    if (!isComplete) {
      fireEvent.click(getByTestId(`action-mark-complete-${_id}`));
    }
  })
  })

  it('Manually add todo', async () => {
    const { getByTestId } =render(<TodoList />)
    await act(async () => {
      fireEvent.change(getByTestId('input-todo'), {
        target: { value: 'Sample todo' },
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
    fireEvent.change(getByTestId('input-todo'), {
      target: { value: 'Sample todo' },
    });

    fireEvent.click(getByTestId('action-add-todo'));
  })
})