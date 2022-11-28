import { Card } from "flowbite-react";
import React from "react";

const UnitTesting = () => {
  return (
    <div className="md:w-8/12 md:mx-auto mx-5 mt-10">
      <h3 className="capitalize text-3xl text-center mb-3 mt-5 underline italic font-semibold text-slate-700 dark:text-white">
        unit testing
      </h3>
      <Card imgSrc="https://ucarecdn.com/39483ff6-4269-400d-bca7-1dd059c31c02/">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          What is a unit test? Why should we write unit tests?
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-start">
          Unit testing is a software development process in which the smallest
          testable parts of an application, called units, are individually and
          independently scrutinized for proper operation. This testing
          methodology is done during the development process by the software
          developers and sometimes QA staff. The main objective of unit testing
          is to isolate written code to test and determine if it works as
          intended.
          <br /> <br />
          Unit testing is an important step in the development process, because
          if done correctly, it can help detect early flaws in code which may be
          more difficult to find in later testing stages.
          <br /> <br />
          <span className="font-semibold">
            {" "}
            Advantages to unit testing include:
          </span>
          <ul className="list-disc mx-5 mt-2 md:mx-10 ">
            <li>
              The earlier a problem is identified, the fewer compound errors
              occur.
            </li>
            <li>
              Costs of fixing a problem early can quickly outweigh the cost of
              fixing it later.
            </li>
            <li>Debugging processes are made easier.</li>
            <li>Developers can quickly make changes to the code base.</li>
            <li>
              Developers can also re-use code, migrating it to new projects.
            </li>
          </ul>
        </p>
      </Card>
    </div>
  );
};

export default UnitTesting;
