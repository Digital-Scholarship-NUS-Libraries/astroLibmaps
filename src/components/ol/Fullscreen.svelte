<script lang="ts">
  import { getMapContext } from "./context";

  const { map: mapInstance, isFullscreen } = getMapContext();

  const toggleFullscreen = () => {
    if ($isFullscreen) {
      const element = $mapInstance?.getTargetElement();
      if (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element["webkitRequestFullscreen"]) {
          element["webkitRequestFullscreen"]();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document["webkitExitFullscreen"]) {
        document["webkitExitFullscreen"]();
      }
    }
  };
</script>

<label class="swap mr-[10px]">
  <input
    type="checkbox"
    id="fullscreen"
    name="fullscreen"
    bind:checked={$isFullscreen}
    on:change={toggleFullscreen}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 640 512"
    class="h-4 swap-off fill-current !opacity-70 hover:!opacity-100"
    class:scale-0={$isFullscreen}
  >
    <title>Toggle fullscreen</title>
    <use xlink:href="/maximize.svg#maximize" />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 576 512"
    class="h-4 swap-on fill-current !opacity-70 hover:!opacity-100"
    class:scale-0={!$isFullscreen}
  >
    <title>Toggle fullscreen</title>
    <use xlink:href="/minimize.svg#minimize" />
  </svg>
</label>
