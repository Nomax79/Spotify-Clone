import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: {session,...pageProgs} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProgs} />
    </SessionProvider>
  )
}
