import axios from "axios";
import { useEffect, useState } from "react";

export default function Vote({updateBooks}) {

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
        const vote = {
            bookId: id,
            vote: 1
        }
        try {
            axios.put('/api/books', vote)
        } catch {
            setResponse("Failed to cast vote.")
        }
    }
    return (
        <>
        <h3>Voting will take place here</h3>
        {recBooks?.map(book =>{
            const {id, title, author, description} = book
            return(
                <div key={id}>
                    <h5>{title}</h5>
                    <p>{author}</p>
                    <p>{description}</p>
                    <button onClick={() => submitVote(id)}>Vote!</button>
                </div>
            )
        })}
        </>
    );
};