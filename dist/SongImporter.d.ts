import { type ISong } from './model/index.js';
import { SongFactory } from './factory/SongFactory.js';
export declare class SongImporter {
    songs: ISong[];
    currentSong: SongFactory | null;
    constructor();
    getLines(content: string): string[];
    beginNewSong(line: string): void;
    endCurrentsong(): void;
    process(content: string): ISong[];
}
//# sourceMappingURL=SongImporter.d.ts.map