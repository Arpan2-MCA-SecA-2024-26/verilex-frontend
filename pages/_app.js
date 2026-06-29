import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import API_URL from "../utils/api";

export default function MyApp({
  Component,
  pageProps
}) {

  const router = useRouter();

  const [maintenance, setMaintenance] = useState(false);

  useEffect(()=>{

  const checkMaintenance = async()=>{

    try
    {

      const response = await fetch(`${API_URL}/admin/maintenance`);
      const data = await response.json();
      setMaintenance(data.maintenance);
    }

    catch(err){

      console.error(err);

    }

  };

  checkMaintenance();

  const interval = setInterval(checkMaintenance, 5000);

  return ()=>{

    clearInterval(interval);

  };

},[]);

  useEffect(()=>{

  if(maintenance && !router.pathname.startsWith("/admin")

    &&

    router.pathname !==
    "/maintenance"

  ){

    router.push(
      "/maintenance"
    );

  }

  if(

    !maintenance

    &&

    router.pathname ===
    "/maintenance"

  ){

    router.push(
      "/"
    );

  }

},[
  maintenance,
  router.pathname
]);

  return (

    <>
      <Head>

        <title>
          VeriLex AI
        </title>

        <link
          rel="icon"
          href="/favicon.ico"
        />

        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />

        <link
          rel="manifest"
          href="/site.webmanifest"
        />

      </Head>

      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      <GoogleOAuthProvider
        clientId={
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        }
      >

        {!["/login", "/admin-login", "/maintenance"].includes(router.pathname) && (
  <>
    <Script id="chatbase-init" strategy="afterInteractive">
      {`
        (function(){
          if(!window.chatbase||window.chatbase("getState")!=="initialized"){
            window.chatbase=(...args)=>{
              if(!window.chatbase.q){window.chatbase.q=[];}
              window.chatbase.q.push(args);
            };
            window.chatbase=new Proxy(window.chatbase,{
              get(target,prop){
                if(prop==="q") return target.q;
                return (...args)=>target(prop,...args);
              }
            });
          }
        })();
      `}
    </Script>

    <Script
      src="https://www.chatbase.co/embed.min.js"
      id="qly8l_LeOefRhFIpJpunB"
      strategy="afterInteractive"
      data-domain="www.chatbase.co"
    />
  </>
)}

        <Component {...pageProps} />

        {!router.pathname.startsWith("/admin") &&

          router.pathname !==
          "/maintenance" && (

          <>
            <CookieConsent />
            <Footer />
          </>

        )}

      </GoogleOAuthProvider>

    </>

  );

}