<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import SortableList from "./SortableList.svelte";
  import SortableMapItem from "./SortableMapItem.svelte";
  import Swipe from "./Swipe.svelte";
  import { getMapContext } from "./context";

  export let mapsInfo;

  const interfaceOffset = tweened(0, { duration: 300, easing: cubicInOut });
  let cogsList = mapsInfo;

  const toggleInterface = () => {
    if ($interfaceOffset == 0) {
      $interfaceOffset = 1;
    } else {
      $interfaceOffset = 0;
    }
  };

  const { swipeCutThreshold, layerSwipeStatus } = getMapContext();
  $swipeCutThreshold = cogsList.length;

  const sortList = (ev: Event) => {
    cogsList = ev.detail;
  };
</script>

<Swipe />
<div
  id="interfaceButton"
  style="--offset:{1 - $interfaceOffset}"
  class="absolute top-52 md:top-4 p-4 rounded-r-lg backdrop-blur-md bg-base-100/80"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    role="button"
    tabindex="0"
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    class="h-12 fill-current"
  >
    <use xlink:href="/layers.svg#layers" />
  </svg>
</div>
<div
  id="interface"
  style="--offset:{$interfaceOffset};"
  class="max-h-[calc(100vh-14rem)] md:max-h-[calc(100vh-2rem)] overflow-scroll p-4 my-4 absolute top-48 md:top-0 rounded-r-lg backdrop-blur-md bg-base-100/80"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    role="button"
    tabindex="0"
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    class="h-12 fill-current"
  >
    <use xlink:href="/xmark.svg#xmark" />
  </svg>
  <fieldset>
    <legend>Layer swipe</legend>
    <input
      type="radio"
      id="none"
      name="layerswipe"
      value="none"
      checked
      bind:group={$layerSwipeStatus}
    />
    <label for="none">None</label>
    <input
      type="radio"
      id="vertical"
      name="layerswipe"
      value="vertical"
      bind:group={$layerSwipeStatus}
    />
    <label for="vertical">Vertical</label>
    <input
      type="radio"
      id="horizontal"
      name="layerswipe"
      value="horizontal"
      bind:group={$layerSwipeStatus}
    />
    <label for="horizontal">Horizontal</label>
  </fieldset>
  <SortableList
    list={cogsList}
    key="cogurl"
    on:sort={sortList}
    let:item
    let:index
  >
    <SortableMapItem {item} mapZIndex={cogsList.length - index} />
  </SortableList>
</div>

<style>
  #interfaceButton {
    left: calc(var(--offset) * -800px);
  }
  #interface {
    left: calc(var(--offset) * -800px);
  }
</style>
