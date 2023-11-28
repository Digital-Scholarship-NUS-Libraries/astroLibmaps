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

  const {
    map: mapInstance,
    layerSwipeStatus,
    swipeCutThreshold,
  } = getMapContext();
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

<span
  on:pointerenter|once={() => (load = true)}
  class="cursor-grab hover:cursor-grabbing flex"
>
  <label class="swap">
    <input
      type="checkbox"
      id="visibility{mapZIndex}"
      name="visibility"
      bind:checked={visible}
      on:change|once={() => {
        gtag("event", "map_toggle_visibility", {
          event_category: "maps",
          event_label: item.shortname,
        });
      }}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 640 512"
      class="h-4 swap-off fill-current !opacity-70"
      class:scale-0={visible}
    >
      <title>Toggle visibility</title>
      <use xlink:href="/eye-slash.svg#eye-slash" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      class="h-4 swap-on fill-current"
    >
      <title>Toggle visibility</title>
      <use xlink:href="/eye.svg#eye" />
    </svg>
  </label>
  <span class="grow">{item.shortname}</span>
  <input
    type="radio"
    class="hidden"
    disabled={$layerSwipeStatus === "none"}
    id="swipeValue{mapZIndex}"
    title="Cut this layer with the layer swipe"
    name="swipeCutThreshold"
    value={mapZIndex}
    bind:group={$swipeCutThreshold}
  />
  <label
    for="swipeValue{mapZIndex}"
    title="Cut this layer with the layer swipe"
    class="w-4 mr-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="h-4 ml-1 mr-4 fill-current transition-all"
      class:opacity-40={mapZIndex < $swipeCutThreshold ||
        $layerSwipeStatus == "none"}
      class:opacity-100={mapZIndex >= $swipeCutThreshold &&
        ["vertical", "horizontal"].includes($layerSwipeStatus)}
      class:rotate-90={["vertical", "none"].includes($layerSwipeStatus)}
      class:cursor-pointer={["vertical", "horizontal"].includes(
        $layerSwipeStatus
      )}
    >
      <use xlink:href="/scissor.svg#scissor" />
    </svg>
  </label>
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
  <a
    href="/maps/{item.slug}"
    draggable="true"
    on:dragstart|preventDefault|stopPropagation
  >
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
  <transparencyslider class="ml-7" transition:slide>
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
      draggable="true"
      on:dragstart|preventDefault|stopPropagation
    />
  </transparencyslider>
{/if}
{#if load}
  <CogLayer url={item.cogurl} zIndex={mapZIndex} {visible} {opacity} />
{/if}
