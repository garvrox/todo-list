import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { store } from "../store";
import { Provider } from "react-redux";

describe('Home', () => {
  it('renders a heading', () => {
    render(<Provider store={store}><Home /></Provider>)

    const heading = screen.getByRole('heading', {
      name: /What's the Plan for today?/i,
    })

    expect(heading).toBeDefined()
  })
})