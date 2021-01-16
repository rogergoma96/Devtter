import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../Avatar";
import useTimeAgo from "../../hooks/useTimeAgo";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";

import styles from "./styles";

const Devitt = ({ avatar, userName, content, createdAt, userId, img, id }) => {
  const timeAgo = useTimeAgo(createdAt);
  const createdAtFormat = useDateTimeFormat(createdAt);
  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <>
      <article onClick={handleArticleClick} onKeyPress={handleArticleClick}>
        <div className="container-avatar">
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <a href={`/status/${id}`}>
                <time title={createdAtFormat}>{timeAgo}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && (
            <div className="container-img">
              <img alt="" src={img} />
            </div>
          )}
        </section>
      </article>

      <style jsx>{styles}</style>
    </>
  );
};

export default Devitt;
