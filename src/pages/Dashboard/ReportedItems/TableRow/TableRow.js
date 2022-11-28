import { Button, Table } from "flowbite-react";
import React from "react";
import deleteIcon from "../../../../assets/icons/delete.svg";

const TableRow = ({ product, setShowModal, setSelectedProduct }) => {
  console.log(product);
  const handleDelete = () => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {product.title}
      </Table.Cell>
      <Table.Cell>{product.sellerName}</Table.Cell>
      <Table.Cell>{product.resalePrice}</Table.Cell>
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
    </Table.Row>
  );
};

export default TableRow;
