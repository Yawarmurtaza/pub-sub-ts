

function updateArray(arr: number[], update: (v: number) => number): number[] {
    return arr.map(update);
}

// console.log(updateArray([1, 2, 3], (v) => v * 10));

type AdderFunction = (v1: number, v2: number) => number; // just a signature of a function, not the implementation!!!

function createAdder(num: number): AdderFunction {
    return () => num + 10;
}

const add10: AdderFunction = createAdder(100);

// console.log(add10(5, 100));

type PrintDateOfBirthStringFunction = (dob: Date) => string;

class FuncClass {
    constructor() { }

    public Add(num: number, num2: number): number {
        return num + num2;
    }

    // calculates 2 numbers, takes 2 numbers and operate on them and returns the result.
    public Calculate(num: number, num2: number, operate: (num1: number, num2: number) => number): number {
        const result = operate(num, num2);
        return result;
    }

    public Operate(num1: number, name: string): () => string {
        const v = num1 + 10;
        return () => v + " - " + name.toString();
    }

    public OperateWithParams(num1: number, name: string): (dob: Date) => string {
        const v = num1 + 10;
        return (dob) => {
            const timeDiff = Date.now() - dob.getTime();
            const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
            return `v = ${v} - ${name} age is ${age}`;
        }
    }

    public OperateWithParams2(num1: number, name: string): PrintDateOfBirthStringFunction {
        const v = num1 + 10;

        const printDobFunction = (dob: Date) => {
            const timeDiff = Date.now() - dob.getTime();
            const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
            return `v = ${v} - ${name} age is ${age}`;
        }

        return printDobFunction;
    }

    public ReturnObjectWith2Funcs(num: number, name: string) {
        const message = `${num + 100} - name = ${name}`;
        return {
            PrintDobFunction(dob: Date): string {
                const timeDiff = Date.now() - dob.getTime();
                const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
                return `message = ${message} - ${name} age is ${age}`;
            },
            PrintDobFunctionWithStory(dob: Date): string {
                const timeDiff = Date.now() - dob.getTime();
                const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
                return `message = ${message} - ${name} age is ${age} - Once upon a time....`;
            }
        }
    }

}

const runner: FuncClass = new FuncClass();
const addResult = runner.Add(55, 66);
// console.log(addResult);
const opResult = runner.Calculate(50, 60, (n, m) => { return n * m; });
// console.log(opResult);
const op = runner.Operate(55, "Yawar");
const resultString = op();
// console.log(resultString);

const func: (dob: Date) => string = runner.OperateWithParams(66, 'Yawar');
const result: string = func(new Date('1981-01-05'))
// console.log(result);

const printDobFunc: PrintDateOfBirthStringFunction = runner.OperateWithParams2(100, 'Yawar');
const message: string = printDobFunc(new Date('1981-01-05'));
// console.log(message);

const resultFuncs = runner.ReturnObjectWith2Funcs(90, 'Yawar');
const resultFuncsMessage = { message1: resultFuncs.PrintDobFunction(new Date('1981-01-05')), message2: resultFuncs.PrintDobFunctionWithStory(new Date('1986-04-04')) }
console.log(resultFuncsMessage.message1 + ' \n' + resultFuncsMessage.message2);

