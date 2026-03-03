import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * Ensures the map recalculates its size and panes after mount.
 * When the map is embedded (e.g. in WordPress) the container may not have
 * final dimensions at first paint, so Leaflet can leave the overlay pane
 * empty. Calling invalidateSize() once the map is ready fixes the overlay
 * pane and tile layer z-index to match production.
 */
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    // Run immediately so overlay pane is created
    map.invalidateSize();
    // Run again after layout has settled (embed container may not have final size yet)
    const t = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(t);
  }, [map]);

  return null;
}

export default MapResizeHandler;
