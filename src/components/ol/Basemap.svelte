<script lang="ts">
  import Tile from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
  import { getMapContext } from "./context";

  const { map: mapInstance } = getMapContext();

  const osmLayer = new Tile({
    source: new OSM(),
    zIndex: -2,
  });

  $mapInstance?.addLayer(osmLayer);
</script>
