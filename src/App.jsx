import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../configs/base_url";

function App() {
  const authToken = useSelector((state) => state.reducer.auth.token);
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = authToken
    ? `Bearer ${authToken}`
    : null;

  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default App;
