import { type ISongVerse, type IVerseLine } from '../model/index.js';
export declare class SongVerseFactory implements ISongVerse {
    lines: IVerseLine[];
    constructor();
    processPart(part: string): ISongVerse | null;
    processLine(line: string): void;
    isEmpty(): boolean;
    get(): ISongVerse | null;
}
export declare const createSongVerseObject: (lines: IVerseLine[]) => ISongVerse;
//# sourceMappingURL=SongVerseFactory.d.ts.map