import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import PlaylistContextProvider from "@/contexts/PlaylistContexts";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () =>{
  return(
    <div className="bg-black h-screen overflow-hidden">
      <PlaylistContextProvider>
        <Head>
          <title>Spotify 2.0</title>
          <meta name= 'description' content='Spotify' />
          <link rel='icon' href='/favicon.ico'/>
        </Head>
        <main className='flex'>
          <Sidebar />
          <Center />
        </main>
      </PlaylistContextProvider>
    </div>
  )
}
export default Home