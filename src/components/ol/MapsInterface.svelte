<script lang="ts">
  import { slide } from "svelte/transition";
  import MapItem from "./MapItem.svelte";
  import Zoom from "./Zoom.svelte";
  import Geolocation from "./Geolocation.svelte";
  import Fullscreen from "./Fullscreen.svelte";
  import Swipe from "./Swipe.svelte";
  import { getMapContext } from "./context";
  import type { cog } from "./types.ts";
  import { onMount } from "svelte";

  export let mapsInfo: cog[];

  let swipeLayerOne: cog;
  let swipeLayerTwo: cog;
  let swipeLayersOpacity = 1;

  const { layerSwipeActive, layerSwipeDirection, isSwipeLoading } =
    getMapContext();

  let interfaceButton: HTMLDivElement;
  let mapsInterface: HTMLDivElement;
  const toggleInterface = () => {
    interfaceButton.classList.toggle("left-[-800px]");
    interfaceButton.classList.toggle("left-0");
    mapsInterface.classList.toggle("left-[-800px]");
    mapsInterface.classList.toggle("left-0");
  };
  onMount(() => {
    setTimeout(toggleInterface, 1200);
  });
</script>

<Swipe {swipeLayerOne} {swipeLayerTwo} {swipeLayersOpacity} />
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="absolute top-8 right-4 h-8 lg:h-12"
  viewBox="0 0 279 60"
>
  <title>NUS Libraries</title>
  <use xlink:href="/NUSLlogoL.svg#nusllogo" />
</svg>
<div
  bind:this={interfaceButton}
  id="interfaceButton"
  class="absolute top-44 left-0 p-4 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
>
  <button
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    aria-label="Toggle interface"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      class="h-8 fill-current opacity-70 hover:opacity-100"
    >
      <use xlink:href="/layers.svg#layers" />
    </svg>
  </button>
</div>
<div
  bind:this={mapsInterface}
  id="interface"
  class="max-h-[calc(100vh-12rem)] overflow-scroll my-4 absolute top-40 left-[-800px] rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
>
  <div class="flex items-center px-4 pt-4">
    <span class="grow mr-14">
      <button
        on:click={toggleInterface}
        on:keydown={toggleInterface}
        aria-label="Hide interface"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="h-8 fill-current opacity-70 hover:opacity-100"
        >
          <use xlink:href="/xmark.svg#xmark" />
        </svg>
      </button>
    </span>
    <a href="/about">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        class="h-6 mr-4 mb-1 fill-current opacity-70 hover:opacity-100"
      >
        <title>Information</title>
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
        />
      </svg>
    </a>
    <Geolocation />
    <Fullscreen />
    <Zoom />
    <label class="swap ml-4 mb-1">
      <input
        type="checkbox"
        id="layerswipe"
        name="layerswipe"
        bind:checked={$layerSwipeActive}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="h-6 swap-on fill-current"
        class:rotate-90={$layerSwipeDirection == "horizontal"}
      >
        <title>Toggle swipe layer</title>
        <use xlink:href="/noun-split-4453312.svg#split" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="h-6 swap-off fill-current opacity-70 hover:!opacity-100"
        class:rotate-90={$layerSwipeDirection == "horizontal"}
      >
        <title>Toggle swipe layer</title>
        <use xlink:href="/noun-split-4453312.svg#split" />
      </svg>
    </label>
  </div>
  {#if $layerSwipeActive}
    <div class="mt-2 mx-4" transition:slide>
      <div class="flex items-center">
        <fieldset class="join">
          <input
            type="radio"
            id="vertical"
            name="layerswipe"
            value="vertical"
            class="join-item btn btn-ghost checked:!btn-ghost checked:!btn-active"
            aria-label="Vertical"
            bind:group={$layerSwipeDirection}
          />
          <input
            type="radio"
            id="horizontal"
            name="layerswipe"
            value="horizontal"
            class="join-item btn btn-ghost checked:!btn-ghost checked:!btn-active"
            aria-label="Horizontal"
            bind:group={$layerSwipeDirection}
          />
        </fieldset>
        <span
          class="inline-block loading loading-spinner loading-md ml-4 transition-opacity"
          class:opacity-0={!$isSwipeLoading}
        />
      </div>
      <span class="flex mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="h-5 mr-2 fill-base-content"
        >
          <title>Opacity</title>
          <path
            d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
          />
        </svg>
        <input
          type="range"
          class="range range-sm"
          id="transparency"
          name="transparency"
          min={0}
          max={1}
          step={0.01}
          bind:value={swipeLayersOpacity}
          draggable="true"
          on:dragstart|preventDefault|stopPropagation
        />
      </span>
      <label class="form-control">
        <select
          bind:value={swipeLayerOne}
          class="mt-4 select select-ghost select-bordered"
        >
          <option selected>No first layer selected</option>
          {#each mapsInfo as item}
            <option value={item}>{item.shortname}</option>
          {/each}
        </select>
      </label>
      <label class="form-control">
        <select
          bind:value={swipeLayerTwo}
          class="mt-4 select select-ghost select-bordered"
        >
          <option selected>No second layer selected</option>
          {#each mapsInfo as item}
            <option value={item}>{item.shortname}</option>
          {/each}
        </select>
      </label>
    </div>
  {/if}
  <ul class="menu px-0">
    {#each mapsInfo as item, index}
      <li class="mx-0">
        <MapItem {item} mapZIndex={mapsInfo.length - index} />
      </li>
    {/each}
  </ul>
</div>
