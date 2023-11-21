import type Map from "ol/Map";
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export interface MapContext {
  map: Writable<Map | null>;
  renderComplete: Writable<boolean>;
  swipeCutThreshold: Writable<number>;
  layerSwipeStatus: Writable<string>;
  layerSwipeValue: Writable<{ x: number; y: number }>;
}

const MAP_CONTEXT_KEY = Symbol.for("olmapcontext");

export function createMapContext(): MapContext {
  return setContext(MAP_CONTEXT_KEY, {
    map: writable<Map | null>(null),
    renderComplete: writable<boolean>(false),
    swipeCutThreshold: writable<number>(0),
    layerSwipeStatus: writable<string>("none"),
    layerSwipeValue: writable<{ x: number; y: number }>({ x: 0.5, y: 0.5 }),
  });
}

export function getMapContext(): MapContext {
  return getContext(MAP_CONTEXT_KEY);
}
