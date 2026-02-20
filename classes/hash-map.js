import { LinkedList } from "@oxwillfollow/linked-list";

class HashMap {
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
    const index = hashCode % (arrayLength - 1);

    if (index < 0 || index >= arrayLength) {
      throw new Error("Trying to access index out of bounds");
    }

    return index;
  }

  set(key, value) {
    const hashCode = HashMap.hash(key);
    const index = HashMap.hashToIndex(hashCode, this.#buckets.length);

    if (
      this.#buckets[index] !== undefined &&
      this.#buckets[index].key === key
    ) {
      this.#buckets[index].value = value;
    } else {
      const list = new LinkedList();
      list.append({ key, value });
      this.#buckets[index] = list;
    }
  }

  #getListNode(key) {
    const hashCode = HashMap.hash(key);
    const index = HashMap.hashToIndex(hashCode, this.#buckets.length);

    const list = this.#buckets[index];

    if (list !== undefined) {
      const listSize = list.size();

      for (let i = 0; i < listSize; i++) {
        const item = list.at(i);
        if (item.key === key) {
          return item;
        }
      }
    }

    return undefined;
  }

  get(key) {
    const node = this.#getListNode(key);

    return node !== undefined ? node.value : null;
  }

  has(key) {
    return this.#getListNode(key) !== undefined;
  }

  remove(key) {
    const hashCode = HashMap.hash(key);
    const index = HashMap.hashToIndex(hashCode, this.#buckets.length);

    const list = this.#buckets[index];

    if (list !== undefined) {
      const listSize = list.size();

      for (let i = 0; i < listSize; i++) {
        const item = list.at(i);
        if (item.key === key) {
          list.removeAt(i);
          return true;
        }
      }
    }

    return false;
  }
}

export { HashMap };
