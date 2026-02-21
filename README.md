# hashmap

A hash map implementation with Javascript.

## Packages used:

- linked-list (@oxwillfollow/linked-list)
- jest (for testing)
- babel (for allowing ESM with jest)

## HashMap class:

Properties:

- `#MIN_CAPACITY = 16`: the minimum capacity that the bucket array can start with/shrink to. Default is set to 16.
- `#capacity`: the current capacity the bucket array is set to.
- `#loadFactor`: the load factor that the capacity's growth is based on. Default is set to 0.75.
- `#buckets`: the buckets array of the hash map.

Static Methods:

- `static hash(key)`: takes a `key` and produces a hash code with it.

Private Methods:

- `#hashToIndex(hashCode)`: takes a `hashCode` and produces an index for the bucket array.
- `#updateCapacity()`: checks if the capacity is too big or too small (based on `#loadFactor`), doubles it or divides it by 2 if that's the case.
- `#getListNode(key)`: takes a `key` and returns a linked list node containing that key. Used as a helper function for `set`, `get` and `has` methods.

Public Methods:

- `set(key, value)`: takes a `key` and a `value` and adds it to the hash map. If a key already exists, then the old value is overwritten.
- `get(key)`: takes a `key` and returns the value that is assigned to this key. If a key is not found, returns `null`.
- `has(key)`: takes a `key` and returns `true` if it is found in the hash map, otherwise returns `false`.
- `remove(key)`: takes a `key` and if the given key is found in the hash map, removes the entry with that key and returns `true`. Otherwise, returns `false`.
- `length()`: returns the number of stored keys in the hash map.
- `clear()`: removes all entries in the hash map.
- `keys()`: returns an array containing all the keys inside the hash map.
- `values()`: returns an array containing all the values in the hash map.
- `entries()`: returns an array that contains each key/value pair as an object, i.e. `{key: "myKey", value: "myValue}`
