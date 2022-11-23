const addDarkModeDataToDb = (darkMode) => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
};

const getStoredDarkModeData = () => {
  const storedData = JSON.parse(localStorage.getItem("darkMode"));

  return storedData;
};

export { addDarkModeDataToDb, getStoredDarkModeData };
