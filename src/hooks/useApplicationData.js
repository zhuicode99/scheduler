import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(()=>{
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all)=>{
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments:all[1].data, 
        interviewers:all[2].data }));
      })
    },[])
 


    function spotsRemaining(state, id, spot) {
      const day = state.days.find((day) => day.appointments.includes(id));
      const newDay = { ...day, spots: day.spots + spot };
      const newDays = state.days.map(day => day.id === newDay.id ? newDay : day);
    
      return newDays;
    };
   
/*     const spotsRemaining = function(state, appointments) {
      const dayObj = state.days.find(d => d.name === state.day)
      let spots = 0;
      for (const id of dayObj.appointments){
        const appointment = appointments[id];
        if (!appointment.interview){
          spots++;
        }
      }
      const day = {...dayObj, spots};
      const days = state.days.map(d => d.name === state.day ? day : d);

      return days;
    } */


      function bookInterview(id, interview) {
        const days = spotsRemaining(state, id, state.appointments[id].interview ? 0 : -1);

        const appointment = {
          ...state.appointments[id],
          interview: {...interview}
        };
  
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
  
        return axios.put(`/api/appointments/${id}`, appointment)
        .then(res => {
          setState({...state, days, appointments});
        })
        .catch(err => console.log(err))
      }

      //delete appointment
      function cancelInterview(id) {

        const days = spotsRemaining(state, id, 1);

        const appointment = {
          ...state.appointments[id],
          interview: null
        };
  
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
  
        return axios.delete(`/api/appointments/${id}`)
        .then(res => {
          setState({...state, days, appointments});
        })
  
      }

     
      return { state, setDay, bookInterview, cancelInterview, spotsRemaining };
  }
