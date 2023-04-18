import Head from "next/head";
import Register from "@/components/Register";
import styles from '../styles/pages/MainPage.module.scss';


export default function MainPage() {
 

  return (
    <>
      <Head>
        <title>Book Club Helper</title>
        <meta
          name="Book Club Helper"
          content="An application to help with book clubs!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main__container}>
        <h1 className={styles.heading}>Sup, nerd!</h1>
        <h3 className={styles.heading}>Here to read some books? Please sign up or login below</h3>
        <Register/>
        <p>Already a nerd? Please sign in</p>

      </main>
    </>
  );
}
