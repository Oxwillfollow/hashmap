import { HashMap } from "../classes/hash-map";

test("Set, get, has", () => {
  const myHashMap = new HashMap();
  myHashMap.set("John", { age: 23, occupation: "studying" });

  expect(myHashMap.get("Bob")).toEqual(null);
  expect(myHashMap.get("John")).toEqual({ age: 23, occupation: "studying" });
  expect(myHashMap.has("John")).toBe(true);
  expect(myHashMap.has("Bob")).toBe(false);
});
