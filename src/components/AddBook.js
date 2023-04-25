import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AddBook() {
    const [responseMessage, setResponseMessage] = useState(null);
    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            description: "",
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required("Please enter a book title."),
            author: Yup.string()
                .required("Please enter am author."),
            description: Yup.string()
                .required("Please enter a brief description")
        }),

        onSubmit: async (values) => {
            const newBook = {
                title: values.title,
                author: values.author,
                description: values.description
            };

            try {
                const response = await axios.post("/api/books", newBook);
                const data = await response;
                if (data.status === 201) {
                    setResponseMessage(data.data);
                }
            } catch {
                setResponseMessage("Failed to add book recommendation");
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Recommend a Book!</h3>
            <label htmlFor="title">
                Title
            </label>
            <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="Title"
            />
            {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
            ) : null}
            <label htmlFor="author">
                Author
            </label>
            <input
                id="author"
                name="author"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
                placeholder="Author"
            />
            {formik.touched.author && formik.errors.author ? (
                <div>{formik.errors.author}</div>
            ) : null}
            <label htmlFor="description">
                Description
            </label>
            <textarea
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                placeholder="Book Description"
            />
            {formik.touched.description && formik.errors.description ? (
                <div>
                    {formik.errors.description}
                </div>
            ) : null}

            <button type="submit">
                Add Book
            </button>
            {responseMessage ? (
                <div>{responseMessage}</div>
            ) : null}
        </form>
    );
}
