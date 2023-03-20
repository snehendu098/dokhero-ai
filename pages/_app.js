import Nav from "@/components/core/Nav";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="w-sceen min-h-screen bg-[#000] text-white">
        <ToastContainer />
        <div className="w-full">
          <Nav />
        </div>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
