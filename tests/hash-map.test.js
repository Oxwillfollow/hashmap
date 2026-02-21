import expect from "expect";
import { HashMap } from "../classes/hash-map";

test("Set, get, has", () => {
  const myHashMap = new HashMap();
  myHashMap.set("John", { age: 222222222222333, occupation: "uuuuuuhm" });
  myHashMap.set("John", { age: 23, occupation: "studying" });

  expect(myHashMap.get("Bob")).toEqual(null);
  expect(myHashMap.get("John")).toEqual({ age: 23, occupation: "studying" });
  expect(myHashMap.has("John")).toBe(true);
  expect(myHashMap.has("Bob")).toBe(false);
});

test("remove", () => {
  const myHashMap = new HashMap();
  myHashMap.set("John", { age: 23, occupation: "studying" });

  expect(myHashMap.remove("John")).toBe(true);
  expect(myHashMap.remove("Bob")).toBe(false);
  expect(myHashMap.has("John")).toBe(false);
});

test("length", () => {
  const myHashMap = new HashMap();

  expect(myHashMap.length()).toBe(0);

  myHashMap.set("John", "Tall");
  myHashMap.set("Bob", "Tall");
  myHashMap.set("Tom", "Short");

  expect(myHashMap.length()).toBe(3);

  myHashMap.set("Peter", "Short");
  myHashMap.set("Paul", "Short");
  myHashMap.set("Saul", "Tall");

  expect(myHashMap.length()).toBe(6);
});
