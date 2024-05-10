import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/darkModeSlice";

const BtnDark = () => {
  const isDarkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    // Comprobar el estado del modo oscuro en el almacenamiento local al cargar la página
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    dispatch(toggleDarkMode(storedDarkMode)); // Actualiza el estado global al valor almacenado
  }, [dispatch]);

  useEffect(() => {
    // Aplicar el modo oscuro al cargar la página
    if (isDarkMode) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }, [isDarkMode]);

  const enableDarkMode = () => {
    document.body.classList.add("dark");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark");
  };

  const toggleDarkModeHandler = () => {
    const newDarkModeState = !isDarkMode;
    dispatch(toggleDarkMode(newDarkModeState)); // Actualiza el estado global al nuevo valor
    // Guardar el estado del modo oscuro en el almacenamiento local
    localStorage.setItem("darkMode", newDarkModeState);
  };

  return (
    <button
      onClick={toggleDarkModeHandler}
      title={`${isDarkMode ? " Light Mode " : "Dark Mode"}`}
      className={`focus:border-none font-extrabold text-xl ${
        isDarkMode ? "animate-bounce" : " animate-pulse"
      }`}
    >
      {isDarkMode ? " ☼ " : "☾"}
    </button>
  );
};

export default BtnDark;
