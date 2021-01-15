import styles from "./styles";

const Avatar = ({ alt, src, text }) => (
  <>
    <div>
      <img alt={alt} src={src} title={alt} />
      {text && <strong>{text}</strong>}
    </div>

    <style jsx>{styles}</style>
  </>
);

export default Avatar;
