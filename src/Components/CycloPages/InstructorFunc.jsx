import React, { Component } from "react";
import { useEffect } from "react";

const InstructorFunc = (props) => {
  useEffect(() => {
    return () => {};
  });
  return (
    <div className="">
      Name:{props.instructor.name} <br />
      Email:{props.instructor.email} <br />
      Phone: {props.instructor.phone} <br />
    </div>
  );
};

export default InstructorFunc;
