import type Map from "ol/Map";
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export interface MapContext {
  map: Writable<Map | null>;
  renderComplete: Writable<boolean>;
  swipeCutThreshold: Writable<number>;
  layerSwipeActive: Writable<boolean>;
  layerSwipeDirection: "horizontal" | "vertical";
  layerSwipeValue: Writable<{ x: number; y: number }>;
  isFullscreen: Writable<boolean>;
}

const MAP_CONTEXT_KEY = Symbol.for("olmapcontext");

export function createMapContext(): MapContext {
  return setContext(MAP_CONTEXT_KEY, {
    map: writable(null),
    renderComplete: writable(false),
    swipeCutThreshold: writable(1),
    layerSwipeActive: writable(false),
    layerSwipeDirection: writable("horizontal"),
    layerSwipeValue: writable({ x: 0.5, y: 0.5 }),
    isFullscreen: writable(false),
  });
}

export function getMapContext(): MapContext {
  return getContext(MAP_CONTEXT_KEY);
}
