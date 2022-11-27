import { Avatar, Button, Table } from "flowbite-react";
import React from "react";
import deleteIcon from "../../../../assets/icons/delete.svg";
import updateIcon from "../../../../assets/icons/update.svg";
import verifyIcon from "../../../../assets/icons/verify.png";
const TableRow = ({
  seller,
  setShowModal,
  setSelectedSeller,
  handleVerifySeller,
}) => {
  const { name, email, photo } = seller;

  const handleDelete = () => {
    setShowModal(true);
    setSelectedSeller(seller);
  };

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <Avatar img={photo} rounded={true} />
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>
        <Button
          className="w-20"
          onClick={handleDelete}
          size="xs"
          gradientMonochrome="failure"
        >
          Delete{" "}
          <img className="w-5 mx-1 md:w-6 md:ml-2" src={deleteIcon} alt="" />
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button
          className="w-24 "
          onClick={() => {
            handleVerifySeller(seller);
          }}
          size="xs"
          gradientMonochrome="info"
          disabled={seller?.verified}
        >
          {seller?.verified ? (
            <>
              Verified{" "}
              <img
                className="w-5 mx-1 md:w-6 md:ml-2"
                src={verifyIcon}
                alt=""
              ></img>
            </>
          ) : (
            <>
              Verify{" "}
              <img
                className="w-5 mx-1 md:w-6 md:ml-2"
                src={updateIcon}
                alt=""
              ></img>
            </>
          )}{" "}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
