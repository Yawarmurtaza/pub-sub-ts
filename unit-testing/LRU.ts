export class Lru {

    private head: DoubleyLinkedList<string, string>;
    private tail: DoubleyLinkedList<string, string>;
    private map: Map<string, DoubleyLinkedList<string, string>>;

    constructor(private capacity: number = 5) {
        this.map = new Map<string, DoubleyLinkedList<string, string>>()
        this.head = new DoubleyLinkedList<string, string>("head", "head");
        this.tail = new DoubleyLinkedList<string, string>("tail","tail");

        this.head.Next = this.tail;
        this.tail.Previous = this.head;
    }

    public AddOrUpdate(key: string, value: string): boolean {
        
        const node = this.map.get(key);
        if (node) {
            // update existing value
            this.RemoveNode(node);
            node.Value = value; // update node with new value
            this.MoveNodeToHead(node); // move node to head        

        } else {
            // add new value
            if (this.map.size >= this.capacity) {
                // remove the previous node from the tail
                const tail = this.tail.Previous!;
                this.RemoveNode(tail.Previous!);
                this.map.delete(tail.Key);
            }

            // now add new node to the head
            const newNode = new DoubleyLinkedList<string, string>(key ,value);
            this.MoveNodeToHead(newNode);
            this.map.set(key, newNode);
        }

        return true;
    }

    public Remove(key: string): boolean {
        const node = this.map.get(key);
        if (node) {
            this.RemoveNode(node);
            this.map.delete(key);
            return true;
        }
        return false;
    }

    public Get(key: string): string | undefined {
        const node = this.map.get(key);
        if (node) {
            // remove this node from its current position
            this.RemoveNode(node);

            // add this node to the head
            this.MoveNodeToHead(node);    
            return node.Value;               // return the value
        }
        return undefined;
    }

    public Exists(key: string): boolean {
        throw new Error("Not implemented");
    }

    private RemoveNode(node: DoubleyLinkedList<string, string>): void {
        node.Previous!.Next = node.Next;
        node.Next!.Previous = node.Previous;
    }

    private MoveNodeToHead(node: DoubleyLinkedList<string, string>): void {
        this.head.Next!.Previous = node; // 2nd node from head is reverse pointing to node
        node.Next = this.head.Next;      // node is forward pointing to 2nd node from head
        node.Previous = this.head;       // node is reverse pointing to head
        this.head.Next = node;           // head is forward pointing to node    
    }


}

class DoubleyLinkedList<TKey, TValue> {
    constructor(public Key: TKey, public Value: TValue) {

    }

    public Next: DoubleyLinkedList<TKey, TValue> | undefined;
    public Previous: DoubleyLinkedList<TKey, TValue> | undefined;
}