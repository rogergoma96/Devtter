import { useRouter } from "next/router";
import firestore from "../../../firebase/admin";

import Devitt from "../../../components/Devitt";
import Spinner from "../../../components/Spinner";

export default function DevittPage(props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <div>
          <Spinner />
        </div>

        <style jsx>
          {`
            div {
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: center;
            }
          `}
        </style>
      </>
    );
  }

  return (
    <>
      <div>
        <Devitt {...props} />
      </div>

      <style jsx>{``}</style>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection("devitts")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const docId = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        docId,
        createdAt: +createdAt.toDate(),
      };
      return { props };
    })
    .catch(() => ({ props: {} }));
}
