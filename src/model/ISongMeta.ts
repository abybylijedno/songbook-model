import type { ISongMetaUrl } from "./ISongMetaUrl";

export interface ISongMeta {
  author?: string;
  url?: ISongMetaUrl;
  originalTitle?: string;
  alternativeTitle?: string;
  album?: string;
  copyright?: string;
  translation?: string;
  basedOn?: string;
  lyrics?: string;
  music?: string;
}

export type ISongMetaKeys = keyof ISongMeta;
