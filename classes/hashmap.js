import { LinkedList } from "@oxwillfollow/linked-list";

class Hashmap {
  #capacity = 16;
  #loadFactor = 0.75;
  #buckets = new Array(this.#capacity);

  static hash(key) {
    if (typeof key !== "string")
      throw TypeError("Hashmap only accepts strings as keys!");

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
    }

    return hashCode;
  }

  static hashToIndex(hashCode, arrayLength) {
    const index = Hashmap.hash(hashCode) % (arrayLength - 1);

    if (index < 0 || index >= arrayLength) {
      throw new Error("Trying to access index out of bounds");
    }

    return index;
  }

  set(key, value) {
    const hashCode = Hashmap.hash(key);
    const index = Hashmap.hashToIndex(hashCode, this.#buckets.length);

    let bucket = this.#buckets[index];

    if (bucket !== undefined && bucket.key !== key) {
      // bucket is already a linked list
    } else {
      bucket = new LinkedList();
      bucket.append({ key, value });
    }
  }

  get(key) {
    const hashCode = Hashmap.hash(key);
    const index = Hashmap.hashToIndex(hashCode, this.#buckets.length);

    const list = this.#buckets[index];
    const listSize = list.size();

    for (let i = 0; i < listSize; i++) {
      const item = list.at(i);
      if (item.key === key) {
        return item.value;
      }
    }

    return null;
  }

  has(key) {}
}

const myHashMap = new Hashmap();
myHashMap.set("John", { age: 23, occupation: "studying" });

console.log(myHashMap.get("John"));
