import { Fleet, Ship, BattleShipFireResult } from "../BattleShip";

describe("BattleShip tests", () => {
    test("should return Hit", () => {
        // Arrange        
        const ships: Ship[] = [new Ship([1, 2, 3]), new Ship([4, 5, 6]), new Ship([7, 8, 9])];
        const fleet: Fleet = new Fleet(ships);

        // Act
        const result: BattleShipFireResult = fleet.Fire(9);

        // Assert
        expect(result).toBe(BattleShipFireResult.Hit);
    });

    test("should return Miss", () => {
        // Arrange.
        const ships: Ship[] = [new Ship([1, 2, 3]), new Ship([4, 5, 6]), new Ship([7, 8, 9])];
        const fleet: Fleet = new Fleet(ships);

        // Act
        const result: BattleShipFireResult = fleet.Fire(90);

        // Assert
        expect(result).toBe(BattleShipFireResult.Miss);
    });

    test("should return Sunk", () => {
        // Arrange.
        const ships: Ship[] = [new Ship([1, 5, 9]), new Ship([8, 6, 3])];
        const fleet: Fleet = new Fleet(ships);

        // Act.
        const result1 =fleet.Fire(8);
        const result2 = fleet.Fire(6);
        const result3 = fleet.Fire(3);

        // Assert.
                
        expect(result1).toBe(BattleShipFireResult.Hit);
        expect(result2).toBe(BattleShipFireResult.Hit);
        expect(result3).toBe(BattleShipFireResult.Sunk);
    });

});