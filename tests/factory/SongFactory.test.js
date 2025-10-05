import { jest } from '@jest/globals';
import { SongFactory, createSongObject } from '../../dist/factory/SongFactory.js';
describe('SongFactory', () => {
  describe('constructor', () => {
    it('should initialize with title', () => {
      const factory = new SongFactory('Amazing Grace');
      expect(factory.title).toBe('Amazing Grace');
    });

    it('should initialize with slugified title', () => {
      const factory = new SongFactory('Test Song');
      expect(factory.slug).toBe('test-song');
    });

    it('should initialize with empty verses array', () => {
      const factory = new SongFactory('Test Song');
      expect(factory.verses).toEqual([]);
    });

    it('should initialize with empty search text', () => {
      const factory = new SongFactory('Test Song');
      expect(factory.searchText).toBe('');
    });
  });

  describe('process', () => {
    let factory;

    beforeEach(() => {
      factory = new SongFactory('Test Song');
    });

    it('should process meta content', () => {
      const content = '> meta/author: John Doe\n> meta/album: Great Songs';
      factory.process(content);

      expect(factory.meta.author).toBe('John Doe');
      expect(factory.meta.album).toBe('Great Songs');
    });

    it('should process verse content', () => {
      const content = 'First line | C\nSecond line | G';
      factory.process(content);

      expect(factory.verses).toHaveLength(1);
      expect(factory.verses[0].lines).toHaveLength(2);
      expect(factory.verses[0].lines[0]).toMatchObject({ text: 'First line', chord: 'C' });
      expect(factory.verses[0].lines[1]).toMatchObject({ text: 'Second line', chord: 'G' });
    });

    it('should process mixed meta and verse content', () => {
      const content = '> meta/author: John Doe\n\nFirst line | C\nSecond line | G';
      factory.process(content);

      expect(factory.meta.author).toBe('John Doe');
      expect(factory.verses).toHaveLength(1);
      expect(factory.verses[0].lines).toHaveLength(2);
    });

    it('should process multiple verses separated by double newlines', () => {
      const content = 'Verse 1 Line 1 | C\nVerse 1 Line 2 | F\n\nVerse 2 Line 1 | G\nVerse 2 Line 2 | Am';
      factory.process(content);

      expect(factory.verses).toHaveLength(2);
      expect(factory.verses[0].lines).toHaveLength(2);
      expect(factory.verses[1].lines).toHaveLength(2);
    });
  });

  describe('get', () => {
    it('should return ISong object', () => {
      const factory = new SongFactory('## Test Song');
      const result = factory.get();
      
      expect(result).toHaveProperty('slug');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('meta');
      expect(result).toHaveProperty('verses');
      expect(result).toHaveProperty('searchText');
    });
  });

  describe('createSongObject', () => {
    const mockMeta = { author: 'Test Author' };
    const mockVerses = [
      {
        uuid: 'verse-1',
        lines: [
          { uuid: 'line-1', text: 'Amazing grace', chord: 'C' },
          { uuid: 'line-2', text: 'How sweet the sound', chord: 'F' }
        ]
      }
    ];

    it('should create song object with correct structure', () => {
      const result = createSongObject('amazing-grace', 'Amazing Grace', mockMeta, mockVerses);
      
      expect(result).toEqual({
        slug: 'amazing-grace',
        title: 'Amazing Grace',
        meta: mockMeta,
        verses: mockVerses,
        searchText: expect.any(String)
      });
    });

    it('should generate search text from title, verses, and meta', () => {
      const result = createSongObject('amazing-grace', 'Amazing Grace', mockMeta, mockVerses);
      
      expect(result.searchText).toContain('Amazing Grace');
      expect(result.searchText).toContain('Amazing grace');
      expect(result.searchText).toContain('How sweet the sound');
      expect(result.searchText).toContain('Test Author');
    });

    it('should handle empty verses', () => {
      const result = createSongObject('test-song', 'Test Song', mockMeta, []);
      
      expect(result.verses).toEqual([]);
      expect(result.searchText).toContain('Test Song');
      expect(result.searchText).toContain('Test Author');
    });

    it('should handle empty meta', () => {
      const result = createSongObject('test-song', 'Test Song', {}, mockVerses);
      
      expect(result.meta).toEqual({});
      expect(result.searchText).toContain('Test Song');
    });
  });
});
