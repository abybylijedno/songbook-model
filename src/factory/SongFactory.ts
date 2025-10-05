import { HASH, SPACE, GT, NL } from '../constants.js';
import { SongMetaFactory } from './SongMetaFactory.js';
import { SongVerseFactory } from './SongVerseFactory.js';
import { type ISong, type ISongMeta, type ISongVerse } from '../model/index.js';
import { slugify } from '../utils.js';

const SEPARATOR = NL + NL;

export class SongFactory implements ISong {
  slug: string;
  title: string;
  meta: SongMetaFactory;
  verses: ISongVerse[];
  searchText: string;

  currentVerse?: SongVerseFactory;

  constructor(title: string) {
    this.slug = slugify(title);
    this.title = title;
    this.meta = new SongMetaFactory();
    this.verses = [];
    this.searchText = "";
  }

  process(content: string): void {
    content = content.trim();

    let part: string;
    let nextSplitIndex: number;
    do {
      nextSplitIndex = content.indexOf(SEPARATOR);
      if (nextSplitIndex < 0) {
        nextSplitIndex = content.length;
      }
      
      part = content.substring(0, nextSplitIndex).trim();

      if (part.startsWith(GT)) {
        this.meta.processPart(part);
      } else {
        const vf = new SongVerseFactory();
        const verse = vf.processPart(part);

        if (verse != null) {
          this.verses.push(verse);
        }
      }

      content = content.substring(nextSplitIndex + SEPARATOR.length).trim();
    } while (content.length > 0);
  }

  get(): ISong {
    return createSongObject(this.slug, this.title, this.meta.get(), this.verses);
  }
}

export const createSongObject = (slug: string, title: string, meta: ISongMeta, verses: ISongVerse[]): ISong => {
  const searchText = [
    title,
    verses.map((verse) => verse.lines.map((line) => line.text).join("\n")).join("\n"),
    Object.values(meta).join("\n").replace(/ ?\[object Object\] ?/, " ")
  ].join("\n");
  // console.log(searchText);
  return {
    slug,
    title,
    meta,
    verses,
    searchText
  };
}
