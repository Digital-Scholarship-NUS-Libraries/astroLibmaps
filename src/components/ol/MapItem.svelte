<script lang="ts">
  import { slide } from "svelte/transition";
  import type { cog } from "./types";
  import { getMapContext } from "./context";
  import CogLayer from "./CogLayer.svelte";
  export let item: cog;
  export let mapZIndex: number;
  let load = false;
  let visible = false;
  let opacity = 1;
  let loading = false;

  const { map: mapInstance } = getMapContext();
  const zoomToLayer = () => {
    $mapInstance?.getView().fit(item.extent, { duration: 300 });
  };

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-8X7NLQ7Q24");
</script>

<span on:pointerenter|once={() => (load = true)} class="flex">
  <input
    type="checkbox"
    class="checkbox checkbox-sm"
    id="visibility{mapZIndex}"
    name="visibility"
    bind:checked={visible}
    on:change|once={() => {
      gtag("event", item.shortname, {
        event_category: "map_toggle_visibility",
      });
    }}
  />
  <button class="grow text-left" on:click={() => (visible = !visible)}>
    {item.shortname}
  </button>
  <button class="m-1" on:click={zoomToLayer} on:keydown={zoomToLayer}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
      class="h-4 fill-current opacity-70 hover:opacity-100"
    >
      <title>Zoom To Layer</title>
      <use xlink:href="/extent.svg#extent" />
    </svg>
  </button>
  <a href="/maps/{item.slug}">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="h-4 fill-current opacity-70 hover:opacity-100"
    >
      <title>Information</title>
      <use xlink:href="/info.svg#info" />
    </svg>
  </a>
</span>
{#if visible}
  <span
    class="flex hover:bg-transparent focus:bg-transparent active:!bg-transparent"
    transition:slide
  >
    <span
      class="loading loading-spinner loading-sm mr-1 transition-opacity"
      class:opacity-0={!loading}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="h-4 fill-base-content"
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
      bind:value={opacity}
    />
  </span>
{/if}
{#if load}
  <CogLayer
    url={item.cogurl}
    zIndex={mapZIndex}
    {visible}
    {opacity}
    bind:loading
  />
{/if}
