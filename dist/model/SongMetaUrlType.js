export { SongMetaUrlType };
var SongMetaUrlType;
(function (SongMetaUrlType) {
    SongMetaUrlType["YOUTUBE"] = "youtube";
    SongMetaUrlType["SPOTIFY"] = "spotify";
})(SongMetaUrlType || (SongMetaUrlType = {}));
export const findEnum = (needle) => {
    for (const [key, value] of Object.entries(SongMetaUrlType)) {
        if (value == needle) {
            return SongMetaUrlType[key];
        }
    }
    throw new Error(`Couldn't find enum matching '${needle}'`);
};
//# sourceMappingURL=SongMetaUrlType.js.map