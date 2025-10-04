import type { SongMetaUrlType } from "./SongMetaUrlType.js";

export interface ISongMetaUrl {
  type: SongMetaUrlType;
  value: string;
}

export type ISongMetaUrlKeys = keyof ISongMetaUrl;
