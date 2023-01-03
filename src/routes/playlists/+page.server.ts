import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { spotifyApi, getAllUserPlaylists } from '../../utils/spotifyapi';
import { redirect } from '@sveltejs/kit';
 
export const load = (async ({ cookies }) => {
    const accessToken = cookies.get('access_token')
    if (!accessToken) throw redirect(303, '/');

    let playlists = await getAllUserPlaylists(accessToken);
    let collabPlaylists = []
    for (let playlist of playlists) {
        if (playlist.collaborative) {
            collabPlaylists.push(playlist)
        }
    }
    return { collabPlaylists };

}) satisfies PageServerLoad;