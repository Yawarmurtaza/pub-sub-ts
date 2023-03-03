import { Subscribable } from "./Subscribable-class";
import { DataClass, ErrorCodesPublisher } from "./data-class";
import { ErrorCodeModel } from "./models";

const sub = new Subscribable();

sub.Subscribe(
    (message) => 
    { 
        console.log(message); 
    });  

/*sub.Publish("hello");
sub.Publish("hello12");
sub.Publish("hello789");*/

const dataClass : DataClass = new DataClass(1);
dataClass.Subscribe((value: number) => 
{
    console.log(`Data Class ${value}`);
});

dataClass.Subscribe((value: number) => 
{
    console.log("I am another subscriber which only takes events number > 50");
    if(value > 50){
        console.log(`Data Class ${value}`);
    }
    else{
        return;
    }
    
});


// dataClass.Publish(450);

const errorCodesPublisher = new ErrorCodesPublisher(new ErrorCodeModel(1, "error"));

errorCodesPublisher.Subscribe((errorCode: ErrorCodeModel) => 
{
    console.log(`Error Code ${errorCode.Code} Message ${errorCode.Message}`);
});

errorCodesPublisher.PublishError(new ErrorCodeModel(2, "error2"));