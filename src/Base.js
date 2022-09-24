import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import SideBar from "./components/Layout/Sidebar";
// import { Redirect } from 'react-router-dom';
import authHeader from './utils/AuthHeader';
import { useLocation } from "react-router-dom";

const Base = (props) => {

    const [state, setstate] = useState()
    let getWidth = window.innerWidth
    
    let location = useLocation();
    var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] === '/' ? 1 : 0);

    useEffect(() => {
        setstate(state)
    }, [getWidth])

    let displayMode = 'browser';
    const mqStandAlone = '(display-mode: standalone)';

    // useEffect(() => {
    //     // console.log("dileep 1111");
    //     // <Redirect to="/student" />
    // }, [(navigator.standalone || window.matchMedia(mqStandAlone).matches)])
    
    
    if(!authHeader()){
        return (
            <>
                {props.children}
            </>
        );
    }
    else{
        return (
            <>
                <Header/>
                <div className={location.pathname.includes("student") ? "d-flex student_responsive_sidebar" : "d-flex"}>
                    {(navigator.standalone || window.matchMedia(mqStandAlone).matches) && getWidth <= 800 ?
                     <SideBar/>
                    :
                    <>
                   { window.location.href.includes("student") && segmentCount === 1  && getWidth >= 800 ? <></> : <SideBar/> } 
                   
                    </>
                    }
                    {props.children}
                </div>
            </>
        );
    }
   
};

export default Base;
