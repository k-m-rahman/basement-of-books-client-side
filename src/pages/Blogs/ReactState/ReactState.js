import { Card } from "flowbite-react";
import React from "react";

const ReactState = () => {
  return (
    <div className="md:w-8/12 md:mx-auto mx-5 mt-10">
      <h3 className="capitalize text-3xl text-center mb-3 mt-5 underline italic font-semibold text-slate-700 dark:text-white">
        React State
      </h3>
      <Card imgSrc="https://miro.medium.com/max/1200/1*hYSKyofnqThnPIsYRfnUUQ.png">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          What are the different ways to manage a state in a React application?
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-start">
          The state is an object that holds information about a certain
          component. Plain JavaScript functions don't have the ability to store
          information. The code within them executes and "dissapears" once the
          execution is finished.But thanks to state, React functional components
          can store information even after execution. When we need a component
          to store or "remember" something, or to act in a different way
          depending on the environment, state is what we need to make it work
          this way.
          <br /> <br /> There are some different ways, such as - hooks, context
          api, redux to manage a state in react application.
          <br />
          To manage state locally, useState hooks allow us to track state in a
          function component.We initialize our state by calling useState in our
          function component. useState accepts an initial state and returns two
          values: The current state. A function that updates the state.
          <br />
          React Context is a way to manage state globally. It can be used
          together with the useState Hook to share state between deeply nested
          components more easily than with useState alone.
        </p>
      </Card>
    </div>
  );
};

export default ReactState;
