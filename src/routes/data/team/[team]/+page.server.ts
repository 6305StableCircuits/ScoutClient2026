import type { PageServerLoad } from './$types';
import { coerce } from '$lib';
import { supabase, supabase_table } from '$lib/supabase';
import Match from '$lib/Match.svelte';

export const load: PageServerLoad = async ({ params }) => {
    const { data } = await supabase.from(supabase_table).select('*');
    const matches: Match[] = (data ?? [])
        .filter((match: Match) => match?.team?.toString?.() === params.team.toString())
        .map(match => Match.from(match));
    return {
        data,
        matches,
        number: coerce<number>(params.team) * 1
    };
};
