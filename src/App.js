import React, { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/auth/login"));
const Home = lazy(() => import("./components/home"));

function App() {
  const bool = window.localStorage.getItem("isLoggedIn");
  return (
    // <div className="App">
      <Suspense fallback={<span>Loading...</span>}>
        {bool ? <Home /> : <Login />}
      </Suspense>
    // </div>
  );
}

export default App;
