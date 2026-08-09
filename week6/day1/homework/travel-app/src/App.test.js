import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('adds a country through Redux and clears the form', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(screen.getByLabelText('Country'), 'New Zealand')
  await user.type(screen.getByLabelText('Visited?'), 'Yes')
  await user.type(screen.getByLabelText('Year Visited/To Visit'), '2024')
  await user.click(screen.getByRole('button', { name: 'Add Country' }))

  expect(screen.getByText('New Zealand')).toBeInTheDocument()
  expect(screen.getByLabelText('Country')).toHaveValue('')
})
