import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

test('app start screen', () => {
  render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>,
  );

  const elem = screen.queryByText(/Home/i);

  expect(elem).toBeInTheDocument();
});
