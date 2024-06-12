<script lang="ts">
  import { slide } from "svelte/transition";
  import MapItem from "./MapItem.svelte";
  import Zoom from "./Zoom.svelte";
  import Geolocation from "./Geolocation.svelte";
  import Fullscreen from "./Fullscreen.svelte";
  import Swipe from "./Swipe.svelte";
  import { getMapContext } from "./context";
  import type { cog } from "./types.ts";

  export let mapsInfo: cog[];

  let swipeLayerOne: cog;
  let swipeLayerTwo: cog;
  let swipeLayersOpacity = 1;

  let interfaceOffset = 0;

  // const toggleInterface = () => {
  //   if (interfaceOffset == 0) {
  //     interfaceOffset = 1;
  //   } else {
  //     interfaceOffset = 0;
  //   }
  // };

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
  class="absolute top-44 left-[-800px] p-4 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
>
  <button
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    aria-label="Toggle interface"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      class="h-10 fill-current opacity-70 hover:opacity-100"
    >
      <use xlink:href="/layers.svg#layers" />
    </svg>
  </button>
</div>
<div
  bind:this={mapsInterface}
  id="interface"
  class="max-h-[calc(100vh-12rem)] overflow-scroll p-4 my-4 absolute top-40 left-0 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
>
  <div class="flex items-center pr-6">
    <span class="grow">
      <button
        on:click={toggleInterface}
        on:keydown={toggleInterface}
        aria-label="Hide interface"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="h-10 fill-current opacity-70 hover:opacity-100"
        >
          <use xlink:href="/xmark.svg#xmark" />
        </svg>
      </button>
    </span>
    <Geolocation />
    <Fullscreen />
    <Zoom />
    <label class="swap ml-4">
      <input
        type="checkbox"
        id="layerswipe"
        name="layerswipe"
        bind:checked={$layerSwipeActive}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="4em"
        viewBox="0 0 20 20"
        class="h-6 swap-off fill-current !opacity-40"
        class:scale-0={$layerSwipeActive}
        class:rotate-90={$layerSwipeDirection == "horizontal"}
      >
        <title>Toggle swipe layer</title>
        <use xlink:href="/noun-split-4453312.svg#split" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="4em"
        viewBox="0 0 20 20"
        class="h-6 swap-on fill-current"
        class:rotate-90={$layerSwipeDirection == "horizontal"}
      >
        <title>Toggle swipe layer</title>
        <use xlink:href="/noun-split-4453312.svg#split" />
      </svg>
    </label>
  </div>
  {#if $layerSwipeActive}
    <div class="mt-2 ml-2 pr-6" transition:slide>
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
          height="1em"
          viewBox="0 0 512 512"
          class="h-4 mt-0.5 mr-2 fill-base-content"
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
          <option disabled selected>Pick first layer</option>
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
          <option disabled selected>Pick second layer</option>
          {#each mapsInfo as item}
            <option value={item}>{item.shortname}</option>
          {/each}
        </select>
      </label>
    </div>
  {/if}
  <ul class="menu">
    {#each mapsInfo as item, index}
      <li>
        <MapItem {item} mapZIndex={mapsInfo.length - index} />
      </li>
    {/each}
  </ul>
</div>
