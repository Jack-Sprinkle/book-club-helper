import Link from "next/link"

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <Link href='/home'><li>Home Page</li></Link>
                    <Link href='/recommend'><li>Recommend</li></Link>
                </ul>
            </nav>
        </header>
    )
}