import {CreateSubscribable} from "./subscribable-function";

const sub = CreateSubscribable<string>();
sub.Subscribe((message) => {
    console.log(message);
});

sub.Publish("hello");
sub.Publish("hello1");
sub.Publish("hello2");
sub.Publish("hello3");