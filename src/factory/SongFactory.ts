import { HASH, SPACE, GT } from '../constants.js';
import { SongMetaFactory } from './SongMetaFactory.js';
import { SongVerseFactory } from './SongVerseFactory.js';
import { type ISong, type ISongMeta, type ISongVerse } from '../model/index.js';
import { slugify } from '../utils.js';

const BEGINING: string = HASH + HASH + SPACE;

export class SongFactory implements ISong {

  static isBegining(line: string): boolean {
    return line.startsWith(BEGINING);
  }

  slug: string;
  title: string;
  meta: SongMetaFactory;
  verses: ISongVerse[];
  searchText: string;

  currentVerse?: SongVerseFactory;

  constructor(title: string) {
    this.slug = "";
    this.title = title.substring(BEGINING.length);
    this.meta = new SongMetaFactory();
    this.verses = [];
    this.searchText = "";

    this.currentVerse = undefined;
  }

  finishVerse(): void {
    if (this.currentVerse != null) {
      const verse = this.currentVerse.get();
      if (verse != null) {
        this.verses.push(verse);
      }
      delete this.currentVerse;
    }
  }

  addLine(line: string): void {
    if (line.startsWith(GT)) {
      try {
        this.meta.processLine(line);
      } catch (e) {
        console.warn(e.message);
      }
    } else {
      if (this.currentVerse == null) {
        this.currentVerse = new SongVerseFactory();
      }

      this.currentVerse.processLine(line);
    }
  }

  get(): ISong {
    return createSongObject(this.title, this.meta.get(), this.verses);
  }
}

export const createSongObject = (title: string, meta: ISongMeta, verses: ISongVerse[]): ISong => {
  const searchText = [
    title,
    verses.map((verse) => verse.lines.map((line) => line.text).join("\n")).join("\n"),
    Object.values(meta).join("\n").replace(/ ?\[object Object\] ?/, " ")
  ].join("\n");
  // console.log(searchText);
  return {
    slug: slugify(title),
    title,
    meta,
    verses,
    searchText
  };
}
