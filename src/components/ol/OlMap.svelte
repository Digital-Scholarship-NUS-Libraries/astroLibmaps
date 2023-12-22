<script lang="ts">
  import "ol/ol.css";
  import Map from "ol/Map";
  import { useGeographic } from "ol/proj";
  import View from "ol/View";
  import Attribution from "ol/control/Attribution";
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
    layerSwipeActive,
    layerSwipeDirection,
  } = createMapContext();

  onMount(() => {
    useGeographic();
    const attribution = new Attribution({});
    $mapInstance = new Map({
      target: mapId,
      layers: [],
      view: new View({
        center: [lon, lat],
        zoom,
        minZoom,
        maxZoom,
        extent: [103.130035, 0.822573, 104.801331, 1.724593],
        enableRotation: false,
      }),
      controls: [attribution],
    });

    $mapInstance.on("rendercomplete", () => {
      $renderComplete = true;
    });

    swipeCutThreshold.subscribe(() => $mapInstance?.render());
    layerSwipeActive.subscribe(() => $mapInstance?.render());
    layerSwipeDirection.subscribe(() => $mapInstance?.render());
  });
</script>

<div id={mapId} class="h-screen">
  {#if !!$mapInstance}
    <slot />
  {/if}
</div>
