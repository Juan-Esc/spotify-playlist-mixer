import SpotifyWebApi from 'spotify-web-api-node';

export const spotifyApi = ((accessToken: string) => {
    let spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri
    });
    spotifyApi.setAccessToken(accessToken);
    return spotifyApi;
})

export const clientId = 'abd30f42d9ff4a019618e84d9e3cd521';
export const clientSecret = '22ded579b55b446dafb697bd223f9bf1'
export const redirectUri = 'http://localhost:5173/callback'

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