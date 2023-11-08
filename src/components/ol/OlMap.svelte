<script lang="ts">
  import "ol/ol.css";
  import Map from "ol/Map";
  import { useGeographic } from "ol/proj";
  import View from "ol/View";
  import { onMount } from "svelte";
  import { createMapContext } from "./context";

  // Exports
  export let lat: number;
  export let lon: number;
  export let zoom: number;
  export let minZoom: number = 0;
  export let maxZoom: number = 28;

  let mapId = "olmap";

  const {
    map: mapInstance,
    renderComplete,
    swipeCutThreshold,
    layerSwipeStatus,
  } = createMapContext();

  onMount(() => {
    useGeographic();
    $mapInstance = new Map({
      target: mapId,
      layers: [],
      view: new View({
        center: [lon, lat],
        zoom,
        minZoom,
        maxZoom,
        extent: [103.130035, 0.822573, 104.801331, 1.724593],
      }),
      controls: [],
    });

    $mapInstance.on("rendercomplete", () => {
      $renderComplete = true;
    });

    swipeCutThreshold.subscribe(() => $mapInstance.render());
    layerSwipeStatus.subscribe(() => $mapInstance.render());
  });
</script>

<div id={mapId} class="map">
  {#if !!$mapInstance}
    <slot />
  {/if}
</div>

<style>
  .map {
    height: 100vh;
  }

  :global(.layer-visibility) {
    position: unset;
    width: fit-content;
    margin-top: 0.3em;
    margin-right: 1em;
  }
  :global(.layer-visibility button) {
    width: auto;
  }
</style>
