import { jest } from '@jest/globals';
import { VerseLineFactory, createVerseLineObject } from '../../factory/VerseLineFactory';
import { IVerseLine } from '../../model/IVerseLine';


describe('VerseLineFactory', () => {
  describe('fromLine', () => {
    it('should parse line with text and chord', () => {
      const line = 'Hello world | C';
      const result = VerseLineFactory.fromLine(line);
      
      expect(result).toMatchObject({
        text: 'Hello world',
        chord: 'C'
      });
    });

    it('should parse line with empty chord', () => {
      const line = 'Hello world | ';
      const result = VerseLineFactory.fromLine(line);
      
      expect(result).toMatchObject({
        text: 'Hello world',
        chord: ''
      });
    });

    it('should parse line with multiple separators', () => {
      const line = 'Hello | world | C | D';
      const result = VerseLineFactory.fromLine(line);
      
      expect(result).toMatchObject({
        text: 'Hello',
        chord: 'world'
      });
    });

    it('should handle empty text', () => {
      const line = ' | C';
      const result = VerseLineFactory.fromLine(line);
      
      expect(result).toMatchObject({
        text: '',
        chord: 'C'
      });
    });

    it('should handle complex chord notation', () => {
      const line = 'Amazing grace | Cmaj7/E';
      const result = VerseLineFactory.fromLine(line);
      
      expect(result).toMatchObject({
        text: 'Amazing grace',
        chord: 'Cmaj7/E'
      });
    });
  });

  describe('createVerseLineObject', () => {
    it('should create verse line object with uuid', () => {
      const result = createVerseLineObject('test text', 'Am');
      
      expect(result).toMatchObject({
        text: 'test text',
        chord: 'Am'
      });
    });

    it('should handle empty parameters', () => {
      const result = createVerseLineObject('', '');
      
      expect(result).toMatchObject({
        text: '',
        chord: ''
      });
    });
  });
});
