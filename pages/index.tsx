import Center from "@/components/Center";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import PlaylistContextProvider from "@/contexts/PlaylistContexts";
import SongContextProvider from "@/contexts/SongContexts";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () =>{
  return(
    <div className="bg-black h-screen overflow-hidden">
      <PlaylistContextProvider>
        <SongContextProvider>
          <Head>
            <title>Spotify 2.0</title>
            <meta name= 'description' content='Spotify' />
            <link rel='icon' href='/favicon.ico'/>
          </Head>

          <main className='flex'>
            <Sidebar />
            <Center />
          </main>

          <div className="sticky bottom-0 text-white">
            <Player/>
          </div>
        </SongContextProvider>
      </PlaylistContextProvider>
    </div>
  )
}
export default Home