import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/LoginAndRegister/login';
import Register from './components/LoginAndRegister/register';
import Main from './components/Main/main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "register/",
    element: <Register />,
  },
  {
    path: "login/",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;