import { Avatar, Button, Table } from "flowbite-react";
import React from "react";
import deleteIcon from "../../../../assets/icons/delete.svg";
import updateIcon from "../../../../assets/icons/update.svg";

const TableRow = ({ seller }) => {
  const { name, email, photo } = seller;
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <Avatar img={photo} rounded={true} />
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>
        <Button size="xs" gradientMonochrome="failure">
          Delete{" "}
          <img className="w-5 mx-1 md:w-6 md:ml-2" src={deleteIcon} alt="" />
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button size="xs" gradientMonochrome="info">
          Verify{" "}
          <img
            className="w-5 mx-1 md:w-6 md:ml-2"
            src={updateIcon}
            alt=""
          ></img>
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
