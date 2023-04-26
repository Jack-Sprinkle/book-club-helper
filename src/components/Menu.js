import Link from "next/link";
import styles from "../styles/components/Menu.module.scss";

export default function Menu({show}) {
    if (!show) {
        return (
            null
        )
    }
    return (
        <nav className={styles.menu}>
            <ul className={styles.menu__list}>
                <Link href='/home' className={styles.menu__link}><li className={styles.menu__item}>Home Page</li></Link>
                <Link href='/recommend' className={styles.menu__link}><li className={styles.menu__item}>Recommend</li></Link>
            </ul>
        </nav>
    )
}