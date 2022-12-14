export function getAppointmentsForDay(state, day) {
  

  const filteredDay = state.days.filter(data => data.name === day)
 
  if (filteredDay.length === 0) return [];

  const apmt = filteredDay[0].appointments;

  const result = apmt.map((num) => {
    return state.appointments[num];
  });

  return result;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerId]; 
  const resultObj = {...interview, interviewer: {...interviewerObj }};
  return resultObj;
};



export function getInterviewersForDay(state, day) {
  const result = [];
  const filteredDay = state.days.filter(data => data.name === day)

  if (filteredDay.length === 0) return [];

  for (const temp of filteredDay[0].interviewers) {
    result.push(state.interviewers[temp]);
  }
  
  return result;
};