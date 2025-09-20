import { jest } from '@jest/globals';
import { SongImporter } from '../SongImporter';


describe('SongImporter', () => {
  let importer: SongImporter;

  beforeEach(() => {
    importer = new SongImporter();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with empty songs array', () => {
      expect(importer.songs).toEqual([]);
    });

    it('should initialize with null current song', () => {
      expect(importer.currentSong).toBeNull();
    });
  });

  describe('getLines', () => {
    it('should return all lines after first song marker', () => {
      const content = 'Some header\n# Introduction\n## First Song\nVerse 1\nVerse 2';
      const result = importer.getLines(content);
      
      expect(result).toEqual(['## First Song', 'Verse 1', 'Verse 2']);
    });

    it('should handle content without song marker', () => {
      const content = 'No songs here\nJust text';
      const result = importer.getLines(content);
      
      expect(result).toEqual([]);
    });

    it('should handle empty content', () => {
      const content = '';
      const result = importer.getLines(content);
      
      expect(result).toEqual([]);
    });

    it('should handle content starting with song marker', () => {
      const content = '# Start\nLine 1\nLine 2';
      const result = importer.getLines(content);
      
      expect(result).toEqual(['Line 1', 'Line 2']);
    });
  });

  describe('beginNewSong', () => {
    it('should create new SongFactory with given line', () => {
      importer.beginNewSong('## Test Song');
      
      expect(importer.currentSong).not.toBeNull();
      expect(importer.currentSong?.title).toBe('Test Song');
    });
  });

  describe('endCurrentsong', () => {
    it('should add current song to songs array and reset current song', () => {
      importer.beginNewSong('## Test Song');
      importer.process("Abba | C")
      
      importer.endCurrentsong();
      
      expect(importer.songs).toHaveLength(1);
      expect(importer.currentSong).toBeNull();
    });

    it('should do nothing if no current song', () => {
      importer.endCurrentsong();
      
      expect(importer.songs).toHaveLength(0);
      expect(importer.currentSong).toBeNull();
    });
  });

  describe('process', () => {
    it('should process single song', () => {
      const content = `
# Header

## Amazing Grace

> meta/author: John Newton

Amazing grace | C
How sweet the sound | F
`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Amazing Grace');
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
# Header
## First Song
Line 1 | C

## Second Song
Line 2 | G
`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(2);
    });

    it('should trim whitespace from lines', () => {
      const content = `
# Header
## Test Song
  Line with spaces  | C  
`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Song');
      expect(result[0].verses).toHaveLength(1);
      expect(result[0].verses[0].lines).toHaveLength(1);
      expect(result[0].verses[0].lines[0]).toMatchObject(
        { text: 'Line with spaces', chord: 'C' }
      );
    });

    it('should not treat empty line as new verse', () => {
      const content = `
# Header
## Test Song

Line 1 | C


`;
      
      const result = importer.process(content);
      
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Song');
      expect(result[0].verses).toHaveLength(1);
      expect(result[0].verses[0].lines).toHaveLength(1);
      expect(result[0].verses[0].lines[0]).toMatchObject(
        { text: 'Line 1', chord: 'C' }
      );
    });

  });
});
