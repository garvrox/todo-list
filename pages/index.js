import Head from "next/head";
import styles from "../styles/Home.module.css";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {`What's the Plan for `}
          <span href="/">Today?</span>
        </h1>
        <TodoList />
      </main>
    </div>
  );
}
