import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import 'regenerator-runtime/runtime'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
  
export default function App({ Component, pageProps }) {
  return (
    <>
    <main className={`${roboto.className} bg-amber-50`}> 
      <Component {...pageProps} />
    </main>
    <Analytics />
    </>
  )
}
