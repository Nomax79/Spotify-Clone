import { useSongContext } from "@/contexts/SongContexts";
import useSpotify from "@/hooks/useSpotify";
import { SongReducerActionType } from "@/types";
import { ArrowsRightLeftIcon, BackwardIcon, PlayIcon, PauseIcon, ForwardIcon, ArrowPathIcon, ViewColumnsIcon, SpeakerXMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

const Player = () => {
    const spotifyApi = useSpotify()
    const {songContextState:{isPlaying,selectedSong,deviceId, volume} ,dispatchSongAction} = useSongContext()
    const [isMuted, setIsMuted] = useState(false)

    const handlePlayPause = async()=>{
        const response = await spotifyApi.getMyCurrentPlaybackState()
        if(!response.body) return
        if(response.body.is_playing){
            await spotifyApi.pause()
            dispatchSongAction({
                type: SongReducerActionType.ToggleIsPlaying,
                payload: false
            })
        } else{
            await spotifyApi.play()
            dispatchSongAction({
                type: SongReducerActionType.ToggleIsPlaying,
                payload: true
            })
        }
    }
    
    const handleSkipSong = async (skipTo: 'previous'| 'next')=>{
        if(!deviceId) return
        if(skipTo === 'previous') await spotifyApi.skipToPrevious()
        else  await spotifyApi.skipToNext()
        setTimeout(async () => {
            const songInfo = await spotifyApi.getMyCurrentPlayingTrack();
            if (!songInfo.body) return;
    
            dispatchSongAction({
                type: SongReducerActionType.SetCurrentPlayingSong,
                payload: {
                    selectedSongId: songInfo.body.item?.id,
                    selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
                    isPlaying: songInfo.body.is_playing,
                },
            });
        }, 60);
    }
    const debouncedAdjustVolume = useDebouncedCallback((volume:number)=>{
        spotifyApi.setVolume(volume)
    },500)
    const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = event =>{
        const volume = Number(event.target.value)
        if(!deviceId) return
        debouncedAdjustVolume(volume)
        dispatchSongAction({
            type:SongReducerActionType.SetVolume,
            payload: volume
        })
    }

  return <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        
        <div className="flex items-center space-x-4">
            {selectedSong &&(
                <>
                    <div className="hidden md:block">
                        <Image src = {selectedSong.album.images[0].url} alt = {"Album cover for ${selectedSong.name}"} height={40} width={40}/>
                    </div>
                    <div>
                        <h3>{selectedSong.name}</h3>
                        <p>{selectedSong.artists[0].name}</p>
                    </div>
                </>
            )}
        </div>

        <div className="flex justify-evenly items-center">
            
            <ArrowsRightLeftIcon className="icon-playback" />
            <BackwardIcon className="icon-playback" onClick={handleSkipSong.bind(this,'previous')} />
            {isPlaying ? (
                <PauseIcon className="icon-playback" onClick={handlePlayPause}/>
            ) :(
                <PlayIcon className="icon-playback" onClick={handlePlayPause}/>
            )}
            <ForwardIcon className="icon-playback" onClick={handleSkipSong.bind(this,'next')}/>
            <ArrowPathIcon className="icon-playback" /> 
        </div>

        <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
             {/* Nút bật/tắt tiếng */}
            <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted || volume === 0 ? (
                <SpeakerXMarkIcon className="w-6 h-6 text-white" />
                ) : (
                <SpeakerWaveIcon className="w-6 h-6 text-white" />
                )}
            </button>
            <input
                type="range"
                min={0}
                max={100}
                className="w-20 md:w-auto"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
        {/* Thanh tiến trình bài hát */}
        <div className="col-span-3 flex justify-center items-center space-x-2 px-4">
            <span className={`text-xs ${!isPlaying ? "text-gray-500" : "text-white"}`}>-:--</span>
            <input 
                type="range" 
                min={0} 
                max={100} 
                value={0} // Mặc định là 0
                disabled={!isPlaying} // Nếu chưa phát bài thì disable thanh trượt
                className={`flex-1 max-w-[300px] md:max-w-[400px] lg:max-w-[500px] cursor-pointer ${!isPlaying ? "opacity-50" : ""}`}
            />
            <span className={`text-xs ${!isPlaying ? "text-gray-500" : "text-white"}`}>-:--</span>
        </div>

    </div>
}

export default Player