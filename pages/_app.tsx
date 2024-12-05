

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// import { fontSans, fontMono } from '@/config/fonts';
import "@/styles/globals.css";




export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return getLayout(<NextUIProvider>
    <NextThemesProvider>
    <Component {...pageProps} />
    </NextThemesProvider>
   
  </NextUIProvider>)
}
// export default function App({ Component, pageProps }: AppProps) {
//   const router = useRouter();

//   return (
//     <NextUIProvider navigate={router.push}>
//       <NextThemesProvider>
//         <Component {...pageProps} />
//       </NextThemesProvider>
//     </NextUIProvider>
//   );
// }

// export const fonts = {
//   sans: fontSans.style.fontFamily,
//   mono: fontMono.style.fontFamily,
// };
