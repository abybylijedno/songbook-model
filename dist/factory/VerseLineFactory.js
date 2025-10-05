import { v4 as uuid } from 'uuid';
const SEPARATOR = ' | ';
export class VerseLineFactory {
    static fromLine(line) {
        const parts = line.split(SEPARATOR);
        return createVerseLineObject(parts[0], parts[1] || '');
    }
}
export const createVerseLineObject = (text, chord) => {
    return {
        uuid: uuid(),
        text: text.trim(),
        chord: chord.trim()
    };
};
//# sourceMappingURL=VerseLineFactory.js.map