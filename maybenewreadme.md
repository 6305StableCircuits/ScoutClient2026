# 2026 Scouting App

The 6305 Scouting App.

## Stack

- [Svelte, SvelteKit](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Supabase](https://supabase.com)

## Routes

- `scout` - The main scouting page.
- `data` - Anything relating to data recorded
    - `/team/[team]` - Data relating to a specific team
    - `/match/[match]` - Data relating to a specific match
    - `/scouter/[scouter]` - Data relating to a specific scouter
- `save` - Where data can be saved to the database, downloaded, removed

## Database

We use Supabase to manage the database. This is where specific details such as the schema can be found. 

## Configuration

The configuration file can be found in `/src/lib/config.ts`. This configuration is used for the game structure and algorithm.
