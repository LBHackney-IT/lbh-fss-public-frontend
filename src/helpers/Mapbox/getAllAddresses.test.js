import getAllAddresses from "./getAllAddresses";

describe("getAllAddresses", () => {
  it("returns single service wrapped in array when data.data.service is passed", () => {
    const data = {
      data: {
        service: {
          id: "1",
          name: "Service A",
          locations: [{ address1: "10 Test St" }],
        },
      },
    };
    const result = getAllAddresses(data);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
    expect(result[0].locations).toHaveLength(1);
  });

  it("returns services array when data.data.services is passed", () => {
    const data = {
      data: {
        services: [
          {
            id: "1",
            name: "A",
            locations: [{ address1: "Addr 1" }],
          },
          {
            id: "2",
            name: "B",
            locations: [{ address1: "Addr 2" }],
          },
        ],
      },
    };
    const result = getAllAddresses(data);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
  });

  it("duplicates service when it has multiple locations", () => {
    const loc1 = { address1: "Loc 1", city: "London" };
    const loc2 = { address1: "Loc 2", city: "Hackney" };
    const data = {
      data: {
        services: [
          {
            id: "1",
            name: "Multi-location",
            locations: [loc1, loc2],
          },
        ],
      },
    };
    const result = getAllAddresses(data);
    expect(result).toHaveLength(2);
    expect(result[0].locations).toEqual([loc1, loc2]);
    expect(result[1].locations).toEqual([loc2]);
    expect(result[1].id).toBe("1");
    expect(result[1].name).toBe("Multi-location");
  });

  it("keeps single-location services unchanged", () => {
    const data = {
      data: {
        services: [
          {
            id: "1",
            name: "Single",
            locations: [{ address1: "Only" }],
          },
        ],
      },
    };
    const result = getAllAddresses(data);
    expect(result).toHaveLength(1);
    expect(result[0].locations).toHaveLength(1);
  });
});
