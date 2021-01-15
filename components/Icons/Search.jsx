const Search = (props) => {
  const { stroke } = props;
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={8.5} cy={8.5} r={5} />
        <path d="M17.571 17.5L12 12" />
      </g>
    </svg>
  );
};
export default Search;
