import React,{useState, useEffect} from "react";
// import { Tabs, Tab } from "react-bootstrap";
import { Tab, Nav, Col } from "react-bootstrap";
import AddExam from "./CourseComponent/AddExam";
import AddLesson from "./CourseComponent/AddLesson";
import PraticeTest from "./CourseComponent/PracticeTest";
import AssignTo from "../Modal/AssignTo";
import DeleteCourseData from "../Modal/DeleteCourseData";
import { useDispatch, useSelector } from "react-redux";
import {getLessonPracticeExamData, getAttachments, getTags} from "../../../actions/Content";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EditLesson from "./CourseComponent/EditLesson";
import EditPracticeTest from "./CourseComponent/EditPracticeTest";
import EditExam from "./CourseComponent/EditExam";
import {useLocation} from "react-router-dom";
import { extensionMapping } from "../../../Constants";
import checkPermission from "../../../utils/CheckPermission";
import CourseResponse from "./CourseResponse";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const CategoryDashboard = (props) => {
  let dispatch = useDispatch();
  let location = useLocation();
  const [key, setKey] = useState("");
  const [keys, setKeys] = useState("first_response");
  const [updateChangeType, setChangeType] = useState("createlesson");
  const [courseDatas,setCourseData] = useState([]);
  const [courseDataTitle,setCourseDataTitle] = useState("");
  const [courseDataId,setCourseDataId] = useState("");
  const [courseType,setCourseType] = useState("")
  const [loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");
  
  const [assign, setAssign] = useState(false)
  const [deleteCourseData, setDeleteCourseData] = useState(false)
  const [editCourseData, setEditCourseData] = useState(false)
  const [ValidCourseId, setValidCourseId] = useState("")


  const [State, setState] = useState(false)

  const handleShowAssign = () => {
    setAssign(true)
  }
  const handleCloseAssign = () => {
    setAssign(false)
  }
  
  const handleShowDelete = (title,id,type) => {
    setDeleteCourseData(true)
    setCourseDataTitle(title)
    setCourseDataId(id)
    setCourseType(type)
  }
  const handleCloseDelete = () => {
    setDeleteCourseData(false)
  }

  if(props.loader && (State || key !== "")){
    setKey("")
    if(State){
      setState(false)
    }
    if(key !== ""){
      setKey("")
    }
  }

  const keySet = () => {
    setKey("");
    setState(false)
  }
  
  const changeTypeFun = () => {
    setChangeType("")
  }

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);
  //course details data get
  useEffect(() => {
    let courseData = [];
    if(courseDetailsData && courseDetailsData.id){
      courseData.push(...courseDetailsData.lessons,...courseDetailsData.practices,...courseDetailsData.exams)
      setCourseData(courseData);
    }
  },[courseDetailsData])

  //edit course data
  const handleEditCourseData = (title,id,type) => {
    setCourseDataTitle(title)
    setCourseDataId(id)
    setLoading(true)
    let segments = window.location.href.split("/");
    let segment = segments[segments.length-1];
    setCourseType(type);
    setState(true)
    
    if(type === "lesson"){
      type = "lessons";
    }
    else if(type === "practice"){
      type = "practices";
    }
    else if(type === "exam"){
      type = "exams"
    }
    dispatch(getLessonPracticeExamData(segment,id,type))
    if(type === "lessons"){
      dispatch(getAttachments())
      dispatch(getTags())
    }
  }

  const closeEditLessonPraciceExamModal = () => {
    setEditCourseData(false)
  }

  const lessonPracticeExamData = useSelector((state) => state.contentData.getLessonPracticeExamData);
  
  //lesson practice exam details data     
  useEffect(() => {
    if(lessonPracticeExamData && lessonPracticeExamData.id){
      setEditCourseData(true)
      setLoading(false)
    }
  },[lessonPracticeExamData])

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

  let url = window.location.href.split("/")
    let courseId = url[url.length-1];

    useEffect(() => {
      if(courseId === null){
        setValidCourseId("")
      }else{
        setValidCourseId(courseId)
      }
    }, [courseId])

    console.log("keyyyyyyyy :: ",keys);

    const keysFunction = (k) => {
      setKeys(k)
      if(k === "first_response"){
        setKey("")
      }
    }

  return (
    <>
    <Tab.Container id="noanim-tab-example" defaultActiveKey="first_response" activeKey={keys} onSelect={(k)=>{keysFunction(k)}}>
        <Col sm={12}>
          <Nav variant="pills" className="flex-row nav_pills">
            <Nav.Item className="nav_item"> 
              <Nav.Link eventKey="first_response">Questions</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav_item">
              <Nav.Link eventKey="second_response">Responses</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        
        <Col sm={12}>
          <Tab.Content className="tab_content">
            <Tab.Pane eventKey="first_response">
            <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)} >
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  {checkPermission('custom_course_data_created')
                  ?
                    <>
                      <Nav.Item>
                        <Nav.Link eventKey="lesson" disabled={ValidCourseId === "" ? true : false }>Add a new lesson</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="practice" disabled={ValidCourseId === "" ? true : false }>Add a practice test</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="exam" disabled={ValidCourseId === "" ? true : false }>Add an exam</Nav.Link>
                      </Nav.Item>
                    </>
                  :
                    <></>
                  }
                  {checkPermission('custom_course_operation_assign')
                  ?
                    <Nav.Item>
                      <Nav.Link onClick={handleShowAssign} disabled={ValidCourseId === "" ? true : false } >Assign To</Nav.Link>
                    </Nav.Item>
                  :
                    <></>
                  }
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="lesson" >
                    <AddLesson callBack={keySet} typeFunction={changeTypeFun} type={updateChangeType} changeType="addLesson" key={key}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="practice">
                  <PraticeTest callBack={keySet} key={key}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="exam">
                    <AddExam callBack={keySet} key={key}/>
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="assign">
                  </Tab.Pane> */}
                </Tab.Content>
              </Col>
            </Tab.Container>
            </Tab.Pane>

            <Tab.Pane eventKey="second_response">
              <CourseResponse />
        </Tab.Pane>
          </Tab.Content>
        </Col>
      {key === "" && segmentCount === 3 && keys === "first_response" ? 
      <>
        <div className="learning" className={State ? "d-none" : "learning"}>
          {courseDatas && courseDatas.map((data,key) => {
            return(
              <div className="courses">
                <div className="courses_div">
                  <span className="serial_num">{key+1}</span>
                  <div className="courses_name">
                    {data.content_type_name === "lesson"
                    ?
                        (extensionMapping(data.filetype) === "image")
                          ?
                            <span>
                              <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/image-svgrepo-com.svg'} alt="" />
                            </span>
                          : (extensionMapping(data.filetype) === "video")
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
                        <></>
                      : (data.content_type_name === "practice")
                      ?
                        <span>
                          <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/practicesvg.svg'} alt="" />
                        </span>
                      :
                        (data.content_type_name === "exam")
                        ?
                          <span>
                            <img src={process.env.PUBLIC_URL + "/images/Group (5).svg"} alt="" />
                          </span>
                        :
                          <></>
                    }
                    <div>
                      <p className="mb-0">{data.title}</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                {checkPermission('custom_course_data_edit')
                    ?
                    <span className="edit_icon" style={{marginRight:"10px",cursor:"pointer"}} onClick={()=>{handleEditCourseData(data.title,data.id,data.content_type_name)}}>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.0488 1.95122C12.8952 0.796822 12.0288 0.969622 12.0288 0.969622L7.18716 5.81122L1.76796 11.2296L0.959961 15.0392L4.77036 14.2312L10.1896 8.81442L15.0312 3.97282C15.0304 3.97282 15.204 3.10642 14.0488 1.95122ZM4.54396 13.7736L3.24476 14.0536C3.10098 13.7777 2.91471 13.5261 2.69276 13.308C2.47448 13.0861 2.22292 12.8996 1.94716 12.7552L2.22716 11.4568L2.60316 11.0816C2.60316 11.0816 3.30956 11.096 4.10796 11.8944C4.90556 12.6912 4.92076 13.3992 4.92076 13.3992L4.54396 13.7736Z"
                                  fill="#7CD21F"
                                />
                              </svg>
                            </span>
                            :
                  <></>
                }

                {checkPermission('custom_course_data_delete')
                ?
                  <span  onClick={() => {handleShowDelete(data.title,data.id,data.content_type_name);}} className="delete_icon">
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7143 1.11111L11.7857 1.11111L10.6633 0L5.05102 0L3.92857 1.11111L0 1.11111L0 3.33333L15.7143 3.33333V1.11111ZM1.12245 17.7778C1.12245 18.3671 1.35896 18.9324 1.77996 19.3491C2.20096 19.7659 2.77196 20 3.36735 20L12.3469 20C12.9423 20 13.5133 19.7659 13.9343 19.3491C14.3553 18.9324 14.5918 18.3671 14.5918 17.7778L14.5918 4.44444L1.12245 4.44444L1.12245 17.7778Z"
                        fill="#FD4F48"
                      />
                    </svg>
                  </span>
                :
                  <></>
                }
                </div>
              </div>
            )
          })}
        </div> 
      
    
      </>
      : <></>
      }
      </Tab.Container>
      <AssignTo  show={assign}  closeModal={handleCloseAssign} />
      <DeleteCourseData show={deleteCourseData} closeModal={handleCloseDelete} title={courseDataTitle} id={courseDataId} type={courseType}/>
      {(courseType === "lesson" && State && editCourseData && key === "" && !loading)
      ?
        <EditLesson callBack={keySet}  setStateBack={setState} id={courseDataId}/>
      :
        (courseType === "practice" && State && editCourseData && key === "" && !loading)
        ?
          <EditPracticeTest callBack={keySet}  setStateBack={setState}/>
        :
          (courseType === "exam" && State && editCourseData && key === "" && !loading)
          ?
            <EditExam callBack={keySet}  setStateBack={setState}/>
          :
            <></>
      }
      <div className={loading ? "loader_div" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={loading}
          css={override}
          size={50}
        />
      </div>
    </>
  );
};

export default CategoryDashboard;
