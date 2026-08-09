import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './index'

test('increments, decrements, and resets the Redux count', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: 'Increment' }))
  await user.click(screen.getByRole('button', { name: 'Increment' }))
  expect(screen.getByText('2')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Decrement' }))
  expect(screen.getByText('1')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Reset' }))
  expect(screen.getByText('0')).toBeInTheDocument()
})
