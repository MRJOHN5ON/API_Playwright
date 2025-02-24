import { test, expect } from '@playwright/test';
import { getMovies } from './helpers/apiHelpers';
import type { Movie } from './helpers/apiTypes';

test('Can search for movies', async () => {
  const response = await getMovies('matrix');
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

test('searching for invalid movie returns an error', async () => {
  const response = await getMovies('470283720384723084');
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('Response', 'False');
  expect(responseBody).toHaveProperty('Error', 'Movie not found!');
});

test('Can search for movies with special charactors in the title', async () => {
  const response = await getMovies('$9.99');
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


