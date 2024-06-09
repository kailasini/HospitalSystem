import { StaticProvider } from '@angular/core';

export const environment = {
  production: true,
  apiUrl: 'https://localhost:3000',
  providers: [] as StaticProvider[] // Define the providers property as an empty array of StaticProvider
};
