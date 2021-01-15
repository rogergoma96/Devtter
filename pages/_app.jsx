import AppLayaout from "../components/AppLayout";

const App = ({ Component, pageProps }) => (
  <AppLayaout>
    <Component {...pageProps} />
  </AppLayaout>
);

export default App;
