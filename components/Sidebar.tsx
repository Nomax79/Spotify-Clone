import { 
  HomeIcon, 
  HeartIcon, 
  BookOpenIcon, 
  PlusCircleIcon, 
  RssIcon, 
  MagnifyingGlassIcon 
} from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import { signOut, useSession } from "next-auth/react";
import { usePlaylistContext } from "@/contexts/PlaylistContexts";
import useSpotify from "@/hooks/useSpotify";
const Divider = ()=> <hr className="border-t-[0.1px] border-gray-900"/>
const Sidebar = () => {
  const spotifyApi = useSpotify()

  const {playlistContextState: {playlists},updatePlaylistContextState} = usePlaylistContext()

  const setSelectedPlaylist = async(playlistId: string)=>{
    const playlistResponse = await spotifyApi.getPlaylist(playlistId)
    updatePlaylistContextState({
      selectedPlaylistId: playlistId,
      selectedPlaylist:   playlistResponse.body
    })
  }
  return (
    <div className='text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-scroll scrollbar-hiden sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block'>
        <div className="space-y-4">

          <IconButton icon={HomeIcon} label="Home"/>
          <IconButton icon={MagnifyingGlassIcon} label="Search"/>
          <IconButton icon={BookOpenIcon} label="Your Library"/>

          <Divider/>

          <IconButton icon={PlusCircleIcon} label="Create Playlist"/>
          <IconButton icon={HeartIcon} label="Liked Songs"/>
          <IconButton icon={RssIcon} label="Podcasts"/>

          <Divider/>
          {/*Playlists*/}
          {playlists.map(({id, name})=>(
            <p key={id} className="cursor-pointer hover:text-white" onClick={()=>{
              setSelectedPlaylist(id)
            }}>
              {name}
            </p>
          ))}
        </div>
    </div>
  );
};

export default Sidebar;
