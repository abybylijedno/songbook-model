import { NL, HASH, SPACE, EMPTY_STRING, GT } from '../constants';

describe('constants', () => {
  it('should export correct string constants', () => {
    expect(NL).toBe('\n');
    expect(HASH).toBe('#');
    expect(SPACE).toBe(' ');
    expect(EMPTY_STRING).toBe('');
    expect(GT).toBe('>');
  });

  it('should have string type for all constants', () => {
    expect(typeof NL).toBe('string');
    expect(typeof HASH).toBe('string');
    expect(typeof SPACE).toBe('string');
    expect(typeof EMPTY_STRING).toBe('string');
    expect(typeof GT).toBe('string');
  });
});
