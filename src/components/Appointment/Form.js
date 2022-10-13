import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

//replace the save function 
   const errorHandle = () => {
		if (student === '') {
			setError('Student name cannot be blank');
			return;
		}
		if (interviewer === null) {
			setError('You must choose an interviewer');
			return;
		}
		setError('');
		props.onSave(student, interviewer);
	};


  const reset = () => {
		setStudent('');
		setInterviewer(null);
	};


  const cancel = () => {
    props.onCancel(reset());
  }

 

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
          />
          <section className="appointment__errorHandle">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={errorHandle}>Save</Button>
        </section>
      </section>
    </main>
  )
}