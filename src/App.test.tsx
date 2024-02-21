import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders home page elements', () => {
  render(<App />);
  const header = screen.getByText(/woofer/i);
  const search = screen.getByRole('search');
  const button = screen.getByText(/see all breeds/i);
  expect(header).toBeDefined();
  expect(search).toBeDefined();
  expect(button).toBeDefined();
});

test('renders all breeds menu on see all breeds button click', async () => {
  render(<App />);
  expect(screen.queryByText(/all breeds:/i)).toBeNull();
  const button = screen.getByText(/see all breeds/i);
  await fireEvent.click(button);
  expect(screen.getByText(/all breeds:/i)).toBeDefined();
});

test('renders no results text', async () => {
  render(<App />);
  expect(screen.queryByRole('region')).toBeNull();
  const input = screen.getByRole('searchbox', {
    name: 'Search for a dog breed',
  });
  await userEvent.type(input, "abcd");
  expect(screen.findByRole('region')).toBeDefined();
});

test('renders breed images on search', async () => {
  render(<App />);
  expect(screen.queryByText(/breed: hound/i)).toBeNull();
  const input = screen.getByRole('searchbox', {
    name: 'Search for a dog breed',
  });
  await userEvent.type(input, "hound");
  expect(screen.findByText(/breed: hound/i)).toBeDefined();
});
