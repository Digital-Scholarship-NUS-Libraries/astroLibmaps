<script lang="ts">
  import type { cog } from "./types";
  import { getMapContext } from "./context";
  import { draggable } from "@neodrag/svelte";
  import { fade } from "svelte/transition";
  import CogLayer from "./CogLayer.svelte";

  export let swipeLayerOne: cog;
  export let swipeLayerTwo: cog;
  export let swipeLayersOpacity = 1;

  let loadingLayerOne = false;
  let loadingLayerTwo = false;

  const {
    map: mapInstance,
    layerSwipeActive,
    layerSwipeDirection,
    layerSwipeValue,
    isSwipeLoading,
    mapWidth,
    mapHeight,
  } = getMapContext();

  $: $isSwipeLoading = loadingLayerOne || loadingLayerTwo;

  let position = { x: 0, y: 0 };
  const startSwipeValue = $layerSwipeValue;

  layerSwipeActive.subscribe((v) => {
    if (v === false) {
      $layerSwipeValue = startSwipeValue;
    }
  });
</script>

{#if $layerSwipeActive}
  {#if $layerSwipeDirection === "horizontal"}
    <divider
      style="--offset:{$layerSwipeValue.y * $mapHeight - 4 + 'px'};"
      class="absolute top-[var(--offset)] block w-full h-2 backdrop-blur-md bg-base-100/50"
    />
  {:else}
    <divider
      style="--offset:{$layerSwipeValue.x * $mapWidth - 4 + 'px'};"
      class="absolute top-0 left-[var(--offset)] block h-full w-2 backdrop-blur-md bg-base-100/50"
    />
  {/if}
  <swipeContainer
    class="absolute top-0 h-full w-full pointer-events-none grid place-items-center"
  >
    <swipe
      class="w-12 h-12 rounded-lg grid place-items-center [pointer-events:initial] backdrop-blur-md bg-base-100/50 hover:bg-base-100/70"
      use:draggable={$layerSwipeDirection == "vertical"
        ? { axis: "x" }
        : { axis: "y" }}
      class:cursor-ns-resize={$layerSwipeDirection == "horizontal"}
      class:cursor-ew-resize={$layerSwipeDirection != "horizontal"}
      on:neodrag={(e) => {
        position = { x: e.detail.offsetX, y: e.detail.offsetY };
        $layerSwipeValue = {
          x: startSwipeValue.x + e.detail.offsetX / $mapWidth,
          y: startSwipeValue.y + e.detail.offsetY / $mapHeight,
        };
        $mapInstance?.render();
      }}
      transition:fade={{ duration: 250 }}
    >
      {#if $layerSwipeDirection === "horizontal"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          class="fill-base-content"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          class="fill-base-content"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"
          />
        </svg>
      {/if}
    </swipe>
  </swipeContainer>
  {#if !!swipeLayerOne?.cogurl}
    {#key swipeLayerOne}
      <CogLayer
        url={swipeLayerOne.cogurl}
        isSwipeLayer="one"
        secondLayerIsDefined={!!swipeLayerTwo?.cogurl}
        zIndex={201}
        visible={true}
        opacity={swipeLayersOpacity}
        bind:loading={loadingLayerOne}
      />
    {/key}
  {/if}
  {#if !!swipeLayerTwo?.cogurl}
    {#key swipeLayerTwo}
      <CogLayer
        url={swipeLayerTwo.cogurl}
        isSwipeLayer="two"
        zIndex={200}
        visible={true}
        opacity={swipeLayersOpacity}
        bind:loading={loadingLayerTwo}
      />
    {/key}
  {/if}
{/if}
