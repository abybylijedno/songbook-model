import type { SongMetaUrlType } from "./SongMetaUrlType";

export interface ISongMetaUrl {
  type: SongMetaUrlType;
  value: string;
}

export type ISongMetaUrlKeys = keyof ISongMetaUrl;
