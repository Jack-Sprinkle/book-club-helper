import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SelectedBook from "@/components/SelectedBook";
import Rating from "@/components/Rating";
import axios from "axios";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentBook, setCurrentBook] = useState(null)
  const router = useRouter();
  const redirect = () => {
    router.push("/");
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.get('/api/users', {
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      .then(response => {
        setCurrentUser(response.data)
        return axios.get('/api/books/single', {
          headers: {
            Authorization: `Bearer: ${token}`
          }
        })
        .then(response => {
          setCurrentBook(response.data)
        })
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, []);

  if (!currentUser) {
    return (
      <>
        <h1>Please login to see this page</h1>
        <button onClick={redirect}>Login</button>
      </>
    );
  }

  if (!currentBook) {
    return (
      <h1>Loading this month's book!</h1>
    )
  }


  return (
    <>
      <Header />
      <h1>Book for the month:</h1>
      <SelectedBook currentBook={currentBook}/>
      <Rating currentBook={currentBook}/>
      <p>Leave your comment on the book!</p>
    </>
  );
}
