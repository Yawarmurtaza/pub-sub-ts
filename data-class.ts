import { Subscribable } from './Subscribable-class';
import { ErrorCodeModel } from './models';
export class DataClass extends Subscribable<number>{

    constructor(public value: number) {
        super();
    }

    public SetValue(value: number){
        this.value = value;
        this.Publish(value);
    }
}

export class ErrorCodesPublisher extends Subscribable<ErrorCodeModel>{

    constructor(public errorCode: ErrorCodeModel) {
        super();
    }

    public PublishError(errorCode: ErrorCodeModel){

        this.Publish(errorCode);
    }
}