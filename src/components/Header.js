import Menu from "./Menu";
import { useState } from "react";
import styles from '../styles/components/Header.module.scss';
import Image from "next/image";
import logo from "../../public/icons/book_club_logo.png";

export default function Header() {
    const [show, setShow] = useState(false)

    return (
        <header className={styles.header}>
            <Image
                className={styles.form__logo}
                src={logo}
                alt="slow burn book club logo"
                height={50}
                width={50}
            />
            <button onClick={() => setShow(!show)} className={styles.header__button}></button>
            <Menu show={show}  />
        </header>
    )
}