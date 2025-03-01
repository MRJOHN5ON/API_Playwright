import { apiGet } from 'pw-api-plugin';
import { baseUrl, host, apiKey } from '../../playwright.config';

export const getMovies = async ({ request, page }, title: string) => {
  const response = await apiGet({ request, page }, `${baseUrl}`, {
    params: { s: title },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host,
      'Content-Type': 'application/json',
    },
  });


  return response;
};


