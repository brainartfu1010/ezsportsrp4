# Services

This directory contains service functions for interacting with backend APIs.

## Country Service

The `countryService.ts` provides the following functions:

- `loadCountries()`: Fetch all countries
- `loadCountry(id)`: Fetch a specific country by ID
- `saveCountry(country)`: Create or update a country
- `deleteCountry(id)`: Delete a country by ID

### Usage Example

```typescript
import { countryService, Country } from './countryService';

// Load all countries
const countries = await countryService.loadCountries();

// Create a new country
const newCountry: Country = {
  name: 'United States',
  code: 'US',
  active: true
};
const savedCountry = await countryService.saveCountry(newCountry);

// Update a country
savedCountry.name = 'Updated Country Name';
await countryService.saveCountry(savedCountry);

// Delete a country
await countryService.deleteCountry(savedCountry.id);
```

## Sport Service

The `sportService.ts` provides similar functions for sports:

- `loadSports()`: Fetch all sports
- `loadSport(id)`: Fetch a specific sport by ID
- `saveSport(sport)`: Create or update a sport
- `deleteSport(id)`: Delete a sport by ID

### Usage Example

```typescript
import { sportService, Sport } from './sportService';

// Load all sports
const sports = await sportService.loadSports();

// Create a new sport
const newSport: Sport = {
  name: 'Football',
  code: 'FB',
  description: 'A popular team sport',
  active: true
};
const savedSport = await sportService.saveSport(newSport);
```

## Notes

- These services use Axios for HTTP requests
- Assumes backend API endpoints at `/api/countries` and `/api/sports`
- Error handling is built into each method
- Typescript types are provided for type safety
