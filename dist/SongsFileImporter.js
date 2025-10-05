import { HASH, SPACE, EMPTY_STRING } from './constants.js';
import { SongFactory } from './factory/SongFactory.js';
import debugModule from 'debug';
const debug = debugModule('SongsFileImporter');
const FILE_BEGINING = HASH + SPACE;
const FILE_BEGINING_REGEXP = new RegExp(`^${FILE_BEGINING}.+\n+`);
const SONG_BEGINING = HASH + HASH + SPACE;
const SONG_BEGINING_REGEXP = new RegExp(`^${SONG_BEGINING}(?<title>.+)\n+`);
export class SongsFileImporter {
    /**
     * Process content of the songs file and return array of songs
     */
    process(content) {
        const songs = [];
        // Remove file begining if exists
        debug(`Got content: ${content}`);
        content = content.trimStart().replace(FILE_BEGINING_REGEXP, EMPTY_STRING).trim();
        debug(`Trimmed content: ${content}`);
        let nextSplitIndex;
        // Clean junk before the first song
        nextSplitIndex = content.indexOf(SONG_BEGINING);
        if (nextSplitIndex === 0) {
            debug(`Content starts with a song - no junk to remove.`);
        }
        else if (nextSplitIndex > 0) {
            debug(`Removing junk before the first song...`);
            content = content.substring(nextSplitIndex).trim();
        }
        else {
            debug(`No valid song found, clearing content.`);
            content = '';
        }
        debug(`Content after removing junk: ${content}`);
        // Process songs one by one
        do {
            nextSplitIndex = content.indexOf(SONG_BEGINING, SONG_BEGINING.length);
            debug(`Next song begining at index: ${nextSplitIndex}`);
            if (nextSplitIndex < 0) {
                debug(`No more songs found, processing remaining content.`);
                nextSplitIndex = content.length;
            }
            const songContent = content.substring(0, nextSplitIndex).trim();
            debug(`Processing song content: ${songContent}`);
            const match = songContent.match(SONG_BEGINING_REGEXP);
            if (match?.groups?.title == null) {
                console.warn(`Song title not found in song begining: ${songContent}`);
                continue;
            }
            const title = match.groups.title.trim();
            const factory = new SongFactory(title);
            const songBody = songContent.substring(match[0].length).trim();
            try {
                factory.process(songBody);
                songs.push(factory.get());
            }
            catch (error) {
                console.error(`Error importing song "${title}":`, error);
            }
            content = content.substring(nextSplitIndex).trim();
            debug(`Remaining content length: ${content.length}`);
        } while (content.length > 0);
        return songs;
    }
}
//# sourceMappingURL=SongsFileImporter.js.map