import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../styles/components/AddBook.module.scss";

export default function AddBook({updateBooks, setUpdateBooks}) {
    const [responseMessage, setResponseMessage] = useState(null);
    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            description: "",
            monthRecommended: "",
        },

        validationSchema: Yup.object({
            title: Yup.string()
                .required("Please enter a book title."),
            author: Yup.string()
                .required("Please enter am author."),
            description: Yup.string()
                .required("Please enter a brief description"),
            monthRecommended: Yup.number()
                .required("Please select the month you are recommending the book.")
        }),

        onSubmit: async (values, {resetForm}) => {
            const newBook = {
                title: values.title,
                author: values.author,
                description: values.description,
                monthRecommended: parseInt(values.monthRecommended)
            };

            try {
                const response = await axios.post("/api/books", newBook);
                const data = await response;
                if (data.status === 201) {
                    setResponseMessage(data.data);
                }
                setUpdateBooks(!updateBooks);
                resetForm()
            } catch {
                setResponseMessage("Failed to add book recommendation");
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <h3 className={styles.form__heading}>Recommend a Book!</h3>
            <label htmlFor="title" className={styles.form__label}>
                Title
            </label>
            <input
                className={styles.form__input}
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="Title"
            />
            {formik.touched.title && formik.errors.title ? (
                <div className={styles.form__error}>{formik.errors.title}</div>
            ) : null}
            <label htmlFor="author" className={styles.form__label}>
                Author
            </label>
            <input
                className={styles.form__input}
                id="author"
                name="author"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author}
                placeholder="Author"
            />
            {formik.touched.author && formik.errors.author ? (
                <div className={styles.form__error}>{formik.errors.author}</div>
            ) : null}
            <label htmlFor="description" className={styles.form__label}>
                Description
            </label>
            <textarea
                className={styles.form__textarea}
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                placeholder="Book Description"
            />
            {formik.touched.description && formik.errors.description ? (
                <div className={styles.form__error}>
                    {formik.errors.description}
                </div>
            ) : null}

            <label htmlFor="monthRecommended" className={styles.form__label}>
                Recommended Month
            </label>
            <select
                className={styles.form__input}
                id="monthRecommended"
                name="monthRecommended"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.monthRecommended}
            >
                {/* <option value='' disable selected>Select a month</option> */}
                <option value='0'>January</option>
                <option value='1'>February</option>
                <option value='2'>March</option>
                <option value='3'>April</option>
                <option value='4'>May</option>
                <option value='5'>June</option>
                <option value='6'>July</option>
                <option value='7'>August</option>
                <option value='8'>September</option>
                <option value='9'>October</option>
                <option value='10'>November</option>
                <option value='11'>December</option>
            </select>
            {formik.touched.monthRecommended && formik.errors.monthRecommended ? (
                <div className={styles.form__error}>
                    {formik.errors.monthRecommended}
                </div>
            ) : null}

            <button type="submit" className={styles.form__button}>
                Add Book
            </button>
            {responseMessage ? (
                <div className={styles.form__response}>{responseMessage}</div>
            ) : null}
        </form>
    );
}
