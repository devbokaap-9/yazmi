import React,{useEffect,useState,useContext} from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Row, Col, ProgressBar } from "react-bootstrap";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {courseFilterByTags,getCourse,getCourseDetails,removeLessonPracticeExamData} from "../../../actions/Content";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {UserContext} from "../../../UserContext";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const MyCourses = (props) => {
  let dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  let userContext = useContext(UserContext);

  const [tagIds,setTagIds] = useState([])
  const [courses,setCourses] = useState([])
  const [loading,setLoading] = useState(true)
  const [courseLoading,setCourseLoading] = useState(false)
  const [DataLength,setDataLength] = useState(5)
  const [completedCourses,setCompletedCourses] = useState([])
  const [CoursesDataLength,setCoursesDataLength] = useState(3)
  const [CompleteDataLength,setCompleteDataLength] = useState(3)
  const [CoursesDataState,setCoursesDataState] = useState(false)
  const [CompleteDataState,setCompleteDataState] = useState(false)
  let [color, setColor] = useState("#ffffff");


  let getWidth = window.innerWidth

  const settings2 = {
    dots: true,
    infinite: CompleteDataState,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 800,
        settings: "unslick",
        // settings: {
        //   slidesToShow: 3,
        //   slidesToScroll: 3,
        //   infinite: true,
        // }
      },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2,
      //     initialSlide: 2
      //   }
      // },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // }
    ],
  };

  const settings3 = {
    dots: true,
    infinite: CoursesDataState,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 800,
        settings: "unslick",
        // settings: {
        //   slidesToShow: 3,
        //   slidesToScroll: 3,
        //   infinite: true,
        // }
      },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2,
      //     initialSlide: 2
      //   }
      // },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // }
    ],
  };



  // let completedCourses = courses && courses.results && courses.results.filter(obj => obj.is_course_completed === true)

  const courseData = useSelector((state) => state.contentData.getCourses);
  const courseDataByTags = useSelector((state) => state.contentData.courseDataByTags);
  const contentTagData = useSelector((state) => state.contentData.getCategoryData);
  const courseCountData = useSelector((state) => state.learningData.courseCountStatus);
  // console.log(courseCountData,'countsss')

  const  tagChanges = (e,tagType,tagId) => {
    setLoading(true)
    let id = []
    
    userContext.setCourseFilterValue("")
    if(tagType === "all"){
      let elm = document.querySelectorAll(".separate_tag");
      setCourses([])
      // setLoading(true)
      for(let i=0; i<elm.length; i++){
        elm[i].classList.remove('green_btn');
      }
    }
    else{
      props.changeTabType()
      document.getElementsByClassName("all_tag")[0].classList.remove("green_btn")
    }

    //check if id is already in array or not
    if(e.target.classList.contains("green_btn")){
      //if id is already in array
      e.target.classList.remove("green_btn")
      if(tagType === "all"){
        setTagIds([])
      }
      else{
        id.push(...tagIds)
        const index = id.indexOf(tagId);
        if (index > -1) {
          id.splice(index, 1);
        }
        setTagIds(id)
      }
    }
    else{
      e.target.classList.add("green_btn")
      if(tagType === "all"){
        // if(courses.length === 0){
          setCourseLoading(true)
          dispatch(getCourse());
        // }
        setTagIds([])
      }
      else{
        if(tagIds.length === 0){
          id.push(tagId)
        }
        else{
          id.push(...tagIds,tagId)
        }
        setTagIds(id)
      }
    }
    if(id.length !== 0){
      let data = {
        "tags" : id
      }
      //error
      dispatch(courseFilterByTags(data,'category'))
    }
    else{
      // if(tagType !== "all"){
      //   setLoading(false)
      // }
      setCourses([])
    }
  } 

  useEffect(() => {
    if(props.tabType === "courseLibrary" && props.keyName === "courses"){
      setLoading(true)
      if(courseData && courseData.length !== 0){
        // setCourses(courseData.results)

        let assignedCourses = courseData && courseData.results && courseData.results.filter(obj => obj.is_course_compulsory === true)
        setCourses(assignedCourses)

        let completedCoursesData = courseData && courseData.results && courseData.results.filter(obj => obj.is_course_completed === true)
        setCompletedCourses(completedCoursesData)
        setLoading(false)
      }
      props.changeTabType()
      setTagIds([])
    }
  },[props.tabType,props.keyName])

  if(props.tabType === "courseLibrary" && props.keyName === "courses" && document.getElementsByClassName("all_tag").length !== 0 && !document.getElementsByClassName("all_tag")[0].classList.contains("green_btn")){
    setLoading(true)
    let elm = document.querySelectorAll(".separate_tag");
    setCourses([])
    for(let i=0; i<elm.length; i++){
      elm[i].classList.remove('green_btn');
    }
    document.querySelector(".all_tag").classList.add("green_btn")
    setCourseLoading(true)
    dispatch(getCourse());
    setTagIds([])
    props.changeTabType()
  }
  if(courses.length === 0 && loading && props.keyName === "courses" && !courseLoading){
    setTimeout(function(){
      setLoading(false)
    },500)
  }

  useEffect(() => {
    let assignedCourses = courseData && courseData.results && courseData.results.filter(obj => obj.is_course_compulsory === true)
    if(courseData){
      // setCourses(courseData.results)
      setCourses(assignedCourses)

      let completedCoursesData = courseData && courseData.results && courseData.results.filter(obj => obj.is_course_completed === true)
      setCompletedCourses(completedCoursesData)
      setLoading(false)
      setCourseLoading(false)
      setCoursesDataLength(3)
    }
    if(assignedCourses && assignedCourses.length >= 4 ){
      setCoursesDataState(true)
    }else{
      setCoursesDataState(false)
    }
    if(completedCourses.length >= 4){
      setCompleteDataState(true)
    }
    else{
      setCompleteDataState(false)
    }
  },[courseData])

  

  useEffect(() => {
    let assignedCourses = courseDataByTags && courseDataByTags.results && courseDataByTags.results.filter(obj => obj.is_course_compulsory === true)
    if(courseDataByTags && props.keyName === "courses"){
      setCourses(assignedCourses)
      // setCourses(courseDataByTags.results)
      setLoading(false)
      // if(courseDataByTags.results.count >= 4){
      if(assignedCourses && assignedCourses.length >= 4){
        setCoursesDataState(true)
      }
      else{
        setCoursesDataState(false)
      }
    }
    if(assignedCourses && assignedCourses.length >= 4){
      setCoursesDataState(true)
    }else{
      setCoursesDataState(false)
    }
  },[courseDataByTags])


  const getCourseData = (courseId) => {
    if(props.keyName === "courses"){
      setLoading(true)
      dispatch(removeLessonPracticeExamData());
      setTimeout(function(){
        dispatch(getCourseDetails(courseId));
      },200)
    }
  }

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  // console.log(courseDetailsData,'coursedetailsdata')

  useEffect(() => {
    let courseData = [];
    let courseArray = []
    if(courseDetailsData && userContext.frmUpdating && props.keyName === "courses"){
      // console.log(3)
      courseData.push(...courseDetailsData.lessons,...courseDetailsData.practices,...courseDetailsData.exams)
      if(courseData.length === 1){
        userContext.setPracticeExamSctnData([])
      }
      else{
        let nextSectionId = 0
        let nextSectionType = 0
        if(courseData[1]){
          nextSectionId = courseData[1].id
          nextSectionType = courseData[1].content_type_name
          courseArray.push({"id":nextSectionId,"type" :nextSectionType+"s","key":1})
          userContext.setPracticeExamSctnData(courseArray)
        }
      }



      if(courseDetailsData.lessons.length !== 0){
        userContext.setFrmUpdating(true)
        history.push("/student/course-details/lessons/"+courseDetailsData.lessons[0].id)
      }
      else if(courseDetailsData.practices.length !== 0){
        userContext.setFrmUpdating(true)
        history.push("/student/course-details/practices/"+courseDetailsData.practices[0].id)
      }
      else if(courseDetailsData.exams.length !== 0){
        userContext.setFrmUpdating(true)
        history.push("/student/course-details/exams/"+courseDetailsData.exams[0].id)
      }
      else{
        setLoading(false)
      }
    }
  },[courseDetailsData])

  //search functionality
  useEffect(() => {
    if(props.keyName === "courses"){
      if(userContext.courseFilterValue !== ""){
        let value = userContext.courseFilterValue.toLowerCase();
        let result = [];

        result = courseData && courseData.results && courseData.results.filter((data) => {
          return ((data.title.toLowerCase().search(value) != -1 || data.category.title.toLowerCase().search(value) != -1) && data.is_course_compulsory === true);
        });
        setCourses(result);
        let completedCoursesData = courseData && courseData.results && courseData.results.filter((data) => {
          return ((data.title.toLowerCase().search(value) != -1 || data.category.title.toLowerCase().search(value) != -1) && data.is_course_completed === true);
        });
        setCompletedCourses(completedCoursesData)
        if(!document.getElementsByClassName("all_tag")[0].classList.contains("green_btn")){
          let elm = document.querySelectorAll(".separate_tag");
          for(let i=0; i<elm.length; i++){
            elm[i].classList.remove('green_btn');
          }
          document.querySelector(".all_tag").classList.add("green_btn")
        }
      }else{
        if(document.getElementsByClassName("all_tag")[0].classList.contains("green_btn")){
          if(courseData && courseData.length !== 0){
            let assignedCourses = courseData && courseData.results && courseData.results.filter(obj => obj.is_course_compulsory === true)
            // setCourses(courseData.results)
            setCourses(assignedCourses)
            let completedCoursesData = courseData && courseData.results && courseData.results.filter(obj => obj.is_course_completed === true)
            setCompletedCourses(completedCoursesData)
          }
        }
        else{
          setLoading(true)
          setCourses([])
          setCourseLoading(true)
          dispatch(getCourse());
          setTagIds([])
          props.changeTabType()
        }
      }
    }
  },[userContext.courseFilterValue])

  useEffect(() => {
    if(completedCourses.length >= 4){
      setCompleteDataState(true)
    }
    else{
      setCompleteDataState(false)
    }
  },[completedCourses])

  useEffect(() => {
    if(courses.length >= 4){
      setCoursesDataState(true)
    }
    else{
      setCoursesDataState(false)
    }
  },[courses])


  return (
    <>
      <div className="my_courses view_last_btn">
        <h4 className="heading">My Progress</h4>
        <Row className="my_progress">
          <Col className="left_div">
            <h3>My Progress</h3>
          </Col>
          <Col className="right_div">
            <div className="course_status">
              <h4>{courseCountData ? courseCountData.completed : 0}</h4>
              <div>
                <p className="mb-0">Courses</p>
                <span>completed</span>
              </div>
            </div>
            <div className="course_status">
              {/* <h4>{courses.length - completedCourses.length}</h4> */}
              <h4>{courseCountData ? courseCountData.non_completed : 0}</h4>
              <div>
                <p className="mb-0">Courses</p>
                <span>Pending</span>
              </div>
            </div>
            <div className="course_status">
              <h4>{courseCountData ? courseCountData.completed_today : 0}</h4>
              <div>
                <p className="mb-0">Courses</p>
                <span>completed today</span>
              </div>
            </div>
          </Col>
        </Row>
        {/* <div className="learning_path">
          <h3>Learning Paths (2)</h3>

          <Slider {...settings}>
            <div className="progress_bar">
              <h5>Biology Part 1</h5>
              <div className="rows d-flex justify-content-between">
                <p className="green_clr">77%</p>
                <span>100%</span>
              </div>
              <ProgressBar now={60} className="green_clr" />
            </div>

            <div className="progress_bar">
              <h5>Biology Part 1</h5>
              <div className="rows d-flex justify-content-between">
                <p className="orange_clr">77%</p>
                <span>100%</span>
              </div>
              <ProgressBar className="orange_clr" now={60} />
            </div>

            <div className="progress_bar">
              <h5>Biology Part 1</h5>
              <div className="rows d-flex justify-content-between">
                <p className="red_clr">77%</p>
                <span>100%</span>
              </div>
              <ProgressBar now={60} className="red_clr" />
            </div>

            <div className="progress_bar">
              <h5>Biology Part 1</h5>
              <div className="rows d-flex justify-content-between">
                <p>77%</p>
                <span>100%</span>
              </div>
              <ProgressBar now={60} />
            </div>
          </Slider>
        </div> */}

        <div className="tag">
          {/* <Slider {...settings2}> */}
          <button className="btn green_btn all_tag" onClick={(e) => {tagChanges(e,'all','')}}>All Courses</button>
          {(contentTagData && contentTagData.results.map((tagsData,i) =>  {
              return (
                <button className="btn separate_tag" onClick={(e) => {tagChanges(e,'',tagsData.id)}}>{tagsData.title}</button>
              )
          }))}
          {/* </Slider> */}
          {/* <button onClick={()=>setDataLength(contentTagData.results.length)}>view all</button> */}
        </div>
        <div className="courses_details">
          <Slider {...settings3}>
            { courses && courses.map((courses,ivalue) => {
              if(getWidth <= 800){
                if(ivalue <= CoursesDataLength){
                  return(
                    <div className="progress_bar">
                      <Link  onClick={() => {getCourseData(courses.id);userContext.setFrmUpdating(true)}}>
                        <img
                          src={courses.thumbanil && courses.thumbanil.attachment_file ? courses.thumbanil.attachment_file : process.env.PUBLIC_URL + "/images/student.png"}
                          alt=""
                          className="img-fluid"
                        />
                      </Link>
                        <div className="content_box">
                          <h5>{courses.title}</h5>
                          <div className="rows d-flex justify-content-between">
                            <p className={courses.course_submission_percentage < 50 ? "red_clr" : (courses.course_submission_percentage >= 50 && courses.course_submission_percentage < 100) ? "orange_clr" : "green_clr"}>{courses.course_submission_percentage}%</p>
                            <span>{courses.course_submission_percentage}%</span>
                          </div>
                          <ProgressBar now={courses.course_submission_percentage} className={courses.course_submission_percentage < 50 ? "red_clr" : (courses.course_submission_percentage >= 50 && courses.course_submission_percentage < 100) ? "orange_clr" : "green_clr"} />
                        </div>
                        {courses.is_course_compulsory
                        ?
                          <div className="required">Required</div>
                        :
                          <></>
                        }
                    </div>
                  ) 
                }
              }else{
                return(
                  <div className="progress_bar">
                    <Link  onClick={() => {getCourseData(courses.id);userContext.setFrmUpdating(true)}}>
                      <img
                        src={courses.thumbanil && courses.thumbanil.attachment_file ? courses.thumbanil.attachment_file : process.env.PUBLIC_URL + "/images/student.png"}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                      <div className="content_box">
                        <h5>{courses.title}</h5>
                        <div className="rows d-flex justify-content-between">
                          <p className={courses.course_submission_percentage < 50 ? "red_clr" : (courses.course_submission_percentage >= 50 && courses.course_submission_percentage < 100) ? "orange_clr" : "green_clr"}>{courses.course_submission_percentage}%</p>
                          <span>{courses.course_submission_percentage}%</span>
                        </div>
                        <ProgressBar now={courses.course_submission_percentage} className={courses.course_submission_percentage < 50 ? "red_clr" : (courses.course_submission_percentage >= 50 && courses.course_submission_percentage < 100) ? "orange_clr" : "green_clr"} />
                      </div>
                      {courses.is_course_compulsory
                      ?
                        <div className="required">Required</div>
                      :
                        <></>
                      }
                  </div>
                )
              }
             })
            }
          </Slider>
          {courses && courses.length > 4 ?
          courses && courses.length === CoursesDataLength ?
          <button className="btn view_btn" onClick={() => {(setCoursesDataLength(3))}}>
            Less
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.51953 11L6.48078 6L1.51953 1"
                  stroke="#00643B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button> 
          : 
          <button className="btn view_btn" onClick={() => {(setCoursesDataLength(courses.length))}}>
            View all
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.51953 11L6.48078 6L1.51953 1"
                  stroke="#00643B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button> 
          : <></>
        }
        </div>

        <div className="completed_courses_details">
          <h3>Completed Courses ({courseCountData ? courseCountData.completed : 0})</h3>
          <Slider {...settings2}>
            {completedCourses && completedCourses.map((completedCourseData,IValue) => {
              if(getWidth <= 800){
                if(IValue <= CompleteDataLength){
                return(
                  <div className="progress_bar">
                    <Link  onClick={() => {getCourseData(completedCourseData.id);userContext.setFrmUpdating(true)}}>
                      <img
                        src={completedCourseData.thumbanil && completedCourseData.thumbanil.attachment_file ? completedCourseData.thumbanil.attachment_file : process.env.PUBLIC_URL + "/images/student.png"}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                      <div className="content_box">
                        <h5>{completedCourseData.title}</h5>
                        <div className="rows d-flex justify-content-between">
                          <p className="green_clr">{completedCourseData.course_submission_percentage}%</p>
                          <span>{completedCourseData.course_submission_percentage}%</span>
                        </div>
                        <ProgressBar now={completedCourseData.course_submission_percentage} className="green_clr" />
                      </div>
                      {completedCourseData.is_course_compulsory
                      ?
                        <div className="required">Required</div>
                      :
                        <></>
                      }
                  </div>
                )
              }
              }else{
                return(
                  <div className="progress_bar">
                    <Link  onClick={() => {getCourseData(completedCourseData.id);userContext.setFrmUpdating(true)}}>
                      <img
                        src={completedCourseData.thumbanil && completedCourseData.thumbanil.attachment_file ? completedCourseData.thumbanil.attachment_file : process.env.PUBLIC_URL + "/images/student.png"}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                      <div className="content_box">
                        <h5>{completedCourseData.title}</h5>
                        <div className="rows d-flex justify-content-between">
                          <p className="green_clr">{completedCourseData.course_submission_percentage}%</p>
                          <span>{completedCourseData.course_submission_percentage}%</span>
                        </div>
                        <ProgressBar now={completedCourseData.course_submission_percentage} className="green_clr" />
                      </div>
                      {completedCourseData.is_course_compulsory
                      ?
                        <div className="required">Required</div>
                      :
                        <></>
                      }
                  </div>
                  )
              }
            })}
          </Slider>
          {completedCourses.length > 4 ?
          completedCourses.length === CompleteDataLength ?
          <button className="btn view_btn" onClick={() => (setCompleteDataLength(3))}>
            Less
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.51953 11L6.48078 6L1.51953 1"
                  stroke="#00643B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          : 
          <button className="btn view_btn" onClick={() => (setCompleteDataLength(completedCourses.length))}>
            View all
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.51953 11L6.48078 6L1.51953 1"
                  stroke="#00643B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
           : <></>} 
        </div>
      </div>
      <div className={loading || courseLoading ? "loader_div position-fixed" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={loading || courseLoading}
          css={override}
          size={50}
        />
      </div>
    </>
  );
};

export default MyCourses;
