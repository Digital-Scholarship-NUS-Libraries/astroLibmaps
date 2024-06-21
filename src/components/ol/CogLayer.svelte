<script lang="ts">
  import WebGLTile from "ol/layer/WebGLTile";
  import GeoTIFF from "ol/source/GeoTIFF";
  import { getMapContext } from "./context";
  import { onDestroy } from "svelte";
  import { getRenderPixel } from "ol/render";
  export let url: string;
  export let zIndex: number = 0;
  export let visible: boolean;
  export let opacity = 1;
  export let loading = false;
  export let isSwipeLayer: "one" | "two" | undefined = undefined;
  export let secondLayerIsDefined = false;

  const {
    map: mapInstance,
    layerSwipeActive,
    layerSwipeDirection,
    layerSwipeValue,
    mapWidth,
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
    if (isSwipeLayer && $layerSwipeActive) {
      gl.clearColor(0, 0, 0, 0);
      if (isSwipeLayer == "two" || !secondLayerIsDefined) {
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.enable(gl.SCISSOR_TEST);

      const topRight = getRenderPixel(event, [$mapWidth, 0]);

      if ($layerSwipeDirection == "vertical") {
        const swipeWidth = Math.round(topRight[0] * $layerSwipeValue.x);

        if (isSwipeLayer == "one") {
          gl.scissor(0, 0, swipeWidth, topRight[1]);
        } else {
          gl.scissor(swipeWidth, 0, topRight[0] - swipeWidth, topRight[1]);
        }
      } else {
        const swipeHeight = Math.round(topRight[1] * (1 - $layerSwipeValue.y));

        if (isSwipeLayer == "one") {
          gl.scissor(0, swipeHeight, topRight[0], topRight[1] - swipeHeight);
        } else {
          gl.scissor(0, 0, topRight[0], swipeHeight);
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
