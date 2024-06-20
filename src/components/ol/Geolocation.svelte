<script lang="ts">
  import Feature from "ol/Feature.js";
  import Geolocation from "ol/Geolocation.js";
  import Point from "ol/geom/Point.js";
  import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
  import { Vector as VectorSource } from "ol/source.js";
  import { Vector as VectorLayer } from "ol/layer.js";
  import { getMapContext } from "./context";

  const { map: mapInstance } = getMapContext();

  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
  });

  geolocation.on("error", function (error) {
    window.alert(error.message);
  });

  const accuracyFeature = new Feature();
  geolocation.on("change:accuracyGeometry", () => {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: "#3399CC",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    }),
  );

  geolocation.on("change:position", () => {
    const coordinates = geolocation.getPosition();
    positionFeature.setGeometry(
      coordinates ? new Point(coordinates) : undefined,
    );
  });

  geolocation.on("change:tracking", async () => {
    const navStatus = await navigator.permissions.query({
      name: "geolocation",
    });
    $mapInstance
      ?.getView()
      .animate({ center: geolocation.getPosition(), duration: 300 });
  });

  navigator.permissions
    .query({ name: "geolocation" })
    .then((permissionStatus) => {
      permissionStatus.onchange = () => {
        if (permissionStatus.state == "granted") {
          $mapInstance?.getView().animate({
            center: geolocation.getPosition(),
            duration: 300,
            zoom: 16,
          });
        }
      };
    });

  const handleGeoLocate = async () => {
    if (!geolocation.getTracking()) {
      const navStatus = await navigator.permissions.query({
        name: "geolocation",
      });
      geolocation.setTracking(true);
    } else {
      $mapInstance?.getView().animate({
        center: geolocation.getPosition(),
        duration: 300,
        zoom: 16,
      });
    }
  };

  new VectorLayer({
    map: $mapInstance,
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
    zIndex: 100,
  });
</script>

<button
  on:click={handleGeoLocate}
  on:keydown={handleGeoLocate}
  class="mr-3 mb-1"
  aria-label="Geolocate me"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    class="h-6 fill-current opacity-70 hover:opacity-100"
  >
    <title>Geolocate me</title>
    <use xlink:href="/location.svg#location" />
  </svg>
</button>
