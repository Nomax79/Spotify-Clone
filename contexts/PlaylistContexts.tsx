import { createContext, useContext, ReactNode, useState, useEffect} from "react"
import {IPlaylistContext,PlaylistContextState} from "../types"
import { spotifyApi } from "@/config/spotify"
import { useSession } from "next-auth/react"
import useSpotify from "@/hooks/useSpotify"

const defaultPlaylistContextState: PlaylistContextState={
    playlists:[],
    selectedPlaylist: null,
    selectedPlaylistId: null
}

export const PlaylistContext = createContext<IPlaylistContext>({
    playlistContextState: defaultPlaylistContextState,
    updatePlaylistContextState:()=>{}
})

export const usePlaylistContext =()=> useContext(PlaylistContext)

const PlaylistContextProvider =({children}:{children: ReactNode})=>{
    
    const spotifyApi = useSpotify()
    const {data: session} = useSession()

    const [playlistContextState, setPlaylistContextState] = useState(defaultPlaylistContextState)

    const updatePlaylistContextState = (updateObj:Partial<PlaylistContextState>)=>{
        setPlaylistContextState(previousPlaylistContextState=>({
            ...previousPlaylistContextState,
            ...updateObj
        }))
    }

    useEffect(()=>{
        const getUserPlaylists = async()=>{
            const userPlaylistResponse = await spotifyApi.getUserPlaylists()
            updatePlaylistContextState({playlists: userPlaylistResponse.body.items}) 
        }
        if(spotifyApi.getAccessToken()){
            getUserPlaylists()
        }
    },[session,spotifyApi])

    const playlistContextProviderData = {
        playlistContextState,
        updatePlaylistContextState
    }
    return( 
        <PlaylistContext.Provider value={playlistContextProviderData}>
            {children}
        </PlaylistContext.Provider>
    )
}
export default PlaylistContextProvider