import { slugify } from '../dist/utils.js';

describe('utils', () => {
  describe('slugify', () => {
    it('should convert text to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello! @#$ World?')).toBe('hello-world');
    });

    it('should handle accented characters', () => {
      expect(slugify('Café Naïve')).toBe('cafe-naive');
    });

    it('should handle Polish characters', () => {
      expect(slugify('Żółć Gęślą')).toBe('zolc-gesla');
    });

    it('should handle multiple spaces and dashes', () => {
      expect(slugify('Hello   ---   World')).toBe('hello-world');
    });

    it('should trim leading and trailing spaces', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle numbers', () => {
      expect(slugify('Song 123')).toBe('song-123');
    });

    it('should remove leading and trailing dashes', () => {
      expect(slugify('-Hello World-')).toBe('hello-world');
    });

    it('should handle consecutive special characters', () => {
      expect(slugify('Hello!!!World???')).toBe('hello-world');
    });

    it('should handle mixed language text', () => {
      expect(slugify('Hello Świat 世界')).toBe('hello-swiat');
    });
  });
});
