import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registration from '../components/Registration';

test('app start screen', () => {
  render(
        <BrowserRouter>
            <Registration />
        </BrowserRouter>,
  );

  const elems = screen.queryAllByText(/Регистрация/i, /Зарегистрироваться/i, /Подтвердить пароль/i, /Пароль/i, /Имя пользователя/i);

  elems.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});
