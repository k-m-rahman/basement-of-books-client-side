import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeContext } from "./contexts/ThemeProvider";
import { router } from "./Routes/Router";
import { getStoredDarkModeData } from "./utils/fakeDb";

function App() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const storedDarkModeData = getStoredDarkModeData();
    setDarkMode(storedDarkModeData);
  }, []);
  return (
    <div
      className={
        darkMode
          ? `"App dark min-h-screen  mx-auto"`
          : `"App min-h-screen  mx-auto"`
      }
    >
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
