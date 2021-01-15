import { useEffect } from "react";
import { useRouter } from "next/router";
import useUser, { USER_STATES } from "../hooks/useUser";
import Button from "../components/Button";
import Github from "../components/Icons/GitHub";

import { colors } from "../styles/theme";

import { loginWithGitHub } from "../firebase/client";
import Spinner from "../components/Spinner";

const Home = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      <section>
        <img src="/twitter-logo.png" alt="Loog" />
        <h1>Devtter</h1>
        <h2>
          Talk about development
          <br />
          with developers
        </h2>
        {user === USER_STATES.NOT_LOGGED && (
          <Button onClick={handleClick}>
            <Github fill={colors.white} height="24" width="24" />
            Login with Github
          </Button>
        )}
        {user === USER_STATES.NOT_KNOWN && <Spinner />}
      </section>

      <style jsx>
        {`
          img {
            width: 120px;
          }

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
            text-align: center;
          }

          h1 {
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 16px;
          }

          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0 0 24px;
          }
        `}
      </style>
    </>
  );
};

export default Home;
