import { SongMetaFactory } from './SongMetaFactory.js';
import { SongVerseFactory } from './SongVerseFactory.js';
import { type ISong, type ISongMeta, type ISongVerse } from '../model/index.js';
export declare class SongFactory implements ISong {
    static isBegining(line: string): boolean;
    slug: string;
    title: string;
    meta: SongMetaFactory;
    verses: ISongVerse[];
    searchText: string;
    currentVerse?: SongVerseFactory;
    constructor(title: string);
    finishVerse(): void;
    addLine(line: string): void;
    get(): ISong;
}
export declare const createSongObject: (title: string, meta: ISongMeta, verses: ISongVerse[]) => ISong;
//# sourceMappingURL=SongFactory.d.ts.map