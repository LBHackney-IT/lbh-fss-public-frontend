import { categoryIconMap } from "./fontawesome";

describe("fontawesome", () => {
  describe("categoryIconMap", () => {
    it("maps each category slug to a [style, icon] array", () => {
      expect(categoryIconMap["loneliness-or-isolation"]).toEqual(["fas", "comments"]);
      expect(categoryIconMap["anxiety-or-mental-health"]).toEqual([
        "fas",
        "head-side-brain",
      ]);
      expect(categoryIconMap["housing-advice"]).toEqual(["fas", "house"]);
    });

    it("has entries for all expected category slugs", () => {
      const slugs = [
        "loneliness-or-isolation",
        "anxiety-or-mental-health",
        "safe-and-healthy-body",
        "exercise-and-wellbeing",
        "arts-and-creativity",
        "food-or-shopping",
        "faith-led-activities",
        "money-advice",
        "employment-advice",
        "housing-advice",
        "immigration-advice",
      ];
      slugs.forEach((slug) => {
        expect(categoryIconMap[slug]).toBeDefined();
        expect(Array.isArray(categoryIconMap[slug])).toBe(true);
        expect(categoryIconMap[slug].length).toBe(2);
      });
    });
  });
});
