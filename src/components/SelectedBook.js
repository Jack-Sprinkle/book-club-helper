export default function SelectedBook({ currentBook }) {
    const { title, author, description, userRatings } = currentBook
    return (
        <section>
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{description}</p>
            <p>Current Rating: {userRatings}</p>
        </section>
    )
}