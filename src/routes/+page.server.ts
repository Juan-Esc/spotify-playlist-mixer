import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { clientId, redirectUri } from '../utils/spotifyapi';

export const actions: Actions = {
    default: async (event) => {
        // TODO log the user in
        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative';

        throw redirect(303, 'https://accounts.spotify.com/authorize?' + stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        }));
    }
};

/**
 * Generates a random string containing numbers and letters
 * @param length 
 * @returns 
 */
function generateRandomString(length : number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function stringify(obj : any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }