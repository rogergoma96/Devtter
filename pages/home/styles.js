import css from "styled-jsx/css";
import { colors, fonts } from "../../styles/theme";

export default css`
  article {
    display: flex;
    padding: 10px 15px;
  }

  h1 {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    font-family: ${fonts.base};
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    padding-left: 16px;
  }

  header {
    background: #ffffffee;
    backdrop-filter: blur(5px);
    border-bottom: 1px solid ${colors.gray};
    display: flex;
    height: 49px;
    position: sticky;
    top: 0;
    width: 100%;
  }

  section {
    flex: 1;
  }

  nav {
    background: #ffffffee;
    backdrop-filter: blur(5px);
    bottom: 0;
    border-top: 1px solid ${colors.gray};
    display: flex;
    height: 49px;
    position: sticky;
    width: 100%;
  }

  nav a {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
  }

  nav a:hover {
    background: radial-gradient(#0099ff22 15%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
  }
`;
