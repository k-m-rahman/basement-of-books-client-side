import { Card } from "flowbite-react";
import React from "react";

const PrototypicalInheritance = () => {
  return (
    <div className="md:w-8/12 md:mx-auto mx-5 mt-10">
      <h3 className="capitalize text-3xl text-center mb-3 mt-5 underline italic font-semibold text-slate-700 dark:text-white">
        prototypical inheritance
      </h3>
      <Card imgSrc="https://blog.alexdevero.com/wp-content/uploads/2020/08/10-08-20-objects-prototype-and-prototypal-inheritance-in-javascript-blog.jpg">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          How does prototypical inheritance work?
        </h5>
        <p className="text-start font-normal text-gray-700 dark:text-gray-400">
          Prototypical inheritance refers to the ability to access object
          properties from another object. we use a JS prototype to add new
          properties and methods to an existing object constructor.
          <br></br>
          <br></br>
          Prototypical inheritance uses the concept of prototype chaining. Let's
          explore that concept. Every object created contains [[Prototype]],
          which points either to another object or null. Envision an object C
          with a [[Prototype]] property that points to object B. Object B's
          [[Prototype]] property points to prototype object A. This continues
          onward, forming a kind of chain called the prototype chain. This
          concept is used when searching our code. When we need to find a
          property in an object, it is first searched for in the object, and if
          not found, it is searched for on that object's prototype, and so on.
          Thus, the entire prototype chain is traversed until the property is
          found or null is reached.
        </p>
      </Card>
    </div>
  );
};

export default PrototypicalInheritance;
