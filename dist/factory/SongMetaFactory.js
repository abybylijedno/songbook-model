import { findEnum as findMetaUrlTypeEnum } from '../model/SongMetaUrlType';
const REGEXP = /^> meta\/(?<type>[^:/]+)(?:\/(?<subtype>[^:]+))?: *(?<value>.+)$/;
export class SongMetaFactory {
    author;
    url;
    originalTitle;
    alternativeTitle;
    album;
    copyright;
    translation;
    basedOn;
    lyrics;
    music;
    processLine(line) {
        const match = line.match(REGEXP);
        if (match == null || !match.groups) {
            throw new Error(`Error parsing song meta line: ${line}`);
        }
        return this.assign(match.groups.type, match.groups.subtype, match.groups.value);
    }
    assign(type, subtype, value) {
        switch (type) {
            case 'author':
                this.author = value;
                break;
            case 'url':
                this.url = {
                    type: findMetaUrlTypeEnum(subtype),
                    value
                };
                break;
            case 'original-title':
                this.originalTitle = value;
                break;
            case 'alternative-title':
                this.alternativeTitle = value;
                break;
            case 'album':
                this.album = value;
                break;
            case 'copyright':
                this.copyright = value;
                break;
            case 'translation':
                this.translation = value;
                break;
            case 'based-on':
                this.basedOn = value;
                break;
            case 'lyrics':
                this.lyrics = value;
                break;
            case 'music':
                this.music = value;
                break;
            default:
                throw new Error(`Unknown song meta type: ${type}`);
        }
    }
    get() {
        const meta = {};
        // Loop over this object's keys and assign them to the return object, only if the value is not undefined
        for (const key in this) {
            if (this[key] !== undefined) {
                // @ts-ignore
                meta[key] = this[key];
            }
        }
        return meta;
    }
}
//# sourceMappingURL=SongMetaFactory.js.map