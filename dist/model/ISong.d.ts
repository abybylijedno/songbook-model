import type { ISongMeta } from './ISongMeta.js';
import type { ISongVerse } from './ISongVerse.js';
export interface ISong {
    slug: string;
    title: string;
    meta: ISongMeta;
    verses: ISongVerse[];
    searchText: string;
}
//# sourceMappingURL=ISong.d.ts.map