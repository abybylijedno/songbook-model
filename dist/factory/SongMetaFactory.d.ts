import { type ISongMeta, type ISongMetaUrl } from '../model';
export declare class SongMetaFactory implements ISongMeta {
    author?: string;
    url?: ISongMetaUrl;
    originalTitle?: string;
    alternativeTitle?: string;
    album?: string;
    copyright?: string;
    translation?: string;
    basedOn?: string;
    lyrics?: string;
    music?: string;
    processLine(line: string): void;
    assign(type: string, subtype: string, value: string): void;
    get(): ISongMeta;
}
//# sourceMappingURL=SongMetaFactory.d.ts.map