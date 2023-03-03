// this class is used to create a subscribable object that can be used to subscribe to changes in the object.
// example: a subscribable object can be used to subscribe to changes in a property of an object like core.ts
export function CreateSubscribable<TMessageType>() {

    // a set of functions (subscribers) so that we can only have single instances of the same subscriber.
    const subscribersSet: Set<(message: TMessageType) => void> = new Set();

    return {
        // this method is used to subscribe to changes in the object.
        // it returns a function that can be used to unsubscribe from the object.
        Subscribe(subscriber: (message: TMessageType) => void): () => void {

            // add the subscriber to the set of subscribers.
            subscribersSet.add(subscriber);

            // return a function that can be used to unsubscribe from the object.
            return () => {
                subscribersSet.delete(subscriber);
            }
        },

        // this method is used to publish a message to all the subscribers.
        Publish(message: TMessageType): void {

            // loop through all the subscribers and call them in sequence.
            subscribersSet.forEach((subscriber) => {
                subscriber(message);
            });
        }
    }
}