import { render, screen } from '@testing-library/react';
import NotFoundPage from '../components/NotFoundPage';

test('not found page', () => {
  render(<NotFoundPage />);

  const elem = screen.getByText(/Страница не найдена/i);

  expect(elem).toBeInTheDocument();
});
