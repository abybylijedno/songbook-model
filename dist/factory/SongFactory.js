import { HASH, SPACE, GT } from '../constants';
import { SongMetaFactory } from './SongMetaFactory';
import { SongVerseFactory } from './SongVerseFactory';
import { slugify } from '../utils';
const BEGINING = HASH + HASH + SPACE;
export class SongFactory {
    static isBegining(line) {
        return line.startsWith(BEGINING);
    }
    slug;
    title;
    meta;
    verses;
    searchText;
    currentVerse;
    constructor(title) {
        this.slug = "";
        this.title = title.substring(BEGINING.length);
        this.meta = new SongMetaFactory();
        this.verses = [];
        this.searchText = "";
        this.currentVerse = undefined;
    }
    finishVerse() {
        if (this.currentVerse != null) {
            const verse = this.currentVerse.get();
            if (verse != null) {
                this.verses.push(verse);
            }
            delete this.currentVerse;
        }
    }
    addLine(line) {
        if (line.startsWith(GT)) {
            try {
                this.meta.processLine(line);
            }
            catch (e) {
                console.warn(e.message);
            }
        }
        else {
            if (this.currentVerse == null) {
                this.currentVerse = new SongVerseFactory();
            }
            this.currentVerse.processLine(line);
        }
    }
    get() {
        return createSongObject(this.title, this.meta.get(), this.verses);
    }
}
export const createSongObject = (title, meta, verses) => {
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
};
//# sourceMappingURL=SongFactory.js.map