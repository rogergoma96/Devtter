import Avatar from "../Avatar";
import useTimeAgo from "../../hooks/useTimeAgo";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";

import styles from "./styles";

const Devitt = ({ avatar, userName, content, createdAt, userId, img }) => {
  const timeAgo = useTimeAgo(createdAt);
  const createdAtFormat = useDateTimeFormat(createdAt);

  return (
    <>
      <article>
        <div className="container-avatar">
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <time dateTime={createdAtFormat}>{timeAgo}</time>
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
