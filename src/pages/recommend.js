import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddBook from "@/components/AddBook";
import styles from "../styles/pages/RecommendPage.module.scss";

export default function Recommend() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const redirect = () => {
    router.push("/");
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  if (!loggedIn) {
    return (
      <>
        <h1>Please login to see this page</h1>
        <button onClick={redirect}>Login</button>
      </>
    );
  }

  return (
    <main className={styles.main}>
      <Header />
      <AddBook />
    </main>
  );
}