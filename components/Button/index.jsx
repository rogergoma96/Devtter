import styles from "./styles";

const Button = ({ children, onClick, disabled, submit = false }) => (
  <>
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
    <style jsx>{styles}</style>
  </>
);

export default Button;
