import { SongMetaUrlType, findEnum } from '../SongMetaUrlType';

describe('SongMetaUrlType', () => {
  describe('enum values', () => {
    it('should have correct enum values', () => {
      expect(SongMetaUrlType.YOUTUBE).toBe('youtube');
      expect(SongMetaUrlType.SPOTIFY).toBe('spotify');
    });

    it('should have only expected enum members', () => {
      const enumValues = Object.values(SongMetaUrlType);
      expect(enumValues).toHaveLength(2);
      expect(enumValues).toContain('youtube');
      expect(enumValues).toContain('spotify');
    });
  });

  describe('findEnum', () => {
    it('should find YOUTUBE enum by value', () => {
      expect(findEnum('youtube')).toBe(SongMetaUrlType.YOUTUBE);
    });

    it('should find SPOTIFY enum by value', () => {
      expect(findEnum('spotify')).toBe(SongMetaUrlType.SPOTIFY);
    });

    it('should throw error for unknown enum value', () => {
      expect(() => findEnum('unknown')).toThrow("Couldn't find enum matching 'unknown'");
    });

    it('should throw error for empty string', () => {
      expect(() => findEnum('')).toThrow("Couldn't find enum matching ''");
    });

    it('should throw error for null/undefined values', () => {
      expect(() => findEnum(null as any)).toThrow("Couldn't find enum matching 'null'");
      expect(() => findEnum(undefined as any)).toThrow("Couldn't find enum matching 'undefined'");
    });

    it('should be case sensitive', () => {
      expect(() => findEnum('YOUTUBE')).toThrow("Couldn't find enum matching 'YOUTUBE'");
      expect(() => findEnum('YouTube')).toThrow("Couldn't find enum matching 'YouTube'");
    });
  });
});
