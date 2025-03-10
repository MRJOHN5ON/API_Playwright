import { request } from '@playwright/test';
import { baseUrl } from '../../playwright.config';
const { writeFile } = require('fs').promises;
import dotenv from 'dotenv';


dotenv.config();


export const getMovies = async (title: string) => {
  const context = await request.newContext();

  const response = await context.get(baseUrl, {
    params: { s: `${title}`, },
  });

  // Save results
  const responseBody = await response.json();
  saveResults('searchForMovieResponse.json', responseBody);

  return response;
};

export async function saveResults(fileName: string, results: JSON) {
  const resultsJSON = JSON.stringify(results, null, 2); // Pretty print JSON
  try {
    await writeFile(`test-results/${fileName}`, resultsJSON, 'utf-8');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}
