import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

function useSongInfo() {
  const SpotifyApi = useSpotify();
  const [currentIdTrack, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${SpotifyApi.getAccessToken()}`,
            },
          }
        );
        const res = await trackInfo.json();
        setSongInfo(res);
      }
    };
    fetchSongInfo();
  }, [currentIdTrack, SpotifyApi]);

  return songInfo;
}

export default useSongInfo;
