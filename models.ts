export class ErrorCodeModel {
    constructor(code: number, message: string) {
        this.Code = code;
        this.Message = message;
    }
    public Code: number | undefined;
    public Message: string | undefined;
}