import { jest } from '@jest/globals';
import { SongVerseFactory, createSongVerseObject } from '../../factory/SongVerseFactory';
import { IVerseLine } from '../../model/IVerseLine';


describe('SongVerseFactory', () => {
  let factory: SongVerseFactory;

  beforeEach(() => {
    factory = new SongVerseFactory();
  });

  describe('constructor', () => {
    it('should initialize with empty lines array', () => {
      expect(factory.lines).toBeInstanceOf(Array);
      expect(factory.lines).toHaveLength(0);
    });
  });

  describe('processLine', () => {
    it('should add line to lines array', () => {
      factory.processLine('Hello world | C');
      
      expect(factory.lines).toBeInstanceOf(Array);
      expect(factory.lines).toHaveLength(1);
      expect(factory.lines[0]).toMatchObject({
        text: 'Hello world',
        chord: 'C'
      });
    });

    it('should add multiple lines', () => {
      factory.processLine('First line | C');
      factory.processLine('Second line | G');
      
      expect(factory.lines).toBeInstanceOf(Array);
      expect(factory.lines).toHaveLength(2);
      expect(factory.lines[1]).toMatchObject({
        text: 'Second line',
        chord: 'G'
      });
    });
  });

  describe('isEmpty', () => {
    it('should return true for new factory', () => {
      expect(factory.isEmpty()).toBe(true);
    });

    it('should return false after adding lines', () => {
      factory.processLine('Hello | C');
      expect(factory.isEmpty()).toBe(false);
    });
  });

  describe('get', () => {
    it('should return verse object with uuid and lines', () => {
      factory.processLine('Line 1 | C');
      factory.processLine('Line 2 | G');
      
      const result = factory.get();
      
      expect(result).not.toBeNull();
      expect(result).toHaveProperty('lines');
      expect(result?.lines).toBeInstanceOf(Array);
      expect(result?.lines).toHaveLength(2);
      expect(result?.lines[0]).toMatchObject({ text: 'Line 1', chord: 'C' });
      expect(result?.lines[1]).toMatchObject({ text: 'Line 2', chord: 'G' });
    });

    it('should return null', () => {
      const result = factory.get();
      
      expect(result).toBeNull();
    });
  });

  describe('createSongVerseObject', () => {
    it('should create verse object with provided lines', () => {
      const lines: IVerseLine[] = [
        { text: 'Test', chord: 'C' },
        { text: 'Test2', chord: 'G' }
      ];
      
      const result = createSongVerseObject(lines);

      expect(result).toHaveProperty('lines');
      expect(result.lines).toBeInstanceOf(Array);
      expect(result.lines).toHaveLength(2);
      expect(result.lines[0]).toMatchObject({ text: 'Test', chord: 'C' });
      expect(result.lines[1]).toMatchObject({ text: 'Test2', chord: 'G' });
    });

    it('should handle empty lines array', () => {
      const result = createSongVerseObject([]);

      expect(result.lines).toBeInstanceOf(Array);
      expect(result.lines).toHaveLength(0);
    });
  });
});
