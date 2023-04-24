import Head from "next/head";
import Register from "@/components/Register";
import Login from "@/components/Login";
import styles from "../styles/pages/MainPage.module.scss";

import { useState, useEffect } from "react";

export default function MainPage() {
  const [existingUser, setExistingUser] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setExistingUser(false);
    } else {
      setExistingUser(true);
    }
  }, []);

  const handleClick = () => {
    setExistingUser(!existingUser);
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
        <main className={styles.main}>
          <Register />
          <div className={styles.main__subcontainer}>
            <p className={styles.main__subheading}>Already a nerd?</p>
            <button className={styles.main__button} onClick={handleClick}>
              Sign in
            </button>
          </div>
        </main>
      </>
    );
  }

  if (existingUser) {
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
        <main className={styles.main}>
          <Login />
          <div className={styles.main__subcontainer}>
            <p className={styles.main__subheading}>
              Need to create an account?
            </p>
            <button className={styles.main__button} onClick={handleClick}>
              Sign Up
            </button>
          </div>
        </main>
      </>
    );
  }
}
