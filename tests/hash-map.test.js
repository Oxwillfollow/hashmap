import { HashMap } from "../classes/hash-map";

test("Set and get", () => {
  const myHashMap = new HashMap();
  myHashMap.set("John", { age: 23, occupation: "studying" });

  expect(myHashMap.get("John")).toEqual({ age: 23, occupation: "studying" });
});
