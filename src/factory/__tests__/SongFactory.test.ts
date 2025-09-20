import { jest } from '@jest/globals';
import { SongFactory, createSongObject } from '../SongFactory';
import { ISongMeta, ISongVerse } from '../../model';

describe('SongFactory', () => {
  describe('isBegining', () => {
    it('should return true for song title line', () => {
      expect(SongFactory.isBegining('## Song Title')).toBe(true);
    });

    it('should return false for single hash', () => {
      expect(SongFactory.isBegining('# Not a song title')).toBe(false);
    });

    it('should return false for regular text', () => {
      expect(SongFactory.isBegining('Regular text')).toBe(false);
    });

    it('should return false for meta lines', () => {
      expect(SongFactory.isBegining('> meta/author: John')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(SongFactory.isBegining('')).toBe(false);
    });
  });

  describe('constructor', () => {
    it('should initialize with title without prefix', () => {
      const factory = new SongFactory('## Amazing Grace');
      expect(factory.title).toBe('Amazing Grace');
    });

    it('should initialize with empty slug', () => {
      const factory = new SongFactory('## Test Song');
      expect(factory.slug).toBe('');
    });

    it('should initialize with empty verses array', () => {
      const factory = new SongFactory('## Test Song');
      expect(factory.verses).toEqual([]);
    });

    it('should initialize with empty search text', () => {
      const factory = new SongFactory('## Test Song');
      expect(factory.searchText).toBe('');
    });

    it('should initialize with undefined current verse', () => {
      const factory = new SongFactory('## Test Song');
      expect(factory.currentVerse).toBeUndefined();
    });
  });

  describe('finishVerse', () => {
    let factory: SongFactory;

    beforeEach(() => {
      factory = new SongFactory('## Test Song');
    });

    it('should add current verse to verses and reset current verse', () => {
      // Create a mock current verse
      const mockVerse = {
        get: jest.fn(() => ({ uuid: 'verse-uuid', lines: [] }))
      };
      factory.currentVerse = mockVerse as any;

      factory.finishVerse();

      expect(factory.verses).toHaveLength(1);
      expect(factory.currentVerse).toBeUndefined();
      expect(mockVerse.get).toHaveBeenCalled();
    });

    it('should do nothing if no current verse', () => {
      factory.finishVerse();
      expect(factory.verses).toHaveLength(0);
    });
  });

  describe('addLine', () => {
    let factory: SongFactory;

    beforeEach(() => {
      factory = new SongFactory('## Test Song');
    });

    it('should process meta line when starting with >', () => {
      const spiedProcessLine = jest.spyOn(factory.meta, 'processLine');
      factory.addLine('> meta/author: John Doe');

      expect(spiedProcessLine).toHaveBeenCalledWith('> meta/author: John Doe');
      expect(spiedProcessLine).toHaveBeenCalledTimes(1);
      jest.restoreAllMocks();
    });

    it('should handle invalid meta', () => {
      const spiedConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      factory.addLine('> meta/invalid: value');
      expect(spiedConsoleWarn).toHaveBeenCalledWith('Unknown song meta type: invalid');
    });

    it('should create new verse if none exists for non-meta line', () => {
      factory.addLine('First line | C');

      expect(factory.currentVerse).toBeDefined();
      expect(factory.currentVerse?.lines).toHaveLength(1)
      expect(factory.currentVerse?.lines[0]).toMatchObject({"chord": "C", "text": "First line"});
    });

    it('should be able to add multiple lines', () => {
      factory.addLine('First line | C');
      factory.addLine('Second line | G');

      expect(factory.currentVerse).toBeDefined();
      expect(factory.currentVerse?.lines).toHaveLength(2);
      expect(factory.currentVerse?.lines[1]).toMatchObject({"chord": "G", "text": "Second line"});
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
    const mockMeta: ISongMeta = { author: 'Test Author' };
    const mockVerses: ISongVerse[] = [
      {
        uuid: 'verse-1',
        lines: [
          { uuid: 'line-1', text: 'Amazing grace', chord: 'C' },
          { uuid: 'line-2', text: 'How sweet the sound', chord: 'F' }
        ]
      }
    ];

    it('should create song object with correct structure', () => {
      const result = createSongObject('Amazing Grace', mockMeta, mockVerses);
      
      expect(result).toEqual({
        slug: 'amazing-grace',
        title: 'Amazing Grace',
        meta: mockMeta,
        verses: mockVerses,
        searchText: expect.any(String)
      });
    });

    it('should generate search text from title, verses, and meta', () => {
      const result = createSongObject('Amazing Grace', mockMeta, mockVerses);
      
      expect(result.searchText).toContain('Amazing Grace');
      expect(result.searchText).toContain('Amazing grace');
      expect(result.searchText).toContain('How sweet the sound');
      expect(result.searchText).toContain('Test Author');
    });

    it('should handle empty verses', () => {
      const result = createSongObject('Test Song', mockMeta, []);
      
      expect(result.verses).toEqual([]);
      expect(result.searchText).toContain('Test Song');
      expect(result.searchText).toContain('Test Author');
    });

    it('should handle empty meta', () => {
      const result = createSongObject('Test Song', {}, mockVerses);
      
      expect(result.meta).toEqual({});
      expect(result.searchText).toContain('Test Song');
    });
  });
});
