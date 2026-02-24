import React from "react";
import { render } from "@testing-library/react";
import { ReactLeafletMarkerClusterStyles } from "./ReactLeafletMarkerClusterStyles";

describe("ReactLeafletMarkerClusterStyles", () => {
  it("renders without throwing", () => {
    expect(() => render(<ReactLeafletMarkerClusterStyles />)).not.toThrow();
  });
});
