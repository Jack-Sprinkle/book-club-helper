import axios from "axios";
import { useEffect, useState } from "react";

export default function Vote() {

    const [recBooks, setRecBooks] = useState(null)
    useEffect(() => {
        axios.get("/api/books")
            .then(response => {
                setRecBooks(response.data)
            }).catch(error => {
                console.error(error)
            })
    }, [])

    if (!recBooks) {
        return (
            <>
                <h1>No recommended books for this month yet.</h1>
                <p>Please recommend a book!</p>
            </>
        )
    }
    return (
        <h3>Voting will take place here</h3>
    );
};