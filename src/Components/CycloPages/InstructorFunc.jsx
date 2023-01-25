import React, { Component } from "react";

export default class InstructorFunc extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUpdate() {}
  render() {
    return (
      <div className="">
        Name:{this.props.instructor.name} <br />
        Email:{this.props.instructor.email} <br />
        Phone: {this.props.instructor.phone} <br />
      </div>
    );
  }
}
