import { test, expect } from '@playwright/test';
import { apiGet } from 'pw-api-plugin';
import { baseUrl, host, apiKey } from '../playwright.config';
import type { Movie } from './helpers/apiTypes';

test('Can search for movies', async ({ request, page }) => {
  const response = await apiGet({ request, page }, `${baseUrl}`, {
    params: { s: 'matrix' },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host,
      'Content-Type': 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  const searchResults = responseBody["Search"];
  expect(Array.isArray(searchResults)).toBe(true);

  searchResults.forEach((movie: Movie) => {
    expect(movie).toHaveProperty('Title');
    expect(movie).toHaveProperty('Year');
    expect(movie).toHaveProperty('imdbID');
    expect(movie).toHaveProperty('Type');
    expect(movie).toHaveProperty('Poster');
  });
});

test('searching for invalid movie returns an error', async ({ request, page }) => {
  const response = await apiGet({ request, page }, `${baseUrl}`, {
    params: { s: '470283720384723084' },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host,
      'Content-Type': 'application/json',
    },
  });
  
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('Response', 'False');
  expect(responseBody).toHaveProperty('Error', 'Movie not found!');
});

