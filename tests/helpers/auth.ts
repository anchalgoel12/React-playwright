import { expect, type Page } from '@playwright/test';

type LoginOptions = {
  baseUrl?: string;
  email?: string;
  password?: string;
};

export async function login(page: Page, options: LoginOptions = {}) {
  const baseUrl = options.baseUrl ?? 'http://localhost:5173';
  const email = options.email ?? 'abc@gmail.com';
  const password = options.password ?? '123';

  await page.goto(baseUrl);
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Application' })).toBeVisible();
}

export async function goToDatafile(page: Page) {
  await page.getByRole('button', { name: 'Datafile' }).click();
  await expect(page.getByRole('heading', { name: 'Employee Directory' })).toBeVisible();
}
