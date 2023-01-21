import React from "react";
import { getRandomUser } from "../../Utility/api";

export default class CyclopediaClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  }
  componentDidMount = async () => {
    const response = await getRandomUser();
    this.setState(() => {
      return {
        instructor: {
          name: response.data.first_name + " " + response.data.last_name,
          email: response.data.email,
          phone: response.data.phone_number,
        },
      };
    });
  };
  componentDidUpdate() {
    console.log("update");
  }
  componentWillUnmount() {
    console.log("unmount");
  }
  render() {
    return (
      <div>
        {this.state.instructor && (
          <div className="p-3">
            <span className="h4 text-success">Instructor</span>
            <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
            <br />
            Name:{this.state.instructor.name} <br />
            Email:{this.state.instructor.email} <br />
            Phone: {this.state.instructor.phone} <br />
          </div>
        )}
      </div>
    );
  }
}
