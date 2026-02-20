<script lang="ts">
    type Point = {
        x: number;
        y: number;
    };
    const {
        data,
        width = 300,
        height = 150,
        spacing = {
            x: 6,
            y: 6
        }
    }: {
        data: Point[];
        width?: number;
        height?: number;
        spacing?: Point;
    } = $props();
    let x_points = $state(spacing.x);
    let y_points = $state(spacing.y);
    const min_x = $derived(Math.min(...data.map(({ x }) => x)));
    const max_x = $derived(Math.max(...data.map(({ x }) => x)));
    const min_y = $derived(Math.min(...data.map(({ y }) => y)));
    const max_y = $derived(Math.max(...data.map(({ y }) => y)));
    const points = $derived(
        merge_array(
            data.map(({ x, y }) => [
                (x * (width + 13.5)) / (max_x - min_x) + 1.5,
                height - (y * height) / (max_y - min_y) - 1.5
            ])
        )
    );

    function merge_array<T>(arr: T[]): T[][] {
        let a: T[][] = [];
        let c: T[] = [];
        arr.forEach((x: T, i: number) => {
            switch (i % 2) {
                case 0:
                    c.push(x);
                    if (c.length === 2) {
                        a.push(c);
                        c = [x];
                    }
                    break;
                case 1:
                    c.push(x);
                    a.push(c);
                    c = [x];
                    break;
            }
        });
        if (c.length === 1) {
            c.push(c[0]);
        }
        if (c.length > 0) a.push(c);
        return a;
    }

    function generate_array(start: number, stop: number, cardinality: number): number[] {
        var arr = [];
        var step = (stop - start) / (cardinality - 1);
        for (var i = 0; i < cardinality; i++) {
            arr.push(start + step * i);
        }
        return arr.map(e => Math.round(e * 10) / 10);
    }

    const divide_y = $derived(generate_array(min_y, max_y, y_points));
    const divide_x = $derived(generate_array(min_x, max_x, x_points));
</script>

<div>
    <svg
        width={width + 15}
        {height}
        style:padding-top={15}
        style:--minor-length="calc(100% / {max_x + 15})"
        style:--major-length="calc(1000% / {max_x + 15})"
        style:--minor-height="calc(100% / {max_y + 15})"
        style:--major-height="calc(1000% / {max_y + 15})"
    >
        <line x1="0" x2={width + 15} y1={height} y2={height}></line>
        <g class="x" transform="translate(0,{height + 20})">
            {#each divide_x as x, i}
                <text x={(x * width) / (max_x - min_x)}>{x}</text>
            {/each}
        </g>
        <line x1="0" x2="0" y1="-15" y2={height}></line>
        <g class="y" transform="translate(-10,0)">
            {#each divide_y as y, i}
                <text y={height - (y * height) / (max_y - min_y)}>{y}</text>
            {/each}
        </g>
        {#each points as [[x1, y1], [x2, y2]], i}
            <line {x1} {x2} {y1} {y2} style="stroke:#135fef; stroke-width:1.5"></line>
        {/each}
    </svg>
</div>

<style>
    svg {
        margin: 3em;
        --line-color: rgba(255 255 255 / 0.1);
        --line-thickness: 1px;
        --minor-length: calc(100% / 50);
        --minor-height: calc(100% / 50);
        --major-length: calc(1000% / 50);
        --major-height: calc(1000% / 50);
        --line: var(--line-color) 0 var(--line-thickness);
        --small-length: transparent var(--line-thickness) var(--minor-length);
        --small-height: transparent var(--line-thickness) var(--minor-height);
        --large-length: transparent var(--line-thickness) var(--major-length);
        --large-height: transparent var(--line-thickness) var(--major-height);
        --small-squares:
            repeating-linear-gradient(to bottom, var(--line), var(--small-height)),
            repeating-linear-gradient(to right, var(--line), var(--small-length));
        --large-squares:
            repeating-linear-gradient(to bottom, var(--line), var(--large-height)),
            repeating-linear-gradient(to right, var(--line), var(--large-length));
        padding: 0;
        height: 100%;
        background-color: transparent;
        background-image: var(--small-squares), var(--large-squares);
        overflow: visible;
    }

    text {
        /*font-family:Inter,sans-serif;*/
        fill: white;
    }
    @media (prefers-color-scheme: light) {
        text {
            fill: black;
        }
        line {
            stroke: black;
        }
        svg {
            --line-color: black;
        }
    }
    @media (prefers-color-scheme: dark) {
        text {
            fill: white;
        }
        line {
            stroke: white;
        }
        svg {
            --line-color: rgba(255 255 255 / 0.1);
        }
    }

    line {
        fill: none;
        stroke: white;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .x text {
        text-anchor: middle;
    }

    .y text {
        text-anchor: end;
        /* dominant-baseline: middle; */
    }
</style>
