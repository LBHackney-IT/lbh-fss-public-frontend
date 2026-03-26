export function getMapboxTileUrl() {
  return `${import.meta.env.VITE_MAP_BOX_URL ?? ""}${import.meta.env.VITE_MAP_BOX_TOKEN ?? ""}`;
}
