import type Map from "ol/Map";
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export interface MapContext {
  map: Writable<Map | null>;
  renderComplete: Writable<boolean>;
  layerSwipeActive: Writable<boolean>;
  layerSwipeDirection: Writable<"horizontal" | "vertical">;
  layerSwipeValue: Writable<{ x: number; y: number }>;
  isSwipeLoading: Writable<boolean>;
  isFullscreen: Writable<boolean>;
  mapWidth: Writable<number>;
  mapHeight: Writable<number>;
}

const MAP_CONTEXT_KEY = Symbol.for("olmapcontext");

export function createMapContext(): MapContext {
  return setContext(MAP_CONTEXT_KEY, {
    map: writable(null),
    renderComplete: writable(false),
    layerSwipeActive: writable(false),
    layerSwipeDirection: writable("vertical"),
    layerSwipeValue: writable({ x: 0.5, y: 0.5 }),
    isSwipeLoading: writable(false),
    isFullscreen: writable(false),
    mapWidth: writable(0),
    mapHeight: writable(0),
  });
}

export function getMapContext(): MapContext {
  return getContext(MAP_CONTEXT_KEY);
}
