import Head from "next/head";
import Register from "@/components/Register";
import Login from "@/components/Login";
import styles from "../styles/pages/MainPage.module.scss";

import { useState } from "react";

export default function MainPage() {
  const [existingUser, setExistingUser] = useState(false);

  const handleClick = () => {
    setExistingUser(true);
  };
  if (!existingUser) {
    return (
      <>
        <Head>
          <title>Book Club Helper</title>
          <meta
            name="Book Club Helper"
            content="An application to help with book clubs!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <main className={styles.main__container}>
          <Register />
          <div>
            <p>Already a nerd?</p> 
            <button onClick={handleClick}>Sign in</button>

          </div>
        </main>
      </>
    );
  }

  if(existingUser) {
    return (
      <>
      <Login />
      </>
    )
  }
}
