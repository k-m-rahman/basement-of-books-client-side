import { Button, Modal } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { getStoredDarkModeData } from "../../utils/fakeDb";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  title,
  successButtonName,
  successAction,
  modalData,
}) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const storedDarkModeData = getStoredDarkModeData();
    setDarkMode(storedDarkModeData);
  }, []);
  return (
    <React.Fragment>
      <Modal
        className={darkMode ? "dark" : "light"}
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => successAction(modalData)}>
                {successButtonName}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmationModal;
