<script lang="ts">
  import Tile from "ol/layer/Tile";
  import VectorTile from "ol/layer/VectorTile";
  import OSM from "ol/source/OSM";
  import { PMTilesVectorSource } from "ol-pmtiles";
  import { Style, Stroke, Fill } from "ol/style";
  import { getMapContext } from "./context";

  const { map: mapInstance } = getMapContext();

  const osmLayer = new Tile({
    source: new OSM(),
    zIndex: -2,
  });

  const vectorLayer = new VectorTile({
    declutter: true,
    source: new PMTilesVectorSource({
      url: "https://d39hmjnw8fb16p.cloudfront.net/sg.pmtiles",
      attributions: ["protomaps"],
    }),
    style: new Style({
      stroke: new Stroke({
        color: "gray",
        width: 1,
      }),
      fill: new Fill({
        color: "rgba(200,200,200,0.9)",
      }),
    }),
    zIndex: -3,
  });

  $mapInstance?.addLayer(osmLayer);
  // $mapInstance.addLayer(vectorLayer);
</script>
