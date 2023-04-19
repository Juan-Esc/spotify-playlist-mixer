import SpotifyWebApi from 'spotify-web-api-node';
import { dev } from '$app/environment';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '$env/static/private';

export const spotifyApi = ((accessToken: string) => {
    let spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri
    });
    spotifyApi.setAccessToken(accessToken);
    return spotifyApi;
})

export const clientId = SPOTIFY_CLIENT_ID
export const clientSecret = SPOTIFY_CLIENT_SECRET
export const redirectUri = (dev) ? 'http://localhost:5173/callback' : SPOTIFY_REDIRECT_URI

/**
 * Gets all playlists owned by user
 * @param accessToken User's spotify access token
 * @returns 
 */
export const getAllUserPlaylists = (async (accessToken: string) => {
    let playlists = [];
    let response, limit = 50, offset = 0;
    do {
        response = await spotifyApi(accessToken).getUserPlaylists({ limit, offset })
        for (let playlist of response.body.items) {
            playlists.push(playlist)
        }
        offset = offset + limit;
    } while (response.body.next != null)

    return playlists;
})

/**
 * Mixes the given array of Tracks following the fair algorithm and returns a new array
 * @param tracks Array of Tracks to mix
 * @returns Mixed array of Tracks
 */
const mixPlaylist = (tracks: Track[]) => {
    // Crdeate a set to store the unique participant
    const uniqueParticipant = new Set<string>();
    // Iterate through the array to add the participant to the set
    tracks.forEach(song => uniqueParticipant.add(song.by));
    // Create an array from the set to store the unique participant
    const participants = Array.from(uniqueParticipant);
    
    console.log(participants)
    
    let tracksByParticipant : { [ by: string ]: Track[] } = {};
    let maxSongs = 0;
    for (let track of tracks) {
        if (!tracksByParticipant[track.by]) tracksByParticipant[track.by] = [];
        tracksByParticipant[track.by].push(track);
        if (tracksByParticipant[track.by].length > maxSongs) maxSongs = tracksByParticipant[track.by].length;

    }

    let mixedTracks : Track[] = [];
    for (let i = 0; i < maxSongs; i++) {
        for (let participant of participants) {
            if (tracksByParticipant[participant][i]) {
                mixedTracks.push(tracksByParticipant[participant][i]);
            }
        }
        i++;
    }
    return mixedTracks;

}

/**
 * 
 * @param accessToken User's spotify access token
 * @param playlistName Playlist name
 * @param playlistId Original playlist ID to get tracks of
 */
export const createMixedPlaylist = (async (accessToken: string, playlistName: string, playlistId: string) => {
    let response = await spotifyApi(accessToken).createPlaylist(playlistName, { 'description': 'A playlist created by Spotify Together', 'public': false });
    let newPlaylistId = response.body.id;
    let offset = 0;
    let response2;
    let tracks: Track[] = [];
    let trackUris: string[] = [];

    do {
        response2 = await spotifyApi(accessToken).getPlaylistTracks(playlistId, { limit: 50, offset });
        offset = offset + 50;

        response2.body.items.forEach((track) => {
            if (track.track) tracks.push({ uri: track.track.uri, by: track.added_by.uri });
        })
    } while (response2.body.next != null);

    const mixedTracks = mixPlaylist(tracks);
    for (const track in mixedTracks) {
        trackUris.push(mixedTracks[track].uri);
    }

    do {
        let trackUrisToAdd = trackUris.splice(0, 50);
        await spotifyApi(accessToken).addTracksToPlaylist(newPlaylistId, trackUrisToAdd);
    } while (trackUris.length > 0);

})

interface Track {
    uri: string;
    by: string;
}