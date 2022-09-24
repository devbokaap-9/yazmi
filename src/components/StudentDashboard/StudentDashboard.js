import React, { useState,useEffect,useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import StudentDashboardSidebar from "../Layout/StudentDashboardSidebar";
import MyCourses from "./StudentComponents/MyCourses";
import MyLibrary from "./StudentComponents/MyLibrary";
import { useDispatch, useSelector } from "react-redux";
import {getTags,getCourse,getCategories} from "../../actions/Content";
import {getCourseStatus} from "../../actions/Learning";
import {UserContext} from "../../UserContext";

const Learner = () => {
  let dispatch = useDispatch();
  const userContext = useContext(UserContext)

  useEffect(() => {
    if(window.location.href.includes("student")){
      dispatch(getTags());
      dispatch(getCourse());
      dispatch(getCategories());
      dispatch(getCourseStatus());
    }
  },[])

  const [key, setKey] = useState("courses");
  const [type,setType] = useState("courseLibrary")

  const changeType = () =>  {
    setType("")
  }
 
  return (
    <div className="student_dashboard">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {setKey(k);setType("courseLibrary");userContext.setCourseFilterValue("")}}
        className="mb-3"
      >
        <Tab eventKey="courses" title="Courses">
          <MyCourses keyName={key} tabType={type} changeTabType={changeType}/>
        </Tab>
        <Tab eventKey="library" title="Library">
          <MyLibrary keyName={key} tabType={type} changeTabType={changeType}/>
        </Tab>
      </Tabs>
      {/* <StudentDashboardSidebar /> */}
    </div>
  );
};

export default Learner;
