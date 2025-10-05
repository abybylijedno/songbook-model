import { GT, NL } from '../constants.js';
import { SongMetaFactory } from './SongMetaFactory.js';
import { SongVerseFactory } from './SongVerseFactory.js';
import { slugify } from '../utils.js';
const SEPARATOR = NL + NL;
export class SongFactory {
    slug;
    title;
    meta;
    verses;
    searchText;
    currentVerse;
    constructor(title) {
        this.slug = slugify(title);
        this.title = title;
        this.meta = new SongMetaFactory();
        this.verses = [];
        this.searchText = "";
    }
    process(content) {
        content = content.trim();
        let part;
        let nextSplitIndex;
        do {
            nextSplitIndex = content.indexOf(SEPARATOR);
            if (nextSplitIndex < 0) {
                nextSplitIndex = content.length;
            }
            part = content.substring(0, nextSplitIndex).trim();
            if (part.startsWith(GT)) {
                this.meta.processPart(part);
            }
            else {
                const vf = new SongVerseFactory();
                const verse = vf.processPart(part);
                if (verse != null) {
                    this.verses.push(verse);
                }
            }
            content = content.substring(nextSplitIndex + SEPARATOR.length).trim();
        } while (content.length > 0);
    }
    get() {
        return createSongObject(this.slug, this.title, this.meta.get(), this.verses);
    }
}
export const createSongObject = (slug, title, meta, verses) => {
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
};
//# sourceMappingURL=SongFactory.js.map