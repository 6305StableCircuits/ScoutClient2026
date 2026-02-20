<script lang="ts">
    import type { Snippet } from 'svelte';
    import Button from '$lib/components/Button.svelte';
    import { split_parts } from '$lib';
    interface Props<T> {
        list?: T[];
        length?: number;
        item: Snippet<[T, number]>;
        head?: Snippet;
        table?: boolean;
    }
    const { list = [], length = 10, item, head, table = false }: Props<any> = $props();
    let page = $state(0);
    const parts = $derived(split_parts(list, length));
    $inspect(parts[page]);
    function decrement() {
        if (page - 1 in parts) {
            page--;
        }
    }
    function increment() {
        if (page + 1 in parts) {
            page++;
        }
    }
    let head_tag = $state('span');
    let main_tag = $state('span');
    //eval('$$anchor')?.tagName === "TABLE"
    if (table) {
        head_tag = 'thead';
        main_tag = 'table';
    }
</script>

<span>
    <Button onclick={decrement}>🞀</Button>&nbsp;
    {page}&nbsp;<Button onclick={increment}>🞂</Button>
</span><br />
<svelte:element this={main_tag}>
    <svelte:element this={head_tag}>
        {@render head?.()}
    </svelte:element>
    <svelte:element this={head_tag ? 'tbody' : 'span'}>
        {#each parts[page] as part, i}
            {@render item?.(part, i)}
        {/each}
    </svelte:element>
</svelte:element>
