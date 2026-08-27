import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Gunch Enterprises footer', () => {
  render(<App />);
  const footerElement = screen.getByText(/GUNCH ENTERPRISES LLC/i);
  expect(footerElement).toBeInTheDocument();
});
