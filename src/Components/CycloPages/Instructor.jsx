import React, { Component } from "react";

export default class Instructor extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUpdate() {}
  render() {
    return (
      <div className="p-3">
        <span className="h4 text-success">Instruktor</span>
        <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
        <br />
        Name:{this.props.instructor.name} <br />
        Email:{this.props.instructor.email} <br />
        Phone: {this.props.instructor.phone} <br />
      </div>
    );
  }
}
