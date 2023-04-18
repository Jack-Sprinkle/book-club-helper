import Head from "next/head";
import Register from "@/components/Register";


export default function LoginPage() {
 

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
      <main>
        <h1>Sup, nerd!</h1>
        <h3>Here to read some books? Please sign up or login below</h3>
        <Register/>
        <p>Already a nerd? Please sign in</p>

      </main>
    </>
  );
}
