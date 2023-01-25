import React, { useEffect } from "react";
import { getRandomUser } from "../../Utility/api";
import Instructor from "./Instructor";
import { useState } from "react";

const CyclopediaFunc = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  const [inputName, setInputName] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    getUser();
  }, []);

  // this.state = JSON.parse(localStorage.getItem("cycloState")) || {
  //   instructor: undefined,
  //   studentList: [],
  //   studentCount: 0,
  //   hideInstructor: false,
  //   inputName: "",
  //   inputFeedback: "",
  // };

  //   componentDidMount = async () => {
  //     if (JSON.parse(localStorage.getItem("cycloState"))) {
  //     } else {
  //       const response = await getRandomUser();
  //       this.setState(() => {
  //         return {
  //           instructor: {
  //             name: response.data.first_name + " " + response.data.last_name,
  //             email: response.data.email,
  //             phone: response.data.phone_number,
  //           },
  //         };
  //       });
  //     }
  //   };
  //   componentDidUpdate = async (previousProps, previousState) => {
  //     localStorage.setItem("cycloState", JSON.stringify(this.state));
  //     if (previousState.studentCount < this.state.studentCount) {
  //       const response = await getRandomUser();
  //       this.setState((prevState) => {
  //         return {
  //           studentList: [
  //             ...prevState.studentList,
  //             {
  //               name: response.data.first_name + " " + response.data.last_name,
  //             },
  //           ],
  //         };
  //       });
  //     } else if (previousState.studentCount > this.state.studentCount) {
  //       this.setState((prevState) => {
  //         return {
  //           studentList: [],
  //         };
  //       });
  //     }
  //   };
  //   componentWillUnmount() {
  //     console.log("unmount");
  //   }

  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handleToggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  {
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instruktor &nbsp;</span>
          <i
            className={`bi ${
              state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
            } btn btn-success btn-sm`}
            onClick={handleToggleInstructor}
          ></i>
          {!state.hideInstructor && state.instructor ? (
            <Instructor instructor={state.instructor} />
          ) : null}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Utisak</span> <br />
          <input
            type="text"
            placeholder="Name..."
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          ></input>
          <br />
          <textarea
            placeholder="Utisak..."
            value={inputFeedback}
            onChange={(e) => {
              setInputFeedback(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="p-3">
          <span className="h4 text-success">Studenti</span> <br />
          <div>Broj studenata: {state.studentCount}</div>
          <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
            Dodaj studenta
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={handleRemoveAllStudent}
          >
            Obrisi sve studente
          </button>
          {state.studentList.map((student, index) => {
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
};

export default CyclopediaFunc;
