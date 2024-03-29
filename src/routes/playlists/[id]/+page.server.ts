import type { Actions } from '../../$types';
import { createMixedPlaylist } from '../../../utils/spotifyapi';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

let id : string;

export const load = (async ({ params, cookies }) => {
  id = params.id;

  const accessToken = cookies.get('access_token')
  if (!accessToken) throw redirect(303, '/');

}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const accessToken = event.cookies.get('access_token')
    if (!accessToken) throw redirect(303, '/');

    // Create new playlist with a mix
    const data = await event.request.formData();
    const playlistName = data.get('playlistName') as string;
    console.log(id)

    await createMixedPlaylist(accessToken, playlistName, id);

    console.log("Playlist creada")
    throw redirect(301, `/playlists/${id}/success`)
  }
};