import { query } from '$app/server';
import Match from '$lib/Match.svelte';
import { supabase, supabase_table } from '$lib/supabase';

export const matches = query<ReturnType<Match['serialize']>[]>(async () => {
    const { data } = await supabase.from(supabase_table).select('*');
    const matches = [];
    for (const match of data ?? []) {
        matches.push(match);
    }
    return matches;
});
