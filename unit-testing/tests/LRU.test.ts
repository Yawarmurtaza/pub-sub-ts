import { Lru } from "../LRU";

describe("LRU Test Suite", () => {
    
    test("Get should return existing data using key", () => { 
         // Arrange
         const lru = new Lru(3);
         lru.AddOrUpdate("key1", "value1");
         lru.AddOrUpdate("key2", "value2");
         lru.AddOrUpdate("key3", "value3");
         
         // Act
         const result = lru.Get("key1");
 
         // Assert
         expect(result).toBe("value1");
    });

    test ("AddOrUpdate should add new data", () => {
         // Arrange
         const lru = new Lru(3);
         lru.AddOrUpdate("key1", "value1");
         const result = lru.Get("key1");
         
         lru.AddOrUpdate("key1", "new value");
         
         // Act
         const newResult = lru.Get("key1");
 
         // Assert
         expect(result).toBe("value1");
         expect(newResult).toBe("new value");
    });

    test("It should remove the least recently used item", () => {
        const lru = new Lru(3);
        lru.AddOrUpdate("key1", "value1");
        lru.AddOrUpdate("key2", "value2");
        lru.AddOrUpdate("key3", "value3");
        lru.AddOrUpdate("key4", "value4");

        const result = lru.Get("key1");

        expect(result).toBeUndefined();
    });


    test("It should remove the least recently used item - 2", () => {
        const lru = new Lru();
        lru.AddOrUpdate("key1", "value1");
        lru.AddOrUpdate("key2", "value2");
        lru.AddOrUpdate("key3", "value3");
        lru.AddOrUpdate("key4", "value4");
        lru.AddOrUpdate("key5", "value5");
        //lru.AddOrUpdate("key6", "value6");

        lru.Get("key1");
        lru.Get("key2");

        lru.AddOrUpdate("key6", "value6");

        const result = lru.Get("key3");

        expect(result).toBeUndefined();
    });

    test("It should remove the key", () => {
        // Arrange.
        const lru = new Lru(3);
        lru.AddOrUpdate("key1", "value1");
        lru.AddOrUpdate("key2", "value2");
        
        // Act.
        const result = lru.Remove("key1");

        // Assert.
        expect(result).toBeTruthy();
        expect(lru.Get("key1")).toBeUndefined();
        
    });

    test("It should return undefined when key is not found", () => {
        
        // Arrange
        const lru = new Lru(3);
        lru.AddOrUpdate("key1", "value1");
        lru.AddOrUpdate("key2", "value2");
        lru.AddOrUpdate("key3", "value3");
        lru.AddOrUpdate("key4", "value4");

        // Act.
        const result = lru.Get("key5");

        // Assert
        expect(result).toBeUndefined();

    });
});