import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
export const getAllAlbum = TryCatch(async (req, res) => {
    let albums;
    albums = await sql `SELECT * FROM albums`;
    res.json(albums);
});
export const getAllSongs = TryCatch(async (req, res) => {
    let songs;
    songs = await sql `SELECT * FROM songs`;
    res.json(songs);
});
export const getAllSongsOfAlbum = TryCatch(async (req, res) => {
    const { id } = req.params;
    let album, songs;
    album = await sql `SELECT * FROM albums WHERE id = ${id}`;
    if (album.length === 0) {
        res.status(404).json({
            message: "آلبومی با این شناسه پیدا نشد",
        });
        return;
    }
    songs = await sql `SELECT * FROM songs WHERE album_id = ${id}`;
    const response = { songs, album: album[0] };
    res.json(response);
});
export const getSingleSong = TryCatch(async (req, res) => {
    const song = await sql `SELECT * FROM songs WHERE id = ${req.params.id}`;
    res.json(song[0]);
});
//# sourceMappingURL=controllers.js.map