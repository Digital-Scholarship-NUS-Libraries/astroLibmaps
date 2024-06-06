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

  let interfaceOffset = 0;

  const toggleInterface = () => {
    if (interfaceOffset == 0) {
      interfaceOffset = 1;
    } else {
      interfaceOffset = 0;
    }
  };

  const { layerSwipeActive, layerSwipeDirection, isFullscreen } =
    getMapContext();

  const sortList = (ev: CustomEvent) => {
    mapsInfo = ev.detail;
  };
</script>

<Swipe />
{#if $isFullscreen}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute top-4 right-4 h-8 lg:h-12"
    viewBox="0 0 225.591 60"
  >
    <title>NUS Libraries</title>
    <use xlink:href="/NUSLlogo.svg#nusllogo" />
  </svg>
{/if}
<div
  id="interfaceButton"
  style="--offset:{-800 * (1 - interfaceOffset) + 'px'}"
  class="absolute top-52 left-[var(--offset)] sm:top-40 lg:top-4 p-4 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
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
  id="interface"
  style="--offset:{-800 * interfaceOffset + 'px'};"
  class="max-h-[calc(100vh-14rem)] sm:max-h-[calc(100vh-11rem)] lg:max-h-[calc(100vh-2rem)] overflow-scroll p-4 my-4 absolute top-48 left-[var(--offset)] sm:top-36 lg:top-0 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
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
    <a href="/about">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        class="h-6 mr-4 fill-current opacity-70 hover:opacity-100"
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
    <label class="swap ml-4">
      <input
        type="checkbox"
        id="layerswipe"
        name="layerswipe"
        bind:checked={$layerSwipeActive}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 640 512"
        class="h-5 swap-off fill-current !opacity-40"
        class:scale-0={$layerSwipeActive}
        class:rotate-90={$layerSwipeDirection == "vertical"}
      >
        <title>Toggle visibility</title>
        <use xlink:href="/scissor.svg#scissor" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 576 512"
        class="h-5 swap-on fill-current"
        class:rotate-90={$layerSwipeDirection == "vertical"}
      >
        <title>Toggle visibility</title>
        <use xlink:href="/scissor.svg#scissor" />
      </svg>
    </label>
  </div>
  {#if $layerSwipeActive}
    <div class="h-12 mt-2 pr-6 flex items-center" transition:slide>
      <div class="grow" />
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
    </div>
  {/if}
  <!-- <SortableList -->
  <!--   list={mapsInfo} -->
  <!--   key="cogurl" -->
  <!--   on:sort={sortList} -->
  <!--   let:item -->
  <!--   let:index -->
  <!-- > -->
  <ul class="menu">
    {#each mapsInfo as item, index}
      <li>
        <MapItem {item} mapZIndex={mapsInfo.length - index} />
      </li>
    {/each}
  </ul>
  <!-- </SortableList> -->
</div>
