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

  hashToIndex(hashCode) {
    const index = hashCode % (this.#capacity - 1);

    if (index < 0 || index >= this.#capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    return index;
  }

  #updateCapacity() {
    let occupiedBucketCount = 0;
    for (let i = 0; i < this.#buckets.length; i++) {
      if (this.#buckets[i] !== undefined) occupiedBucketCount++;
    }

    if (occupiedBucketCount >= this.#capacity * this.#loadFactor) {
      this.#capacity *= 2;
    }
  }

  #getListNode(key) {
    const hashCode = HashMap.hash(key);
    const index = this.hashToIndex(hashCode);

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

  set(key, value) {
    const hashCode = HashMap.hash(key);
    const index = this.hashToIndex(hashCode);

    let existingNode = this.#getListNode(key);

    if (existingNode !== undefined) {
      existingNode.value = value;
    } else {
      let list = this.#buckets[index];

      if (list === undefined) list = new LinkedList();

      list.append({ key, value });
      this.#buckets[index] = list;
    }

    this.#updateCapacity();
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
    const index = this.hashToIndex(hashCode);

    const list = this.#buckets[index];

    if (list !== undefined) {
      const listSize = list.size();

      if (listSize === 1) {
        this.#buckets[index] = undefined;
        return true;
      }

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
