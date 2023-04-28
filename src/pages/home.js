import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import axios from "axios";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const redirect = () => {
    router.push("/");
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      axios.get('/api/users', {
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      .then(response => {
        setCurrentUser(response.data)
      })
      .catch(error => {
        console.error(error)
      })
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
    <>
      <Header />
      <h1>Book for the month:</h1>
      <p>Book and image will go here</p>
      <p>Books rating here</p>
      <p>Leave your book rating!</p>
      <p>Leave your comment on the book!</p>
    </>
  );
}
