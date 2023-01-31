import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import "styles/globals.css";

import { userService } from "services";
import { Nav, Alert } from "components";

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user"))?.data);
    authCheck(router.asPath);
  }, []);

  function authCheck(url) {
    const publicPaths = ["/user/login", "/user/register"];
    const path = url.split("?")[0];
    if (!localStorage.getItem("user") && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/user/login",
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <title>NextJS Auth</title>
      </Head>

      <div className={`app-container ${user ? "bg-light" : ""}`}>
        <Alert />
        {authorized && <Component {...pageProps} />}
      </div>
    </>
  );
}
