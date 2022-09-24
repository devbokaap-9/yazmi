import React,{useState, useEffect,useContext} from "react";
import { NavLink, useLocation,useHistory } from "react-router-dom";
import QuestionAnsSidebar from "./QuestionAnsSidebar";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {UserContext} from "../../UserContext";
import {getLessonPracticeExamData} from "../../actions/Content";
import {extensionMapping} from "../../Constants";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const Student = (props) => {
  let location = useLocation();
  let history = useHistory();
  let dispatch = useDispatch();
  let userContext = useContext(UserContext);
  const [courseDatas,setCourseData] = useState([])
  let [color, setColor] = useState("#ffffff");
  const [loading,setLoading] = useState(true)

  const removeSideBar = () => {
    props.classRemove();
  };
  
  const handlePush = () => {
    history.push("/student")
  }

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);
  

  useEffect(() => {
    if(window.location.href.includes('student') && window.location.href.includes('course-details') && (segmentCount === 5 || segmentCount === 4 || segmentCount === 3 || segmentCount === 2) && !userContext.frmUpdating){
      history.push('/student')
    }
  },[])

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);
  

  useEffect(() => {
    let courseData = [];
    if(courseDetailsData && courseDetailsData.id){
      courseData.push(...courseDetailsData.lessons,...courseDetailsData.practices,...courseDetailsData.exams)
      setCourseData(courseData);
      userContext.setFrmUpdating(false)
    }
  },[courseDetailsData])


  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

  let getWidth = window.innerWidth

  const getCourseDetailsData = (type,id,key) => {
    console.log(2)
    let courseArray = [];
    userContext.setFrmLdng(true)
    dispatch(getLessonPracticeExamData(courseDetailsData.id,id,type+"s"))
    setLoading(true)
    if((key + 1) === courseDatas.length){
      userContext.setPracticeExamSctnData([])
    }
    else{
      let nextSectionId = 0
      let nextSectionType = 0
      if(courseDatas[key+1]){
        nextSectionId = courseDatas[key+1].id
        nextSectionType = courseDatas[key+1].content_type_name
        courseArray.push({"id":nextSectionId,"type" :nextSectionType+"s","key":key+1})
        userContext.setPracticeExamSctnData(courseArray)
      }
    }
  }

  const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);

  useEffect(() => {
    if(getLessonPracticeExamDataRes && loading){
      setLoading(false)
    }
  })
  
  return (
    <>
      {location.pathname.includes("start-test") || location.pathname === "/student/viewexam/startexam"  ? (
        <QuestionAnsSidebar />
      ) : (
        <div className={location.pathname === "/student" && segmentCount === 1 && getWidth <= 800 ? "student_sidebar d-none" : "student_sidebar sidebar_bg_color"}>
          { (location.pathname === "/student/viewexam" || location.pathname.includes("/student/course-details")  || location.pathname === "/student/pratices" ) && getWidth <= 800 ? 
          <></> :
          <button className="btn" onClick={handlePush} >
            <span>
              <svg
                width="13"
                height="12" 
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1L1 6L6 11"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H12.4286"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Introduction to {courseDetailsData.title}
          </button>
          }
          <ul className="list-unstyled">
            {courseDatas && courseDatas.map((data,key) => {
              return(
                <li>
                  <NavLink
                    to={"/student/course-details/"+data.content_type_name+"s/"+data.id}
                    className="Link_text"
                    activeClassName="users_box_active"
                    onClick={() => {removeSideBar();getCourseDetailsData(data.content_type_name,data.id,key)}}
                  >
                    {(data.is_submission)
                    ?
                      <span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7 0C3.13409 0 0 3.13409 0 7C0 10.8659 3.13409 14 7 14C10.8659 14 14 10.8659 14 7C14 3.13409 10.8659 0 7 0ZM10.0342 5.81636C10.0901 5.7525 10.1326 5.67811 10.1593 5.59756C10.186 5.51702 10.1963 5.43195 10.1896 5.34735C10.183 5.26276 10.1594 5.18036 10.1205 5.10499C10.0815 5.02962 10.0278 4.96281 9.96262 4.90849C9.89744 4.85417 9.82204 4.81343 9.74088 4.78868C9.65972 4.76392 9.57442 4.75565 9.49002 4.76435C9.40561 4.77304 9.32379 4.79853 9.24938 4.83931C9.17497 4.8801 9.10947 4.93535 9.05673 5.00182L6.32036 8.28482L4.90445 6.86827C4.78443 6.75235 4.62369 6.68821 4.45684 6.68966C4.28998 6.69111 4.13038 6.75804 4.01239 6.87602C3.8944 6.99401 3.82748 7.15362 3.82603 7.32047C3.82458 7.48732 3.88872 7.64807 4.00464 7.76809L5.91373 9.67718C5.97625 9.73967 6.05111 9.78845 6.13354 9.8204C6.21596 9.85236 6.30414 9.86679 6.39244 9.86278C6.48075 9.85877 6.56726 9.8364 6.64644 9.7971C6.72563 9.75781 6.79576 9.70245 6.85236 9.63455L10.0342 5.81636Z"
                            fill="#0AB83B"
                          />
                        </svg>
                      </span> 
                    :
                      <span></span>
                    }

                    <div className="">
                      {
                        data.content_type_name === "lesson"
                        ?
                          (extensionMapping(data.filetype) === "image")
                          ?
                            <span>
                              <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/image-svgrepo-com.svg'} alt="" />
                            </span>
                          :
                            (extensionMapping(data.filetype) === "video")
                            ?
                              <span>
                                <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/videoplaysvg.svg'} alt="" />
                              </span>
                            :
                              (extensionMapping(data.filetype) === "audio")
                              ?
                                <span>
                                  <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/mp3svg.svg'} alt="" />
                                </span>
                              :
                                (extensionMapping(data.filetype) === "doc")
                              ?
                                <span>
                                  <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/icons8-microsoft-word.svg'} alt="" />
                                </span>
                              :
                                (extensionMapping(data.filetype) === "excel")
                              ?
                                <span>
                                  <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/microsoft-excel-2013-logo-svgrepo-com.svg'} alt="" />
                                </span>
                              :
                                (extensionMapping(data.filetype) === "pdf")
                              ?
                                <span>
                                  <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/pdfsvg.svg'} alt="" />
                                </span>
                              :
                                (extensionMapping(data.filetype) === "ppt")
                                ?
                                  <span>
                                    <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/pptsvg.svg'} alt="" />
                                  </span>
                              :
                                "other"
                        :
                          (data.content_type_name) === "practice"
                          ?
                            <span>
                              <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/practicesvg.svg'} alt="" />
                            </span>
                          :
                            (data.content_type_name) === "exam"
                            ?
                              <span>
                                <img src={process.env.PUBLIC_URL + "/images/Group (5).svg"} alt="" />
                              </span>
                            :
                              <></>

                      }
                    </div>
                    <div className="extenssion_name">
                      <p>{data.title}</p>
                      {(data.content_type_name) === "practice"
                      ?
                        <span className="quiz">Practice Quiz</span>
                      :
                        (data.content_type_name) === "exam"
                        ?
                          <span className="quiz">Exam</span>
                        :
                          <span></span>
                      }
                    </div>
                  </NavLink>
                </li>
              )
            })}
            {/* <li>
              <NavLink
                to="/student/assesment"
                className="Link_text"
                activeClassName="users_box_active"
                onClick={removeSideBar}
              >
                <span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0C3.13409 0 0 3.13409 0 7C0 10.8659 3.13409 14 7 14C10.8659 14 14 10.8659 14 7C14 3.13409 10.8659 0 7 0ZM10.0342 5.81636C10.0901 5.7525 10.1326 5.67811 10.1593 5.59756C10.186 5.51702 10.1963 5.43195 10.1896 5.34735C10.183 5.26276 10.1594 5.18036 10.1205 5.10499C10.0815 5.02962 10.0278 4.96281 9.96262 4.90849C9.89744 4.85417 9.82204 4.81343 9.74088 4.78868C9.65972 4.76392 9.57442 4.75565 9.49002 4.76435C9.40561 4.77304 9.32379 4.79853 9.24938 4.83931C9.17497 4.8801 9.10947 4.93535 9.05673 5.00182L6.32036 8.28482L4.90445 6.86827C4.78443 6.75235 4.62369 6.68821 4.45684 6.68966C4.28998 6.69111 4.13038 6.75804 4.01239 6.87602C3.8944 6.99401 3.82748 7.15362 3.82603 7.32047C3.82458 7.48732 3.88872 7.64807 4.00464 7.76809L5.91373 9.67718C5.97625 9.73967 6.05111 9.78845 6.13354 9.8204C6.21596 9.85236 6.30414 9.86679 6.39244 9.86278C6.48075 9.85877 6.56726 9.8364 6.64644 9.7971C6.72563 9.75781 6.79576 9.70245 6.85236 9.63455L10.0342 5.81636Z"
                      fill="#0AB83B"
                    />
                  </svg>
                </span>

                <div className="icon_div">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/microsoft-powerpoint-logo.png"
                    }
                    alt=""
                  />
                </div>
                <div className="extenssion_name">
                  <p>Water & Soil (PPT)</p>
                  <span></span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/student/pratice"
                className="Link_text"
                activeClassName="users_box_active"
                onClick={removeSideBar}
              >
                <span className="number">11</span>

                <div className="icon_div">
                  <img
                    src={process.env.PUBLIC_URL + "/images/Vector (34).svg"}
                    alt=""
                  />
                </div>
                <div className="extenssion_name">
                  <p>Water & Soil (PPT)</p>
                  <span className="quiz">Practice Quiz</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/student/course"
                className="Link_text"
                activeClassName="users_box_active"
                onClick={removeSideBar}
              >
                <span className="number">11</span>

                <div className=" video_icon">
                  <img
                    src={process.env.PUBLIC_URL + "/images/videoimage.png"}
                    alt=""
                  />
                  <div className="play_icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM9.25156 7.10781L5.83906 9.59062C5.82035 9.60407 5.7983 9.61209 5.77533 9.61382C5.75236 9.61555 5.72935 9.61091 5.70884 9.60041C5.68834 9.58992 5.67112 9.57397 5.65908 9.55433C5.64705 9.53468 5.64066 9.5121 5.64062 9.48906V4.52656C5.64055 4.50348 5.64687 4.48082 5.65888 4.46111C5.67089 4.4414 5.68812 4.4254 5.70867 4.41488C5.72922 4.40436 5.75228 4.39974 5.7753 4.40153C5.79831 4.40331 5.82038 4.41144 5.83906 4.425L9.25156 6.90625C9.26768 6.91765 9.28084 6.93275 9.28991 6.95029C9.29899 6.96783 9.30373 6.98729 9.30373 7.00703C9.30373 7.02678 9.29899 7.04624 9.28991 7.06377C9.28084 7.08131 9.26768 7.09641 9.25156 7.10781Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <div className="extenssion_name">
                  <p>Water & Soil (PPT)</p>
                  <span className="quiz">Practice Quiz</span>
                </div>
              </NavLink>

              <li>
                <NavLink
                  to="/student/viewexam"
                  className="Link_text"
                  activeClassName="users_box_active"
                  onClick={removeSideBar}
                >
                  <span className="number">11</span>

                  <div className="icon_div">
                    <img
                      src={process.env.PUBLIC_URL + "/images/exam.svg"}
                      alt=""
                    />
                  </div>
                  <div className="extenssion_name">
                    <p>Exam Part 1</p>
                    <span className="quiz">Exam 1</span>
                  </div>
                </NavLink>
              </li>
            </li> */}
          </ul>
        </div>
      )}
      {(location.pathname === "/student" && segmentCount === 1 && getWidth <= 800) ?
        <></> 
        :
        <div className={loading ? "loader_div" : ""}>
          <ClipLoader
            color={color}
            className="loader"
            loading={loading}
            css={override}
            size={50}
          />
        </div>
      }
    </>
  );
};

export default Student;
