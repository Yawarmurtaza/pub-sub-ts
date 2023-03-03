import fs from 'fs';
import { FileContent } from './models/FileContent';
export function createHandlersStack<TMessageType>() {
    const subscriberSet: Set<(message: TMessageType) => undefined | unknown> = new Set();

    return {
        SubscribeToEvent(sb: (message: TMessageType) => undefined | unknown): void {

            // add the subscribers in the set.
            subscriberSet.add(sb);
        },

        PublishEvent(message: TMessageType): undefined | unknown {
            let data: unknown;

            for (const subscriber of Array.from(subscriberSet)) {
                data = subscriber(message);
                if (data !== undefined) {
                    break;
                }
            }

            return data;

        }
    }
}

const fileHandlers = createHandlersStack<FileContent>();
// fileHandlers.SubscribeToEvent((fileContent) => fileContent.Contents);
fileHandlers.SubscribeToEvent((file) => {
    if (file.FileName.endsWith(".txt")) {
        return `a text file contents: ${file.Contents}`
    }
    else {
        return undefined;
    }
});

fileHandlers.SubscribeToEvent((file) => {
    if(file.FileName.endsWith(".json")){
        return JSON.parse(file.Contents);
    }
    else{
        return undefined;
    }
});
for (const file of fs.readdirSync("./files")) {

    const fileContent: FileContent = new FileContent();
    fileContent.Contents = fs.readFileSync(`./files/${file}`, "utf-8");
    fileContent.FileName = file;
    const output = fileHandlers.PublishEvent(fileContent);
    console.log(`${file}: ${JSON.stringify(output)}`);
}
