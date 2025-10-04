import { SongMetaFactory } from '../../dist/factory/SongMetaFactory.js';
import { SongMetaUrlType } from '../../dist/model/SongMetaUrlType.js';

describe('SongMetaFactory', () => {
  let factory;

  beforeEach(() => {
    factory = new SongMetaFactory();
  });

  describe('processLine', () => {
    it('should parse author meta', () => {
      factory.processLine('> meta/author: John Doe');
      expect(factory.author).toBe('John Doe');
    });

    it('should parse original title meta', () => {
      factory.processLine('> meta/original-title: Original Title');
      expect(factory.originalTitle).toBe('Original Title');
    });

    it('should parse alternative title meta', () => {
      factory.processLine('> meta/alternative-title: Alt Title');
      expect(factory.alternativeTitle).toBe('Alt Title');
    });

    it('should parse album meta', () => {
      factory.processLine('> meta/album: Great Album');
      expect(factory.album).toBe('Great Album');
    });

    it('should parse copyright meta', () => {
      factory.processLine('> meta/copyright: © 2023');
      expect(factory.copyright).toBe('© 2023');
    });

    it('should parse translation meta', () => {
      factory.processLine('> meta/translation: John Translator');
      expect(factory.translation).toBe('John Translator');
    });

    it('should parse based-on meta', () => {
      factory.processLine('> meta/based-on: Original Work');
      expect(factory.basedOn).toBe('Original Work');
    });

    it('should parse lyrics meta', () => {
      factory.processLine('> meta/lyrics: Lyrics Author');
      expect(factory.lyrics).toBe('Lyrics Author');
    });

    it('should parse music meta', () => {
      factory.processLine('> meta/music: Music Composer');
      expect(factory.music).toBe('Music Composer');
    });

    it('should parse YouTube URL meta', () => {
      factory.processLine('> meta/url/youtube: https://youtube.com/watch?v=123');
      expect(factory.url).toEqual({
        type: SongMetaUrlType.YOUTUBE,
        value: 'https://youtube.com/watch?v=123'
      });
    });

    it('should parse Spotify URL meta', () => {
      factory.processLine('> meta/url/spotify: https://spotify.com/track/123');
      expect(factory.url).toEqual({
        type: SongMetaUrlType.SPOTIFY,
        value: 'https://spotify.com/track/123'
      });
    });

    it('should handle values with colons', () => {
      factory.processLine('> meta/author: John Doe: The Great');
      expect(factory.author).toBe('John Doe: The Great');
    });

    it('should handle values with spaces', () => {
      factory.processLine('> meta/author:   John Doe   ');
      expect(factory.author).toBe('John Doe   ');
    });

    it('should throw error for invalid meta line format', () => {
      expect(() => factory.processLine('invalid line')).toThrow('Error parsing song meta line: invalid line');
    });

    it('should throw error for unknown meta type', () => {
      expect(() => factory.processLine('> meta/unknown: value')).toThrow('Unknown song meta type: unknown');
    });

    it('should throw error for invalid URL type', () => {
      expect(() => factory.processLine('> meta/url/tiktok: https://tiktok.com')).toThrow("Couldn't find enum matching 'tiktok'");
    });
  });

  describe('assign', () => {
    it('should assign author', () => {
      factory.assign('author', '', 'Test Author');
      expect(factory.author).toBe('Test Author');
    });

    it('should assign URL with type', () => {
      factory.assign('url', 'youtube', 'https://youtube.com');
      expect(factory.url).toEqual({
        type: SongMetaUrlType.YOUTUBE,
        value: 'https://youtube.com'
      });
    });

    it('should throw error for unknown type', () => {
      expect(() => factory.assign('unknown', '', 'value')).toThrow('Unknown song meta type: unknown');
    });
  });

  describe('get', () => {
    it('should return empty object for new factory', () => {
      const result = factory.get();
      expect(result).toEqual({});
    });

    it('should return only defined properties', () => {
      factory.author = 'John Doe';
      factory.album = 'Great Album';
      // originalTitle is undefined, should not be included
      
      const result = factory.get();
      expect(result).toEqual({
        author: 'John Doe',
        album: 'Great Album'
      });
    });

    it('should include all defined meta properties', () => {
      factory.author = 'John Doe';
      factory.originalTitle = 'Original';
      factory.alternativeTitle = 'Alternative';
      factory.album = 'Album';
      factory.copyright = '© 2023';
      factory.translation = 'Translator';
      factory.basedOn = 'Based On';
      factory.lyrics = 'Lyricist';
      factory.music = 'Composer';
      factory.url = { type: SongMetaUrlType.YOUTUBE, value: 'https://youtube.com' };
      
      const result = factory.get();
      expect(result).toEqual({
        author: 'John Doe',
        originalTitle: 'Original',
        alternativeTitle: 'Alternative',
        album: 'Album',
        copyright: '© 2023',
        translation: 'Translator',
        basedOn: 'Based On',
        lyrics: 'Lyricist',
        music: 'Composer',
        url: { type: SongMetaUrlType.YOUTUBE, value: 'https://youtube.com' }
      });
    });
  });
});
