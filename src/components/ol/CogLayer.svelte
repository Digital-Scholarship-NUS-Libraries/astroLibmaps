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

  const {
    map: mapInstance,
    renderComplete,
    swipeCutThreshold,
    layerSwipeStatus,
    layerSwipeValue,
  } = getMapContext();

  const cogSource = new GeoTIFF({
    sources: [
      {
        url: url,
      },
    ],
  });
  const cogLayer = new WebGLTile({
    source: cogSource,
    visible,
    zIndex,
  });

  $: cogLayer.setZIndex(zIndex);
  $: {
    cogLayer.setVisible(visible);
    $mapInstance.render();
  }
  $: cogLayer.setOpacity(opacity);

  cogLayer.on("prerender", function (event) {
    const gl = event.context;
    if ($renderComplete) {
      $renderComplete = false;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    if (zIndex >= $swipeCutThreshold && $layerSwipeStatus != "none") {
      gl.enable(gl.SCISSOR_TEST);

      const mapSize = $mapInstance.getSize();

      const bottomLeft = getRenderPixel(event, [0, mapSize[1]]);
      const topRight = getRenderPixel(event, [mapSize[0], 0]);

      if ($layerSwipeStatus == "vertical") {
        const width = Math.round(
          (topRight[0] - bottomLeft[0]) * $layerSwipeValue.x
        );
        const height = topRight[1] - bottomLeft[1];

        gl.scissor(bottomLeft[0], bottomLeft[1], width, height);
      } else {
        const height = Math.round(
          (topRight[1] - bottomLeft[1]) * (1 - $layerSwipeValue.y)
        );
        const width = topRight[0] - bottomLeft[0];

        gl.scissor(bottomLeft[0], height, width, topRight[1]);
      }
    }
  });

  cogLayer.on("postrender", function (event) {
    if (zIndex >= $swipeCutThreshold && $layerSwipeStatus != "none") {
      const gl = event.context;
      gl.disable(gl.SCISSOR_TEST);
    }
  });

  $mapInstance?.addLayer(cogLayer);

  onDestroy(() => {
    $mapInstance?.removeLayer(cogLayer);
  });
</script>
