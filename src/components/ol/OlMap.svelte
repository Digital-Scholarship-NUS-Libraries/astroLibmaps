<script lang="ts">
  import "ol/ol.css";
  import Map from "ol/Map";
  import { useGeographic } from "ol/proj";
  import View from "ol/View";
  import Attribution from "ol/control/Attribution";
  import { onMount } from "svelte";
  import { createMapContext } from "./context";

  export let lat: number;
  export let lon: number;
  export let zoom: number;
  export let minZoom: number = 0;
  export let maxZoom: number = 28;

  let mapId = "olmap";

  const {
    map: mapInstance,
    layerSwipeActive,
    layerSwipeDirection,
    layerSwipeValue,
    mapWidth,
    mapHeight,
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

    [$mapWidth, $mapHeight] = $mapInstance?.getSize() as number[];
    const observer = new ResizeObserver((_) => {
      [$mapWidth, $mapHeight] = $mapInstance?.getSize() as number[];
    });

    observer.observe(document.body);

    layerSwipeActive.subscribe(() => $mapInstance?.render());
    layerSwipeDirection.subscribe(() => $mapInstance?.render());
    layerSwipeValue.subscribe(() => $mapInstance?.render());
  });
</script>

<div id={mapId} class="h-screen">
  {#if !!$mapInstance}
    <slot />
  {/if}
</div>
