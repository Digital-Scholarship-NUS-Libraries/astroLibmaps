<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import SortableList from "./SortableList.svelte";
  import SortableMapItem from "./SortableMapItem.svelte";
  import Swipe from "./Swipe.svelte";
  import { cogs } from "./cogs";
  import { getMapContext } from "./context";

  const interfaceOffset = tweened(0, { duration: 300, easing: cubicInOut });
  let cogsList = cogs;

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
  class="absolute top-40 lg:top-4 p-4 rounded-r-lg backdrop-blur-md bg-base-100/80"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="2em"
    viewBox="0 0 576 512"
    role="button"
    tabindex="0"
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    class="fill-current"
    ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
      d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"
    /></svg
  >
</div>
<div
  id="interface"
  style="--offset:{$interfaceOffset};"
  class="max-h-[calc(100vh-11rem)] lg:max-h-[calc(100vh-2rem)] overflow-scroll p-4 my-4 absolute top-36 lg:top-0 rounded-r-lg backdrop-blur-md bg-base-100/80"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="2em"
    viewBox="0 0 384 512"
    role="button"
    tabindex="0"
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    class="fill-current"
    ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
    /></svg
  >
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
    class="menu menu-sm"
    list={cogsList}
    key="url"
    on:sort={sortList}
    let:item
    let:index
  >
    <SortableMapItem {item} mapZIndex={cogsList.length - index} {index} />
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
