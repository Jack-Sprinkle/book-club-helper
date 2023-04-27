import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/components/Vote.module.scss';

export default function Vote({ updateBooks }) {

    const [recBooks, setRecBooks] = useState(null)
    const [response, setResponse] = useState(false)
    useEffect(() => {
        axios.get("/api/books")
            .then(response => {
                setRecBooks(response.data)
            }).catch(error => {
                console.error(error)
            })
    }, [updateBooks])
    if (recBooks?.length < 1) {
        return (
            <>
                <h1>No recommended books for this month yet.</h1>
                <p>Please recommend a book!</p>
            </>
        )
    }

    function submitVote(id) {
        if (sessionStorage.getItem("voted")) {
            return setResponse("You have already voted")
        }
        const vote = {
            bookId: id,
            vote: 1
        }
        try {
            axios.put('/api/books', vote)
                .then(response => {
                    return axios.get('./api/books')
                }).then(response => {
                    setRecBooks(response.data)
                    setResponse("Casted your vote!")
                })

            sessionStorage.setItem("voted", "true")
        } catch {
            setResponse("Failed to cast vote.")
        }
    }

    return (
        <section className={styles.vote}>
            <h3 className={styles.vote__heading}>Vote for next month's book!</h3>
            <p className={styles.vote__response}>{response}</p>
            {recBooks?.map(book => {
                const { id, title, author, description, votes } = book
                return (
                    <div key={id} className={styles.book}>
                        <div className={styles.book__info}>
                            <h4 className={styles.book__title}>{title}</h4>
                            <p className={styles.book__author}><strong>By:</strong> {author}</p>
                        </div>
                        <p className={styles.book__desc}>{description}</p>
                        <p className={styles.book__votes}><strong>Current votes:</strong> {votes}</p>
                        <button onClick={() => submitVote(id)} className={styles.book__button}>Vote!</button>
                    </div>
                )
            })}
        </section>
    );
};