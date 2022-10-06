import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

   return (
    <li 
    onClick={props.setInterviewer}
    className={interviewerListItemClass}
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected ? props.name : null}
    {/* {props.selected && props.name} */}
  </li>

   );
 }
