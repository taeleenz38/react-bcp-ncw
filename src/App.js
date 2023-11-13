import "./app.css";
import Layout from "./components/Layout/Layout";
import store from './store';

store.setState("admin", false, {persist: false});
store.setState("userlogin", false, {persist: false});
store.setState("loginName", '', {persist: false});
store.setState("userId", 0, {persist: false});
store.setState("fullName", '', {persist: false});
store.setState("currency", 'CA', {persist: true});
store.setState("badge", false, {persist: false});
store.setState("badgeUrl", '', {persist: false});
store.setState("walletId", '', {persist: false});
store.setState("description", '', {persist: false});

function App() {
  return <Layout />;
}

export default App;
