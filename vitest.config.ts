import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts']
    },
    resolve: {
        alias: {
            $lib: resolve('./src/lib'),
            '$app/state': resolve('./src/__mocks__/app-state.ts')
        }
    }
});
