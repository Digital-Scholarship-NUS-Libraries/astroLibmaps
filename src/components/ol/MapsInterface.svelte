<script lang="ts">
  import SortableList from "./SortableList.svelte";
  import SortableMapItem from "./SortableMapItem.svelte";
  import Swipe from "./Swipe.svelte";
  import { getMapContext } from "./context";

  export let mapsInfo;

  let interfaceOffset = 0;
  let cogsList = mapsInfo;

  const toggleInterface = () => {
    if (interfaceOffset == 0) {
      interfaceOffset = 1;
    } else {
      interfaceOffset = 0;
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
  style="--offset:{-800 * (1 - interfaceOffset) + 'px'}"
  class="absolute top-52 left-[var(--offset)] sm:top-40 md:top-4 p-4 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    role="button"
    tabindex="0"
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    class="h-10 fill-current"
  >
    <use xlink:href="/layers.svg#layers" />
  </svg>
</div>
<div
  id="interface"
  style="--offset:{-800 * interfaceOffset + 'px'};"
  class="max-h-[calc(100vh-14rem)] sm:max-h-[calc(100vh-11rem)] md:max-h-[calc(100vh-2rem)] overflow-scroll p-4 my-4 absolute top-48 left-[var(--offset)] sm:top-36 md:top-0 rounded-r-lg backdrop-blur-md bg-base-100/80 transition-all ease-in-out"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    role="button"
    tabindex="0"
    on:click={toggleInterface}
    on:keydown={toggleInterface}
    class="h-10 fill-current"
  >
    <use xlink:href="/xmark.svg#xmark" />
  </svg>
  <div class="mt-4 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      class="h-5 ml-1 mr-4 fill-current"
      class:opacity-30={$layerSwipeStatus == "none"}
      class:rotate-90={["vertical", "none"].includes($layerSwipeStatus)}
    >
      <use xlink:href="/scissor.svg#scissor" />
    </svg>
    <fieldset class="join">
      <input
        type="radio"
        id="none"
        name="layerswipe"
        value="none"
        class="join-item btn btn-ghost checked:!btn-ghost checked:!btn-active"
        aria-label="None"
        checked
        bind:group={$layerSwipeStatus}
      />
      <input
        type="radio"
        id="vertical"
        name="layerswipe"
        value="vertical"
        class="join-item btn btn-ghost checked:!btn-ghost checked:!btn-active"
        aria-label="Vertical"
        bind:group={$layerSwipeStatus}
      />
      <input
        type="radio"
        id="horizontal"
        name="layerswipe"
        value="horizontal"
        class="join-item btn btn-ghost checked:!btn-ghost checked:!btn-active"
        aria-label="Horizontal"
        bind:group={$layerSwipeStatus}
      />
    </fieldset>
  </div>
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
