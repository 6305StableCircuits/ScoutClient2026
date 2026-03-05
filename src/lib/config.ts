import type { Config } from '$lib/types';

let amps = 0;
let charged = false;
let charge_start = 0;
let assists = 0;
let state: Record<string, any> = {};
let actions: Record<string, any>[] = [];
let undone: Record<string, any>[] = [];
let game_state = 'auto';
let scoring: Config['scoring'][number]['name'][] = [];
let end: Config['end'][number]['name'][] = [];
let questions: Config['questions'][number][]= [];
var config: Config = {
    reset() {
        actions = [];
        undone = [];
        game_state = 'auto';
        state = {
            assists,
            charged,
            points: 0,
            climb1: false,
            end: Object.fromEntries(this.end.map(({ name }) => [name, false])),
            questions: Object.fromEntries(this.questions.map(({ name }) => [name, false])),
            scoring: Object.fromEntries(
                this.scoring.map(({ name }) => [
                    name,
                    {
                        amount: 0,
                        points: 0
                    }
                ])
            )
        };
    
        // console.log(state);
        assists = 0;
    },
    get undo_available() {
        return actions.length === 0;
    },
    get redo_available() {
        return undone.length === 0;
    },
    undo() {
        if (actions.length === 0) return state;
        const last_action = actions.pop();
        undone.push(last_action!);
        state = last_action!;
        return last_action!;
    },
    redo() {
        if (undone.length === 0) return state;
        const last_undone = undone.pop();
        actions.push(last_undone!);
        state = last_undone!;
        return last_undone!;
    },
    assist() {
        actions.push(structuredClone(state));
        assists++;
        state.assists = assists;
        return state;
    },
    scoring: [
        {
            name: 'Fuel +1',
            auto: {
                points: 1
            },
            get teleop() {
                if (game_state === 'auto') {
                    game_state = 'teleop';
                    for (let score of scoring) {
                        state.scoring[score] = {
                            amount: 0,
                            points: 0
                        };
                    }
                }
                return {
                    get points() {
                        return 1;
                    }
                };
            },
            score(points: number) {
                actions.push(structuredClone(state));
                state.points += points;
                state.scoring['Fuel +1'].amount++;
                state.scoring['Fuel +1'].points += points;
                return state;
            }
        },
        {
            name: 'Fuel +5',
            auto: {
                points: 5
            },
            get teleop() {
                if (game_state === 'auto') {
                    game_state = 'teleop';
                    for (let score of scoring) {
                        state.scoring[score] = {
                            amount: 0,
                            points: 0
                        };
                    }
                }
                return {
                    get points() {
                        return 5;
                    }
                };
            },
            score(points: number) {
                actions.push(structuredClone(state));
                state.points += points;
                state.scoring['Fuel +5'].amount++;
                state.scoring['Fuel +5'].points += points;
                return state;
            }
        },
        {
            name: 'Climb Level 1 (Auto)',
            auto: {
                points: 15
            },
            teleop: {
                points: 10
            },
            once: 'per_phase',
            /*score(points: number) {
                if (game_state === 'auto') {
                    game_state = 'teleop';
                    for (const score of scoring) {
                        state.points += points
                        return state;
                }                                           
                }
                actions.push(structuredClone(state));
                state.climb['climb1'] = true;
                state.points += points;
                return state;*/
            score(points: number) {
                actions.push(structuredClone(state));
                state.points += points;
                return state;
            }
        }
// issue with fuel points not showing up?
    ],
    
    end: [
        {
            name: 'Climb Level 1',
            points: 10,
            score(points: number) {
                if (game_state === 'auto') {
                    game_state = 'teleop';
                    for (const score of scoring) {
                        state.scoring[score] = {
                            amount: 0,
                            points: 0
                        };
                    }
                }
                state.end['Climb Level 1'] = true;
                state.points += points;
                return state;
            }
        },
        {
            name: 'Climb Level 2',
            points: 20,
            score(points: number) {
                if (game_state === 'auto') {
                    game_state = 'teleop';
                    for (const score of scoring) {
                        state.scoring[score] = {
                            amount: 0,
                            points: 0
                        };
                    }
                }
                state.end['Climb Level 2'] = true;
                state.points += points;
                return state;
            }
        },
        {
            name: 'Climb Level 3',
            points: 30,
            score(points: number) {
                if (game_state === 'auto') {
                    game_state = 'teleop';
                    for (const score of scoring) {
                        state.scoring[score] = {
                            amount: 0,
                            points: 0
                        };
                    }
                }
                actions.push(structuredClone(state));
                state.end['Climb Level 3'] = true;
                state.points += points;
                return state;
            }
        }
    ],
// not using park as of rn; reference
    park: {
        name: 'park',
        points: 2,
        score(points: number) {
            if (game_state === 'auto') {
                game_state = 'teleop';
                for (const score of scoring) {
                    state.scoring[score] = {
                        amount: 0,
                        points: 0
                    };
                }
            }
            actions.push(structuredClone(state));
            state.park = true;
            state.points += points;
            return state;
        }
    },
questions: [
    {
        name: 'Defense',
        toggle: 'False',
    },
    {
        name: 'Offense',
        toggle: 'False',

    }
],
} as const satisfies Config;
state = {
    assists,
    charged,
    points: 0,
    climb1: false,
    park: false,
    end: Object.fromEntries(config.end.map(({ name }) => [name, false])),
    questions: Object.fromEntries(config.questions.map(({ name }) => [name, false])),
    scoring: Object.fromEntries(
        config.scoring.map(({ name }) => [
            name,
            {
                amount: 0,
                points: 0
            }
        ])
    )
};
scoring = config.scoring.map(({ name }) => name);
end = config.end.map(({ name }) => name);
export default config;