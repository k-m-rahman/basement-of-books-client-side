const { useEffect } = require("react");

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Basement of Books`;
  }, [title]);
};

export default useTitle;
