export class RoomBookingManager {
    private roomDatesMap: Map<string, Set<number>> = new Map();

    constructor(totalNumberOfRooms: number) {
        for (let i = 0; i < totalNumberOfRooms; i++) {
            this.roomDatesMap.set(`room${i}`, new Set<number>());
        }
    }

    // Finds any room that is available for the given dates. Returns the room number or undefined if no room is available.
    public FindAnyRoom(startDate: Date, endDate: Date): string | undefined 
    {
        for (let [roomNumber] of this.roomDatesMap) {
            if(this.checkRoom(roomNumber, startDate, endDate)) {
                return roomNumber;
            }
        }

        return undefined;
    }

    public bookroom(roomNumber: string, startDate: Date, endDate: Date): boolean {
        if (!this.ValidateDatesAndRoom(roomNumber, startDate, endDate)) {
            return false;
        }

        const startDate2 = new Date(startDate);
        if (this.checkRoom(roomNumber, startDate, endDate)) {
            // Add the room with given dates and return true...
            let newDates: Set<number> = new Set<number>();

            for (let sd = startDate2; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
                newDates!.add(new Date(sd).valueOf());
            }

            this.roomDatesMap.set(roomNumber, newDates!);
            return true;
        }

        return false;
    }

    private ValidateDatesAndRoom(roomNumber: string, startDate: Date, endDate: Date): boolean {
        if (!this.roomDatesMap.has(roomNumber)) {
            return false;
        }
        if (startDate > endDate) {
            return false;
        }

        return true;
    }

    public checkRoom(roomNumber: string, startDate: Date, endDate: Date): boolean {

        if (!this.roomDatesMap.has(roomNumber)) {
            return false;
        }

        const dates: Set<number> | undefined = this.roomDatesMap.get(roomNumber); // room dates
        if (dates?.size === 0) {
            return true;
        }

        if (dates?.has(startDate.valueOf()) || dates?.has(endDate.valueOf())) {
            return false;
        }

        for (let sd = startDate; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
            if (dates?.has(sd.valueOf())) {
                return false;
            }
        }

        return true;
    }

    public Test(dateToCheck: Date): boolean {

        const start = new Date(1023, 1, 1);
        const end = new Date(1023, 1, 10);

        const set = new Set<number>();
        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            set.add(new Date(date).valueOf());
        }

        if (set.has(dateToCheck.valueOf())) {
            return true;
        } else {
            return false;
        }
    }
}


