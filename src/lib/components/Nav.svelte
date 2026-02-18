<script lang="ts">
    import { frc_year, uppercase, path_entries, is_current_path } from '$lib';
    import { page } from '$app/state';
    import NavMenu from '$lib/components/NavMenu.svelte';
    import Link from '$lib/components/Link.svelte';
    //     type $state<T> = T;
    // onMount(()=>{
    //     let landScapeStyle = getComputedStyle(landscape!);
    //     if(landScapeStyle.display === "none"){
    //         landscape!.remove();
    //     }else{
    //         portrait!.remove();
    //     }
    // })
</script>

<main
    class="justify-between flex max-h-16 px-10 content-center text-center px-10 m-auto bg-gray-800 w-[100.475vw] ml-[-10px]"
>
    <h1 class="text-[2em] pt-2 text-nowrap">ScoutClient {frc_year}</h1>
    <span
        class="landscape flex justify-between content-center text-center px-10 w-[75vw]"
    >
        {#key page.url.pathname}
            {#each path_entries as [title, path]}
                <span class="text-lg pt-4 pb-0">
                    {#if is_current_path(path)}
                        <span class="cursor-not-allowed text-white">{uppercase(title ?? '')}</span>
                    {:else}
                        <Link url={path} class="text-white">{uppercase(title ?? '')}</Link>
                    {/if}&nbsp;
                </span>
            {/each}
            &nbsp;<Link class="pt-4 pb-0" url="/settings"
                ><enhanced:img
                    src="../assets/settings.svg"
                    class="settings-icon"
                    alt="settings"
                    style="width: 24px"
                /></Link
            >
        {/key}
    </span>
    <span class="portrait">
        <div class="float-right flex absolute right-[5%] pt-3 pointer z-50">
            <Link url="/settings" class="float-left pt-1 pb-0"
                ><enhanced:img
                    src="../assets/settings.svg"
                    class="settings-icon"
                    alt="settings"
                    style="width: 24px"
                /></Link
            >&nbsp;
            <NavMenu />
        </div>
    </span>
</main>

<style>
    @media screen and (orientation: portrait) {
        .landscape {
            display: none;
        }
    }
    @media screen and (orientation: landscape) {
        .portrait {
            display: none;
        }
    }
    .settings-icon {
        transition: filter 0.2s ease-in;
        &:hover {
            filter: brightness(0.75);
            transition: filter 0.2s ease-out;
        }
    }
</style>
