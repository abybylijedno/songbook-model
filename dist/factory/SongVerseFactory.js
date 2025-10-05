import { v4 as uuid } from 'uuid';
import { VerseLineFactory } from './VerseLineFactory.js';
export class SongVerseFactory {
    lines;
    constructor() {
        this.lines = [];
    }
    processPart(part) {
        const lines = part.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
        for (const line of lines) {
            this.processLine(line);
        }
        return this.get();
    }
    processLine(line) {
        this.lines.push(VerseLineFactory.fromLine(line));
    }
    isEmpty() {
        return this.lines.length == 0;
    }
    get() {
        return this.lines.length > 0 ? createSongVerseObject(this.lines) : null;
    }
}
export const createSongVerseObject = (lines) => {
    return {
        uuid: uuid(),
        lines
    };
};
//# sourceMappingURL=SongVerseFactory.js.map