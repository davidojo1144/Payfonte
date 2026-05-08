# Payfonte React Native Assessment

Expo + TypeScript mobile app that integrates with the PayFusion public countries API.

## Features

- Countries screen with API integration (`/countries`)
- Loading, error, and empty states
- Search and country-context filtering
- Dedicated country details screen (Expo Router)
- Dynamic display locale switching
- React Query integration with offline cache persistence (AsyncStorage)
- Focused unit/component tests for core flows

## Tech Stack

- Expo SDK 54
- React Native + TypeScript
- Expo Router
- TanStack React Query
- Axios
- Zustand
- NativeWind

## API

- Base URL: `https://api.payfonte.com/payfusion/public/v1`
- Endpoint used: `GET /countries`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Ensure env file exists:

```bash
cp .env.example .env
```

3. Start the app:

```bash
npm run start
```

## Scripts

- `npm run start` - start Expo dev server
- `npm run android` - run on Android
- `npm run ios` - run on iOS
- `npm run web` - run on web
- `npm run typecheck` - run TypeScript checks
- `npm run test` - run tests

## Assessment Notes

- Country list displays: name, dialing code, currency, and locale code.
- Tapping a country opens a details screen.
- Offline mode shows cached countries from previous successful fetches.
- Display locale switch changes currency formatting examples without refetching API data.
