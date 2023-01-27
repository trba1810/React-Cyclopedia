import React, { useEffect, useRef, useId } from "react";
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

  const totalRender = useRef(0);
  const prevStudentCount = useRef(0);
  const feedbackInputRef = useRef(null);
  const Id = useId();

  const [inputName, setInputName] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  useEffect(() => {
    totalRender.current = totalRender.current + 1;
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
    if (!state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            { name: response.data.first_name + " " + response.data.last_name },
          ],
        };
      });
    };
    if (prevStudentCount.current < state.studentCount) {
      getUser();
    } else if (prevStudentCount.current > state.studentCount) {
      setState((prevState) => {
        return { ...prevState, studentList: [] };
      });
    }
    // eslint-disable-next-line
  }, [state.studentCount]);

  useEffect(() => {
    feedbackInputRef.current.focus();
    return () => {};
  });

  useEffect(() => {
    prevStudentCount.current = state.studentCount;
  }, [state.studentCount]);

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
      <div className="p-3">Total Render: {totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-success">Utisak</span> <br />
        <input
          type="text"
          placeholder="Name..."
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
          id={`${Id}-inputName`}
        ></input>{" "}
        <label htmlFor={`${Id}-inputName`}>Name Value:</label>
        {inputName}
        <br />
        <textarea
          placeholder="Utisak..."
          value={inputFeedback}
          ref={feedbackInputRef}
          id={`${Id}-inputFeedback`}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
        ></textarea>
        <label htmlFor={`${Id}-inputFeedback`}>Feedback Value:</label>
        {inputFeedback}
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
};
export default CyclopediaFunc;
