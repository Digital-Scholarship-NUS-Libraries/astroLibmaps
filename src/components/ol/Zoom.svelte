<script lang="ts">
  import { easeOut } from "ol/easing";
  import { getMapContext } from "./context";

  const { map: mapInstance } = getMapContext();

  const zoom = (delta) => {
    const view = $mapInstance?.getView();
    if (!view) {
      return;
    }
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta);
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      view.animate({
        zoom: newZoom,
        duration: 300,
        easing: easeOut,
      });
    }
  };

  const handleZoomIn = () => {
    zoom(1);
  };
  const handleZoomOut = () => {
    zoom(-1);
  };
</script>

<button
  on:click={handleZoomIn}
  on:keydown={handleZoomIn}
  class="mr-3"
  aria-label="Zoom in"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    class="h-5 fill-current opacity-70 hover:opacity-100"
  >
    <title>Zoom in</title>
    <use xlink:href="/zoomIn.svg#zoomIn" />
  </svg>
</button>
<button
  on:click={handleZoomOut}
  on:keydown={handleZoomOut}
  class=""
  aria-label="Zoom out"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    class="h-5 fill-current opacity-70 hover:opacity-100"
  >
    <title>Zoom out</title>
    <use xlink:href="/zoomOut.svg#zoomOut" />
  </svg>
</button>
