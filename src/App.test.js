import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header -get by text-', () => {
  render(<App />);

  const headerElement = screen.getByText(/Tasks/i);

  expect(headerElement).toBeInTheDocument();
});

test('renders header -get by role-', () => {
  render(<App />);

  const headerElement = screen.getByRole('heading', {name: 'Tasks'});
  expect(headerElement).toBeInTheDocument();
});