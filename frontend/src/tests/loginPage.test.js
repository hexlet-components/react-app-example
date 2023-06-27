import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

test('app start screen', () => {
  render(<BrowserRouter>
    <Login />
    </BrowserRouter>);

  const elems = screen.queryAllByText(/Войти/i, /Ваш ник/i, /Пароль/i, /Нет аккаунта?/i, /Регистрация/i);

  elems.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});
