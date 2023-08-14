// @ts-check
//
const { test, expect } = require('@playwright/test');

test('wrong login', async ({ page }) => {
  await page.goto('http://localhost:5001/');

  expect(page.getByText(/Нет аккаунта?/)).toBeVisible();
  expect(page.getByAltText(/Войти/)).toBeVisible();
  expect(page.getByText(/Регистрация/)).toBeVisible();
  expect(await page.getByText(/Войти/).count()).toEqual(2);

  await page.locator('#username').fill('test');
  await page.locator('#password').fill('test');
  await page.getByRole('button', { name: 'Войти' }).click();
  expect(await page.getByText(/Скрытая страница!/).count()).toEqual(0);
  expect(page.getByText(/Неверные имя пользователя или пароль/)).toBeVisible();
});

test('registration page, success login', async ({ page }) => {
  await page.goto('http://localhost:5001/');

  await page.getByText(/Регистрация/).click();
  expect(page.getByLabel(/Имя пользователя/)).toBeVisible();
  expect(page.getByLabel(/Пароль/)).toBeVisible();
  expect(page.getByLabel(/Подтвердите пароль/)).toBeVisible();
  expect(page.getByText(/Регистрация/)).toBeVisible();
  expect(page.getByAltText(/Регистрация/)).toBeVisible();

  await page.locator('#username').fill('playwright');
  await page.locator('#password').fill('password');
  await page.locator('#confirmPassword').fill('password');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  expect(page.getByText(/Скрытая страница!/)).toBeVisible();

  await page.getByRole('button', { name: 'Выйти' }).click();

  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin');
  await page.getByRole('button', { name: 'Войти' }).click();
  expect(page.getByText(/Скрытая страница!/)).toBeVisible();
});
