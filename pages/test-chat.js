import Script from "next/script";

export default function TestChat() {
  return (
    <>
      <h1>Chatbase Test</h1>

      <Script
        src="https://www.chatbase.co/embed.min.js"
        strategy="afterInteractive"
        data-chatbot-id="qly8l_LeOefRhFIpJpunB"
        data-domain="www.chatbase.co"
      />
    </>
  );
}