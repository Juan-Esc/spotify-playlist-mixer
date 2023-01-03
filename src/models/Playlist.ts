import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    name: String,
    spotifyId: String,

    clonName: String,
    clonSpotifyId: String,

    lastUpdated: Date
});

interface IPlaylist {
    name: string
    spotifyId: string

    clonName: string
    clonSpotifyId: string

    lastUpdated: Date

}

export const Playlist = mongoose.models.Playlist ?? mongoose.model<IPlaylist>('playlists', PlaylistSchema);