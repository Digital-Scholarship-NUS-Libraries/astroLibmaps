<script>
  import OlMap from "./OlMap.svelte";
  import Basemap from "./Basemap.svelte";
  import MapsInterface from "./MapsInterface.svelte";
  export let mapsInfo;
</script>

<OlMap lat={1.3521} lon={103.8198} zoom={12} minZoom={10} maxZoom={18}>
  <Basemap />
  <MapsInterface {mapsInfo} />
</OlMap>
