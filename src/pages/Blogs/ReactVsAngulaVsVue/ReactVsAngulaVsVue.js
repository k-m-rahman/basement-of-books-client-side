import { Card, Table } from "flowbite-react";
import React from "react";

const ReactVsAngulaVsVue = () => {
  return (
    <div className="md:w-8/12 md:mx-auto mx-5 my-10 ">
      <h3 className="capitalize text-3xl text-center mb-3 mt-5 underline italic font-semibold text-slate-700 dark:text-white">
        react vs angular vs vue
      </h3>
      <img
        alt=""
        className="mb-2 rounded-xl"
        src="https://www.simplilearn.com/ice9/free_resources_article_thumb/recact_angular_vue.jpg"
      ></img>
      <Table>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>React</Table.HeadCell>
          <Table.HeadCell>Angular</Table.HeadCell>
          <Table.HeadCell>Vue</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Type</Table.Cell>
            <Table.Cell>Open Source JS Library</Table.Cell>
            <Table.Cell>JS Framework</Table.Cell>
            <Table.Cell>Progressive JS Framework</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Coding Speed</Table.Cell>
            <Table.Cell>Normal</Table.Cell>
            <Table.Cell>Slow</Table.Cell>
            <Table.Cell>Fast</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Data Binding</Table.Cell>
            <Table.Cell>Uni-directional</Table.Cell>
            <Table.Cell>Bi-directional</Table.Cell>
            <Table.Cell>Bi-directional</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Rendering</Table.Cell>
            <Table.Cell>Server Side</Table.Cell>
            <Table.Cell>Client Side</Table.Cell>
            <Table.Cell>Server Side</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default ReactVsAngulaVsVue;
