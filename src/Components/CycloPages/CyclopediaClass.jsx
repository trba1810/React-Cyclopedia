import React from "react";
import { getRandomUser } from "../../Utility/api";

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
  componentDidUpdate() {
    localStorage.setItem("cycloState", JSON.stringify(this.state));
  }
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
    this.setState(() => {
      return {
        studentCount: 0,
      };
    });
  };

  render() {
    return (
      <div>
        {this.state.instructor && (
          <div className="p-3">
            <span className="h4 text-success">Instruktor</span>
            <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
            <br />
            Name:{this.state.instructor.name} <br />
            Email:{this.state.instructor.email} <br />
            Phone: {this.state.instructor.phone} <br />
          </div>
        )}
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
        </div>
      </div>
    );
  }
}
