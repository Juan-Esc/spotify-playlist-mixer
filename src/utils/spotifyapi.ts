import SpotifyWebApi from 'spotify-web-api-node';

export const spotifyApi = ((accessToken : string) => {
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

export const getAllUserPlaylists = (async (accessToken : string) => {
    let playlists = [];
    let response, limit = 50, offset = 0;
    do {
        response = await spotifyApi(accessToken).getUserPlaylists({ limit, offset })
        for (let playlist of response.body.items) {
            playlists.push(playlist)
        }
        offset = offset + limit;
    }while(response.body.next != null)
   
    return playlists;
})