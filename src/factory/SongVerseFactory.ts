import { v4 as uuid } from 'uuid';
import { VerseLineFactory } from './VerseLineFactory.js';
import { type ISongVerse, type IVerseLine } from '../model/index.js';

export class SongVerseFactory implements ISongVerse {
  lines: IVerseLine[];

  constructor() {
    this.lines = [];
  }

  processPart(part: string): ISongVerse | null {
    const lines = part.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

    for (const line of lines) {
      this.processLine(line);
    }

    return this.get();
  }

  processLine(line: string): void {
    this.lines.push(VerseLineFactory.fromLine(line));
  }

  isEmpty(): boolean {
    return this.lines.length == 0;
  }

  get(): ISongVerse | null {
    return this.lines.length > 0 ? createSongVerseObject(this.lines) : null;
  }
}

export const createSongVerseObject = (lines: IVerseLine[]): ISongVerse => {
  return {
    uuid: uuid(),
    lines
  };
}
