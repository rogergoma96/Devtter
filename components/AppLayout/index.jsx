import styles, { globalStyles } from "./styles";

const AppLayaout = ({ children }) => (
  <>
    <div>
      <main>{children}</main>
    </div>

    <style jsx>{styles}</style>
    <style jsx global>
      {globalStyles}
    </style>
  </>
);

export default AppLayaout;
