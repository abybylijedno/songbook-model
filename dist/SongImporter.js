import { HASH, SPACE, NL, EMPTY_STRING } from './constants.js';
import { SongFactory } from './factory/SongFactory.js';
const BEGINING = HASH + SPACE;
export class SongImporter {
    songs;
    currentSong;
    constructor() {
        this.songs = [];
        this.currentSong = null;
    }
    getLines(content) {
        const lines = content.split(NL);
        while (lines.length > 0) {
            const line = lines.shift();
            if (typeof line == 'undefined' || line.startsWith(BEGINING)) {
                break;
            }
        }
        return lines;
    }
    beginNewSong(line) {
        this.currentSong = new SongFactory(line);
    }
    endCurrentsong() {
        if (this.currentSong != null) {
            this.songs.push(this.currentSong.get());
        }
        this.currentSong = null;
    }
    process(content) {
        this.songs = [];
        const lines = this.getLines(content);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (SongFactory.isBegining(line)) {
                this.endCurrentsong();
                this.beginNewSong(line);
                continue;
            }
            else if (this.currentSong == null) {
                continue;
            }
            else if (line == EMPTY_STRING) {
                this.currentSong.finishVerse();
                continue;
            }
            this.currentSong.addLine(line);
        }
        this.currentSong?.finishVerse();
        this.endCurrentsong();
        return this.songs;
    }
}
//# sourceMappingURL=SongImporter.js.map