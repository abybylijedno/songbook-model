import { SongsFileImporter } from '@abybylijedno/songbook-model';

describe('SongsFileImporter Integration Tests', () => {
  let importer;

  beforeEach(() => {
    importer = new SongsFileImporter();
  });

  it('should parse complete songbook with multiple songs', () => {
    const content = `
# My Songbook

## Amazing Grace

> meta/author: John Newton
> meta/album: Olney Hymns
> meta/url/youtube: https://youtube.com/watch?v=CDdvReNKKuk

Amazing grace, how sweet the sound | C
That saved a wretch like me | F
I once was lost, but now am found | C G
Was blind, but now I see | C

Twas grace that taught my heart to fear | C
And grace my fears relieved | F
How precious did that grace appear | C G
The hour I first believed | C

## How Great Thou Art

> meta/author: Carl Boberg
> meta/translation: Stuart K. Hine
> meta/original-title: O Store Gud

O Lord my God, when I in awesome wonder | C
Consider all the worlds thy hands have made | F
I see the stars, I hear the rolling thunder | C G
Thy power throughout the universe displayed | C

Then sings my soul, my Savior God, to thee | C
How great thou art, how great thou art | F
Then sings my soul, my Savior God, to thee | C G
How great thou art, how great thou art | C
`;

    const songs = importer.process(content);

    expect(songs).toHaveLength(2);

    // Test first song
    const amazingGrace = songs[0];
    expect(amazingGrace.title).toBe('Amazing Grace');
    expect(amazingGrace.slug).toBe('amazing-grace');
    expect(amazingGrace.meta.author).toBe('John Newton');
    expect(amazingGrace.meta.album).toBe('Olney Hymns');
    expect(amazingGrace.meta.url?.type).toBe('youtube');
    expect(amazingGrace.meta.url?.value).toBe('https://youtube.com/watch?v=CDdvReNKKuk');
    expect(amazingGrace.verses).toHaveLength(2);
    expect(amazingGrace.verses[0].lines).toHaveLength(4);
    expect(amazingGrace.verses[0].lines[0].text).toBe('Amazing grace, how sweet the sound');
    expect(amazingGrace.verses[0].lines[0].chord).toBe('C');
    expect(amazingGrace.searchText).toContain('Amazing Grace');
    expect(amazingGrace.searchText).toContain('John Newton');

    // Test second song
    const howGreatThouArt = songs[1];
    expect(howGreatThouArt.title).toBe('How Great Thou Art');
    expect(howGreatThouArt.slug).toBe('how-great-thou-art');
    expect(howGreatThouArt.meta.author).toBe('Carl Boberg');
    expect(howGreatThouArt.meta.translation).toBe('Stuart K. Hine');
    expect(howGreatThouArt.meta.originalTitle).toBe('O Store Gud');
    expect(howGreatThouArt.verses).toHaveLength(2);
    expect(howGreatThouArt.verses[1].lines).toHaveLength(4);
    expect(howGreatThouArt.verses[1].lines[1].text).toBe('How great thou art, how great thou art');
    expect(howGreatThouArt.verses[1].lines[1].chord).toBe('F');
  });

  it('should handle song with minimal metadata', () => {
    const content = `
# Simple Songbook

## Simple Song
Just a simple line | G
Another line | C
`;

    const songs = importer.process(content);

    expect(songs).toHaveLength(1);
    expect(songs[0].title).toBe('Simple Song');
    expect(songs[0].meta).toEqual({});
    expect(songs[0].verses).toHaveLength(1);
    expect(songs[0].verses[0].lines).toHaveLength(2);
  });

  it('should handle song with only metadata', () => {
    const content = `
# Metadata Only

## Instrumental
> meta/author: Composer Name
> meta/music: Composer Name
> meta/album: Instrumental Album
`;

    const songs = importer.process(content);

    expect(songs).toHaveLength(1);
    expect(songs[0].title).toBe('Instrumental');
    expect(songs[0].meta.author).toBe('Composer Name');
    expect(songs[0].meta.music).toBe('Composer Name');
    expect(songs[0].meta.album).toBe('Instrumental Album');
    expect(songs[0].verses).toHaveLength(0);
  });

  it('should handle songs with complex chord notations', () => {
    const content = `
# Jazz Songbook

## Jazz Standard
First line | Cmaj7
Second line | Am7b5/Eb
Third line | G7sus4
Fourth line | Fm6/9
`;

    const songs = importer.process(content);

    expect(songs).toHaveLength(1);
    const song = songs[0];
    expect(song.verses[0].lines[0].chord).toBe('Cmaj7');
    expect(song.verses[0].lines[1].chord).toBe('Am7b5/Eb');
    expect(song.verses[0].lines[2].chord).toBe('G7sus4');
    expect(song.verses[0].lines[3].chord).toBe('Fm6/9');
  });

  it('should handle songs with lines without chords', () => {
    const content = `
# Poetry Book

## Spoken Word
First line with chord | C
Second line without chord
Third line | G
Fourth line without chord
`;

    const songs = importer.process(content);

    expect(songs).toHaveLength(1);
    const song = songs[0];
    expect(song.verses[0].lines[0].chord).toBe('C');
    expect(song.verses[0].lines[1].chord).toBe('');
    expect(song.verses[0].lines[2].chord).toBe('G');
    expect(song.verses[0].lines[3].chord).toBe('');
  });

  it('should generate unique UUIDs for verses and lines', () => {
    const content = `
# Test Book

## Test Song
Line 1 | C
Line 2 | G

Line 3 | F
Line 4 | Am
`;

    const songs = importer.process(content);
    const song = songs[0];

    // Check that verses have UUIDs
    expect(song.verses[0].uuid).toBeDefined();
    expect(song.verses[1].uuid).toBeDefined();
    expect(song.verses[0].uuid).not.toBe(song.verses[1].uuid);

    // Check that lines have UUIDs
    expect(song.verses[0].lines[0].uuid).toBeDefined();
    expect(song.verses[0].lines[1].uuid).toBeDefined();
    expect(song.verses[0].lines[0].uuid).not.toBe(song.verses[0].lines[1].uuid);
  });

  it('should handle special characters in text and metadata', () => {
    const content = `
# International Songbook

## Świętość
> meta/author: Józef Śmiały
> meta/copyright: © 2023 Wydawnictwo Św. Pawła

Święty, święty, święty | C
Pan Bóg Wszechmogący | F
Który był, który jest | G
I który przyjść ma | C
`;

    const songs = importer.process(content);

    expect(songs).toHaveLength(1);
    const song = songs[0];
    expect(song.title).toBe('Świętość');
    expect(song.slug).toBe('swietosc');
    expect(song.meta.author).toBe('Józef Śmiały');
    expect(song.meta.copyright).toBe('© 2023 Wydawnictwo Św. Pawła');
    expect(song.verses[0].lines[0].text).toBe('Święty, święty, święty');
  });
});
