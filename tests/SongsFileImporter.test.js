import { jest } from '@jest/globals';
import { SongsFileImporter } from '../dist/SongsFileImporter.js';

describe('SongsFileImporter', () => {
  let importer;

  beforeEach(() => {
    importer = new SongsFileImporter();
    jest.clearAllMocks();
  });

  describe('process', () => {
    it('should process single song', () => {
      const content = `
# My Songbook

## Amazing Grace

> meta/author: John Newton

Amazing grace | C
How sweet the sound | F
`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Amazing Grace');
      expect(result[0].slug).toBe('amazing-grace');
      expect(result[0].meta.author).toBe('John Newton');
      expect(result[0].verses).toHaveLength(1);
      expect(result[0].verses[0].lines).toHaveLength(2);
      expect(result[0].verses[0].lines[0]).toMatchObject(
        { text: 'Amazing grace', chord: 'C' }
      );
      expect(result[0].verses[0].lines[1]).toMatchObject(
        { text: 'How sweet the sound', chord: 'F' }
      );
    });

    it('should process multiple songs', () => {
      const content = `
# My Songbook

## First Song
Line 1 | C

## Second Song
Line 2 | G
`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('First Song');
      expect(result[1].title).toBe('Second Song');
    });

    it('should handle songs with multiple verses', () => {
      const content = `
# My Songbook

## Test Song

Verse 1 Line 1 | C
Verse 1 Line 2 | F

Verse 2 Line 1 | G
Verse 2 Line 2 | Am
`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Song');
      expect(result[0].verses).toHaveLength(2);
      expect(result[0].verses[0].lines).toHaveLength(2);
      expect(result[0].verses[1].lines).toHaveLength(2);
    });

    it('should warn about malformed song beginnings', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      const content = `
# My Songbook

Some random text without song marker
`;
      
      const result = importer.process(content);
      
      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Song title not found'));
      
      consoleSpy.mockRestore();
    });

    it('should handle error during song processing', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // This would cause an error if meta processing fails
      const content = `
## Test Song

> meta/invalid-format-line
`;
      
      const result = importer.process(content);
      
      // Should still return empty array but log error
      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      consoleErrorSpy.mockRestore();
    });

    it('should generate search text correctly', () => {
      const content = `
## Amazing Grace

> meta/author: John Newton

Amazing grace, how sweet | C
That saved a wretch like me | F
`;
      
      const result = importer.process(content);
      
      expect(result[0].searchText).toContain('Amazing Grace');
      expect(result[0].searchText).toContain('Amazing grace, how sweet');
      expect(result[0].searchText).toContain('John Newton');
    });
  });
});