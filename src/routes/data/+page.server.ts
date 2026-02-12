import type { PageServerLoad } from './$types';
import Match from '$lib/Match.svelte';
import { supabase, supabase_table } from '$lib/supabase';

export const load: PageServerLoad = async () => {
    const { data } = await supabase.from(supabase_table).select('*');
    return {
        matches: (data ?? []).map(match => Match.from(match))
    };
};
