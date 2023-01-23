import React from "react";
import { getRandomUser } from "../../Utility/api";
import Instructor from "./Instructor";

export default class CyclopediaClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cycloState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }
  componentDidMount = async () => {
    if (JSON.parse(localStorage.getItem("cycloState"))) {
    } else {
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
    }
  };
  componentDidUpdate = async (previousProps, previousState) => {
    localStorage.setItem("cycloState", JSON.stringify(this.state));
    if (previousState.studentCount < this.state.studentCount) {
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    } else if (previousState.studentCount > this.state.studentCount) {
      this.setState((prevState) => {
        return {
          studentList: [],
        };
      });
    }
  };
  componentWillUnmount() {
    console.log("unmount");
  }

  handleAddStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: 0,
      };
    });
  };

  handleToggleInstructor = () => {
    this.setState((prevState) => {
      return {
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  render() {
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instruktor &nbsp;</span>
          <i
            className={`bi ${
              this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
            } btn btn-success btn-sm`}
            onClick={this.handleToggleInstructor}
          ></i>
          {!this.state.hideInstructor && this.state.instructor ? (
            <Instructor instructor={this.state.instructor} />
          ) : null}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Utisak</span> <br />
          <input
            type="text"
            placeholder="Name..."
            value={this.state.inputName}
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
          ></input>
          <br />
          <textarea
            placeholder="Utisak..."
            value={this.state.inputFeedback}
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="p-3">
          <span className="h4 text-success">Studenti</span> <br />
          <div>Broj studenata: {this.state.studentCount}</div>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleAddStudent}
          >
            Dodaj studenta
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={this.handleRemoveAllStudent}
          >
            Obrisi sve studente
          </button>
          {this.state.studentList.map((student, index) => {
            return (
              <div className="text-white" key={index}>
                -{student.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
