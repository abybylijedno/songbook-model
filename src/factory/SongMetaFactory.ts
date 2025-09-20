import { type ISongMeta, type ISongMetaUrl } from '../model';
import { findEnum as findMetaUrlTypeEnum } from '../model/SongMetaUrlType';

const REGEXP: RegExp =
  /^> meta\/(?<type>[^:/]+)(?:\/(?<subtype>[^:]+))?: *(?<value>.+)$/;

type SongMetaKeys = keyof ISongMeta;

export class SongMetaFactory implements ISongMeta {
  author?: string;
  url?: ISongMetaUrl;
  originalTitle?: string;
  alternativeTitle?: string;
  album?: string;
  copyright?: string;
  translation?: string;
  basedOn?: string;
  lyrics?: string;
  music?: string;

  processLine(line: string) {
    const match: RegExpMatchArray | null = line.match(REGEXP);
    if (match == null || !match.groups) {
      throw new Error(`Error parsing song meta line: ${line}`);
    }

    return this.assign(
      match.groups.type,
      match.groups.subtype,
      match.groups.value
    );
  }

  assign(type: string, subtype: string, value: string) {
    switch(type) {
      case 'author':
        this.author = value;
        break;

      case 'url':
        this.url = { 
          type: findMetaUrlTypeEnum(subtype), 
          value
        } as ISongMetaUrl;
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

  get(): ISongMeta {
    const meta: ISongMeta = {};
    
    // Loop over this object's keys and assign them to the return object, only if the value is not undefined
    for (const key in this) {
      if (this[key as SongMetaKeys] !== undefined) {
        // @ts-ignore
        meta[key as SongMetaKeys] = this[key as SongMetaKeys];
      }
    }

    return meta;
  }
      
}
