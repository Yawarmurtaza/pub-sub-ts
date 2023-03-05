import { RoomBookingManager } from "../roomBookingSystem";

describe("Room booking manager tests", () => {

    test("validate room name", () => {
        // Arrange.

        const manager = new RoomBookingManager(3);

        // Act.
        const result = manager.bookroom("Yawar", new Date(2023, 1, 1), new Date(2023, 1, 10));

        // Assert.
        expect(result).toBe(false);
    });

    test("given dates are iterated for each day when booking a room.", () => {

        // Arrange.
        const manager = new RoomBookingManager(3);

        // Act.
        const result = manager.bookroom("room0", new Date('2023-02-01'), new Date('2023-02-10'))

        // Assert.
        expect(result).toBe(true);
    });

    test("Check room should return false when start date fall under already booked date", () => {
        // Arrange.
        const roomName: string = "room0"
        const manager = new RoomBookingManager(3);
        const result1 = manager.bookroom(roomName, new Date(2023, 1, 1), new Date(2023, 1, 10));
        expect(result1).toBe(true);

        // Act.
        const result = manager.bookroom(roomName, new Date(2023, 1, 5), new Date(2023, 1, 8));

        // Assert.
        expect(result).toBe(false);
    });

    test("Should return undefined when no room is available", () => {
        // Arrange.
        const manager = new RoomBookingManager(3);
        manager.bookroom("room0", new Date(2023, 1, 1), new Date(2023, 1, 10));
        manager.bookroom("room1", new Date(2023, 1, 1), new Date(2023, 1, 10));
        manager.bookroom("room2", new Date(2023, 1, 1), new Date(2023, 1, 10));

        // Act.
        const result : string | undefined = manager.FindAnyRoom(new Date(2023, 1, 5), new Date(2023, 1, 7));

        // Assert.
        expect(result).toBe(undefined);
    });


    test("Should return room 1 as available", () => {
        // Arrange.
        const manager = new RoomBookingManager(3);
        manager.bookroom("room0", new Date(2023, 1, 1), new Date(2023, 1, 10));
        manager.bookroom("room1", new Date(2023, 1, 1), new Date(2023, 1, 5));
        manager.bookroom("room2", new Date(2023, 1, 1), new Date(2023, 1, 10));

        // Act.
        const result : string | undefined = manager.FindAnyRoom(new Date(2023, 1, 6), new Date(2023, 1, 10));

        // Assert.
        expect(result).toBe("room1");
    });

    test("test", () => {
        const manager = new RoomBookingManager(3);
        const result = manager.Test(new Date(1023, 1, 5));
        expect(result).toBe(true);
    });

});