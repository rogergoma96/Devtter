import css from "styled-jsx/css";
import { colors } from "../../styles/theme";

export default css`
  article {
    border-bottom: 1px solid ${colors.gray};
    display: flex;
    padding: 10px 15px;
  }

  img {
    height: auto;
    width: 100%;
  }

  .container-img {
    border-radius: 10px;
    border: 1px solid rgb(196, 207, 214);
    display: flex;
    align-items: center;
    margin-top: 12px;
    max-height: 200px;
    overflow: hidden;
  }

  .container-avatar {
    padding-right: 10px;
  }

  p {
    line-height: 1.3;
    margin: 0;
  }

  span {
    color: #555;
    font-size: 14px;
    margin-left: 4px;
  }
`;
