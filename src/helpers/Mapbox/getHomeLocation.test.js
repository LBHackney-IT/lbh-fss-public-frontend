import getHomeLocation from "./getHomeLocation";

describe("getHomeLocation", () => {
  it("returns array with metadata when postCodeLatitude and postCodeLongitude are set", () => {
    const data = {
      data: {
        metadata: {
          postCodeLatitude: 51.5,
          postCodeLongitude: -0.1,
        },
      },
    };
    expect(getHomeLocation(data)).toEqual([data.data.metadata]);
  });

  it("returns empty array when metadata is undefined", () => {
    expect(getHomeLocation({ data: {} })).toEqual([]);
  });

  it("returns empty array when postCodeLatitude is null", () => {
    const data = {
      data: {
        metadata: {
          postCodeLatitude: null,
          postCodeLongitude: -0.1,
        },
      },
    };
    expect(getHomeLocation(data)).toEqual([]);
  });

  it("returns empty array when postCodeLongitude is null", () => {
    const data = {
      data: {
        metadata: {
          postCodeLatitude: 51.5,
          postCodeLongitude: null,
        },
      },
    };
    expect(getHomeLocation(data)).toEqual([]);
  });

  it("returns empty array when both coords are null", () => {
    const data = {
      data: {
        metadata: {
          postCodeLatitude: null,
          postCodeLongitude: null,
        },
      },
    };
    expect(getHomeLocation(data)).toEqual([]);
  });
});
