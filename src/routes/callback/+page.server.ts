import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirectUri, clientId, clientSecret } from '../../utils/spotifyapi';
import { redirect } from '@sveltejs/kit';
 
export const load = (async ({ url, cookies }) => {
    if (url.searchParams.get('error')) throw redirect(303, '/');
 
    // Request access token
    const code = url.searchParams.get('code');
    if (!code) throw error(400, 'Bad request');

    let buff = Buffer.from(clientId + ':' + clientSecret)
    console.log(buff.toString('base64'))

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': ' Basic ' + buff.toString('base64') // TODO: 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri
        })
    })

    const data = await res.json();
    if (data.error) throw redirect(303, '/');
    
    cookies.set('access_token', data.access_token)
    console.log(data)

    throw redirect(303, '/playlists');
 
}) satisfies PageServerLoad;