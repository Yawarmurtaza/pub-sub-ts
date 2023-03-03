// this class is used to create a subscribable object that can be used to subscribe to changes in the object.
// example: a subscribable object can be used to subscribe to changes in a property of an object like core.ts
export class Subscribable<TMessageType> {

    // a set of functions (subscribers) so that we can only have single instances of the same subscriber.
    private subscribersSet: Set<(message: TMessageType) => void> = new Set();
    constructor() {}

    // this method is used to subscribe to changes in the object.
    // it returns a function that can be used to unsubscribe from the object.
    public Subscribe(subscriber: (message: TMessageType) => void) : () => void {       

        // add the subscriber to the set of subscribers.
        this.subscribersSet.add(subscriber);

        // return a function that can be used to unsubscribe from the object.
        return () => {
            this.subscribersSet.delete(subscriber);
        }
    }

    // this method is used to publish a message to all the subscribers.
    public Publish (message: TMessageType) : void {

        // loop through all the subscribers and call them in sequence.
        this.subscribersSet.forEach((subscriber) => {
            subscriber(message);
        });
    }
}



export class Client{
    constructor() {
        // create a subscribable object.
        let subscribable = new Subscribable();

        // subscribe to changes in the subscribable object.
        let unsubscribe = subscribable.Subscribe(() => {
            console.log("subscribable object has changed");
            return "subscribable object has changed";
        });

        // unsubscribe from changes in the subscribable object.
        unsubscribe();
    }
}