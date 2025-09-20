import type { ISongMeta } from './ISongMeta';
import type { ISongVerse } from './ISongVerse';

export interface ISong {
  slug: string;
  title: string;
  meta: ISongMeta;
  verses: ISongVerse[];
  searchText: string;
}
