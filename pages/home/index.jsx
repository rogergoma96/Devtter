import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { listenLastetDevitts } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import Devitt from "../../components/Devitt";
import HomeIcon from "../../components/Icons/Home";
import CreateIcon from "../../components/Icons/Create";
import SearchIcon from "../../components/Icons/Search";
import styles from "./styles";

const HomePage = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsuscribe;

    if (user) {
      unsuscribe = listenLastetDevitts(setTimeline);
    }

    return () => unsuscribe && unsuscribe();
  }, [user]);

  return (
    <>
      <Head>
        <title>Home / Devitt</title>
      </Head>
      <header>
        <h1>Inicio</h1>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, img, avatar, content, userId, createdAt }) => (
            <Devitt
              key={id}
              createdAt={createdAt}
              userName={userName}
              avatar={avatar}
              id={id}
              content={content}
              userId={userId}
              img={img}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a href="/home">
            <HomeIcon width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a href="/search">
            <SearchIcon width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/devitt">
          <a href="/compose/devitt">
            <CreateIcon width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>

      <style jsx>{styles}</style>
    </>
  );
};

export default HomePage;
