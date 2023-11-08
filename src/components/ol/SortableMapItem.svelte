<script lang="ts">
  import { slide } from "svelte/transition";
  import type { cog } from "./types";
  import { getMapContext } from "./context";
  import CogLayer from "./CogLayer.svelte";
  export let item: cog;
  export let mapZIndex: number;
  export let index: number;
  let load = false;
  let visible = false;
  let opacity = 1;
  let layerExtent: number[];

  const {
    map: mapInstance,
    layerSwipeStatus,
    swipeCutThreshold,
  } = getMapContext();
  const zoomToLayer = () => {
    $mapInstance?.getView().fit(layerExtent, { duration: 300 });
  };
</script>

<span
  on:pointerenter|once={() => (load = true)}
  class="cursor-grab hover:cursor-grabbing flex"
>
  <label class="swap">
    <input
      type="checkbox"
      id="visibility"
      name="visibility"
      bind:checked={visible}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 640 512"
      class="swap-off fill-base-content"
      fill="#777"
    >
      <title>Hide</title>
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      class="swap-on fill-accent-content"
    >
      <title>Show</title>
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
      />
    </svg>
  </label>
  <span class="grow">{item.name}</span>
  <input
    type="radio"
    class="radio radio-sm {mapZIndex >= $swipeCutThreshold
      ? 'bg-base-300'
      : ''}  checked:bg-base-300"
    disabled={$layerSwipeStatus === "none"}
    id="swipeValue{mapZIndex}"
    name="swipeCutThreshold"
    value={mapZIndex}
    bind:group={$swipeCutThreshold}
  />
  <button class="m-1" on:click={zoomToLayer} on:keydown={zoomToLayer}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
      class="fill-base-content"
    >
      <title>Zoom To Layer</title>
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"
      />
    </svg>
  </button>
  <a
    href="/metadata/{item.url.split('/').pop()}/"
    draggable="true"
    on:dragstart|preventDefault|stopPropagation
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="fill-base-content hover:fill-accent-content"
    >
      <title>Information</title>
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
      />
    </svg>
  </a>
</span>
{#if visible}
  <transparencyslider class="ml-7" transition:slide>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="fill-base-content"
    >
      <title>Opacity</title>
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
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
  <CogLayer
    url={item.url}
    zIndex={mapZIndex}
    {visible}
    {opacity}
    bind:layerExtent
  />
{/if}
