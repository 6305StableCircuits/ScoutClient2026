import { generate } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const key = generate();
    return {
        key
    };
};
