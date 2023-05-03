import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Form, Radio, Rate } from './RatingStyles'


export default function Rating({ currentBook }) {
    const [userRating, setUserRating] = useState(0);
    const token = sessionStorage.getItem('token');
    function handleSubmit(event) {
        event.preventDefault()
        axios.put(`./api/books/${currentBook.id}`, {userRating}, {
            headers: {
                Authorization: `Bearer: ${token}`
            }
        })
        .then(response => {
            console.log(response)
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label key={index}>
                        <Radio
                            type='radio'
                            value={givenRating}
                            onClick={() => setUserRating(givenRating)}

                        />
                        <Rate>
                            <FaStar
                                color={
                                    givenRating < userRating || givenRating === userRating
                                        ? "000"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rate>
                    </label>
                )
            })}
            <button type="submit">Leave your rating!</button>

        </Form>
    )
}