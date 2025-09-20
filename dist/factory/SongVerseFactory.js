import { v4 as uuid } from 'uuid';
import { VerseLineFactory } from './VerseLineFactory';
export class SongVerseFactory {
    lines;
    constructor() {
        this.lines = [];
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