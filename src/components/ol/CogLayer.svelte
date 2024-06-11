<script lang="ts">
  import WebGLTile from "ol/layer/WebGLTile";
  import GeoTIFF from "ol/source/GeoTIFF";
  import { getRenderPixel } from "ol/render.js";
  import { getMapContext } from "./context";
  import { onDestroy } from "svelte";
  export let url: string;
  export let zIndex: number = 0;
  export let visible: boolean;
  export let opacity = 1;
  export let loading = false;
  export let isSwipeLayer: "one" | "two" | undefined = undefined;

  const {
    map: mapInstance,
    renderComplete,
    layerSwipeActive,
    layerSwipeDirection,
    layerSwipeValue,
    mapWidth,
    mapHeight,
  } = getMapContext();

  const cogSource = new GeoTIFF({
    sources: [
      {
        url: url,
      },
    ],
  });

  let tileLoadCount = 0;
  $: if (tileLoadCount == 0) {
    loading = false;
  } else {
    loading = true;
  }

  cogSource.on("tileloadstart", () => {
    tileLoadCount++;
  });
  cogSource.on("tileloadend", () => {
    tileLoadCount--;
  });
  cogSource.on("tileloaderror", () => {
    tileLoadCount--;
  });

  const cogLayer = new WebGLTile({
    source: cogSource,
    visible,
    zIndex,
  });

  $: cogLayer.setZIndex(zIndex);
  $: {
    cogLayer.setVisible(visible);
    $mapInstance?.render();
  }
  $: cogLayer.setOpacity(opacity);

  cogLayer.on("prerender", function (event) {
    const gl = event.context as WebGLRenderingContext;
    if ($renderComplete) {
      $renderComplete = false;
      // gl.disable(gl.SCISSOR_TEST);
      // gl.scissor(0, 0, $mapWidth, $mapHeight);
      // gl.clearColor(0, 0, 0, 0);
      // gl.clear(gl.COLOR_BUFFER_BIT);
      // console.log(`CLEAR ${zIndex}`);
    }

    if (isSwipeLayer && $layerSwipeActive) {
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.SCISSOR_TEST);

      if ($layerSwipeDirection == "vertical") {
        const swipeWidth = Math.round($mapWidth * $layerSwipeValue.x);

        if (isSwipeLayer == "one") {
          gl.scissor(0, 0, swipeWidth, $mapHeight);
          gl.clear(gl.COLOR_BUFFER_BIT);
        } else {
          gl.scissor(swipeWidth, 0, $mapWidth - swipeWidth, $mapHeight);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
      } else {
        const swipeHeight = Math.round($mapHeight * (1 - $layerSwipeValue.y));

        if (isSwipeLayer == "one") {
          gl.scissor(0, swipeHeight, $mapWidth, $mapHeight - swipeHeight);
          gl.clear(gl.COLOR_BUFFER_BIT);
        } else {
          gl.scissor(0, 0, $mapWidth, swipeHeight);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
      }
    }
  });

  cogLayer.on("postrender", function (event) {
    if (isSwipeLayer && $layerSwipeActive) {
      const gl = event.context as WebGLRenderingContext;
      gl.disable(gl.SCISSOR_TEST);
    }
  });

  $mapInstance?.addLayer(cogLayer);

  onDestroy(() => {
    $mapInstance?.removeLayer(cogLayer);
  });
</script>
