# Pinterest Clone (React Native / Expo)

A Pinterest-style photo discovery app built with **React Native** and **Expo**, using the **Unsplash API** as a live data source. Implements an infinite-scrolling masonry feed, search, and a save-to-profile flow with a custom design system.

## Features

- **Masonry image grid** — custom two-column masonry layout that balances column heights based on each image's aspect ratio (`src/utils/masonry.ts`), rendered with `@shopify/flash-list` for virtualized scrolling performance.
- **Search with infinite scroll** — debounced-on-blur search against the Unsplash Search API, paginated loading as the user scrolls, with client-side de-duplication of results by ID and loading states for both initial and paginated fetches.
- **Save / like pins** — tap the heart icon on any pin to save it to a personal collection, persisted across app restarts with `AsyncStorage` (`src/contexts/DataContextProvider.tsx`).
- **Profile with tabs** — top-tab navigation (`Saved` / `Created`) rendering the user's saved pins in the same masonry layout.
- **Pin detail view** — modal screen with full-size image, author info, and view/download stats pulled from the Unsplash API.
- **Custom design token system** — centralized colors, spacing, border radius, and shadow tokens (`src/styles/theme.ts`) driving a consistent UI across the app.
- **Bottom tab + stack + top tab navigation** — nested React Navigation setup (`Home`/`Profile` bottom tabs, a stack for profile drill-down, and material top tabs within profile).

## Tech Stack

| Layer       | Technology                                                         |
| ----------- | ------------------------------------------------------------------ |
| Framework   | React Native 0.86, Expo SDK 57 (React 19)                          |
| Language    | TypeScript                                                         |
| Navigation  | React Navigation v7 (bottom tabs, stack, material top tabs)        |
| Lists       | `@shopify/flash-list` (virtualized masonry grid)                   |
| State       | React Context API (`DataContextProvider`, `SearchContextProvider`) |
| Persistence | `@react-native-async-storage/async-storage` (saved pins)           |
| Data source | [Unsplash API](https://unsplash.com/developers) (REST)             |
| Platforms   | iOS, Android, Web (via `react-native-web`)                         |

## Project Structure

```text
src/
├── components/       # Reusable UI: pin grid, pin card, filter/search bar, loader, navigation
├── contexts/         # Global state: saved images (AsyncStorage-backed), search query & pagination state
├── pages/            # Screens: Main feed, Profile, Pin detail modal
├── router/           # React Navigation stack/tab configuration
├── services/         # Unsplash API client
├── styles/           # Design tokens (colors, spacing, radius, shadows) and global styles
├── types/            # Shared TypeScript interfaces
└── utils/            # Masonry layout algorithm
```

## Getting Started

```bash
# install dependencies
npm install

# set up environment variables
cp .env.example .env
# then edit .env and add your own Unsplash API access key
# (create one at https://unsplash.com/developers)

# start the Expo dev server
npx expo start
```

Then run on a simulator (`i` for iOS, `a` for Android) or scan the QR code with the **Expo Go** app on a physical device.
