import { command, query } from '$app/server';
import Match from '$lib/Match.svelte';
import { generate, invalidate, validate } from '$lib/server';
import { supabase, supabase_table } from '$lib/supabase';
import * as v from 'valibot';

const valid_key = v.pipe(v.number(), v.check(validate));

export const save = command(
    v.object({
        matches: v.array(v.object({
        team: v.number(),
        match: v.number(),
        date: v.number(),
        scout: v.string(),
        alliance: v.union([v.literal('red'), v.literal('blue')]),
        score: v.object({
            overall: v.number(),
            auto: v.looseObject({}),
            teleop: v.looseObject({}),
            accuracy: v.looseObject({})
        }),
        notes: v.nullable(v.string()),
        assists: v.number()
    })),
        key: valid_key
    }),
    async ({ matches, key }) => {
        invalidate(key);
        await supabase.from(supabase_table).insert(matches);
    }
);

export const key_generator = query(valid_key, key => {
    invalidate(key);
    return generate();
});
