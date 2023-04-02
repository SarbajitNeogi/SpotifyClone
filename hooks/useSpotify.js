import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyAPI from '../lib/spotify';

const SpotifyApi = new SpotifyWebApi({
clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session,status } = useSession();

  useEffect(() => {
    if (session) {
      //if refresh access token attempt fails then
      //redirect this user to the signin page
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      SpotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyAPI;
}

export default useSpotify;
