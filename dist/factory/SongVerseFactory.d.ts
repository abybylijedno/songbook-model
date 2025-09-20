import { type ISongVerse, type IVerseLine } from '../model';
export declare class SongVerseFactory implements ISongVerse {
    lines: IVerseLine[];
    constructor();
    processLine(line: string): void;
    isEmpty(): boolean;
    get(): ISongVerse | null;
}
export declare const createSongVerseObject: (lines: IVerseLine[]) => ISongVerse;
//# sourceMappingURL=SongVerseFactory.d.ts.map