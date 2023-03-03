export class Fleet {
    private shipMap: Map<number, Ship> = new Map<number, Ship>();
    constructor(public Ships: Ship[]) {
        this.Ships.forEach((ship) => {
            ship.Coords.forEach(coord => {
                this.shipMap.set(coord, ship);
            });
        });
    }

    public Fire(target: number): BattleShipFireResult {
        if(this.shipMap.has(target)) {
            const ship = this.shipMap.get(target);
            ship!.Count--;

            if(ship?.HasSunk()){
                return BattleShipFireResult.Sunk;
            }
            
            return BattleShipFireResult.Hit;            
        }
        else{
            return BattleShipFireResult.Miss;
        }

    }
}

export enum BattleShipFireResult {
    Hit,
    Miss,
    Sunk
}

export class Ship {
    constructor(coords: number[]) {
        this.Coords = coords;
        this.Count = coords.length;
    }

    public Coords: number[];
    public Count: number;
    public HasSunk(): boolean {
        return this.Count == 0;
    }
}