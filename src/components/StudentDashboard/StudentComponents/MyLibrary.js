import React,{useState,useEffect,useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {UserContext} from "../../../UserContext";
import {courseFilterByTags,getCourse,getCourseDetails,removeLessonPracticeExamData} from "../../../actions/Content";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const MyLibrary = (props) => {
  const userContext = useContext(UserContext);
  const dispatch = useDispatch();
  let history = useHistory()

  const [loading,setLoading] = useState(false)
  const [libraryTagIds,setLibraryTagIds] = useState([])
  const [publishedCourses,setPublishedCourses] = useState([])
  const [publishCourseLoading,setPublishCourseLoading] = useState(false)
  const [categories,setCategory] = useState([])
  const [PublishedLength,setPublishedLength] = useState(3)
  const [PublishedData,setPublishedData] = useState(false)
  const [coursesLength,setCoursesLength] = useState(0)
  const [AllTitle,setAllTitle] = useState([])
  let [color, setColor] = useState("#ffffff");
  const [type,setType] = useState("all")
  // let [ViewLength, setViewLength] = useState([]);

  
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: false,
  // };

  // 
  const settings2 = {
    dots: true,
    infinite: false,
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
    infinite: true,
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const categoryData = useSelector((state) => state.contentData.getCategoryData);

  const  libraryTagChanges = (e,tagType,tagId) => {
    setLoading(true)
    let id = []
    userContext.setCourseFilterValue("")
    if(tagType === "all"){
      setType("all")
      setPublishedData(true)
      let elm = document.querySelectorAll(".separate_library_tag");
      setPublishedCourses([])
      for(let i=0; i<elm.length; i++){
        elm[i].classList.remove('green_btn');
      }
    }
    else{
      setType("")
      props.changeTabType()
      setPublishedData(false)
      document.getElementsByClassName("all_library_tag")[0].classList.remove("green_btn")
    }

    //check if id is already in array or not
    if(e.target.classList.contains("green_btn")){
      //if id is already in array
      e.target.classList.remove("green_btn")
      if(tagType === "all"){
        setLibraryTagIds([])
      }
      else{
        id.push(...libraryTagIds)
        const index = id.indexOf(tagId);
        if (index > -1) {
          id.splice(index, 1);
        }
        setLibraryTagIds(id)
      }
    }
    else{
      e.target.classList.add("green_btn")
      if(tagType === "all"){
        setPublishCourseLoading(true)
        dispatch(getCourse());
        setLibraryTagIds([])
      }
      else{
        if(libraryTagIds.length === 0){
          id.push(tagId)
        }
        else{
          id.push(...libraryTagIds,tagId)
        }
        setLibraryTagIds(id)
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
      setPublishedCourses([])
    }
  }
  if(props.tabType === "courseLibrary" && props.keyName === "library" && !document.getElementsByClassName("all_library_tag")[0].classList.contains("green_btn")){
    
    let elm = document.querySelectorAll(".separate_library_tag");
    setPublishedCourses([])
    for(let i=0; i<elm.length; i++){
      elm[i].classList.remove('green_btn');
    }
    document.querySelector(".all_library_tag").classList.add("green_btn")
    setPublishCourseLoading(true)
    setLoading(true)
    dispatch(getCourse());
    setLibraryTagIds([])
    props.changeTabType()
  }

  const courseData = useSelector((state) => state.contentData.getCourses);

  const courseDataByTags = useSelector((state) => state.contentData.courseDataByTags);

  useEffect(() => {
    if(props.tabType === "courseLibrary" && props.keyName === "library"){
      setLoading(true)
      props.changeTabType()
      setLibraryTagIds([])
      if(courseData && courseData.length !== 0){
        returnCategoryData(courseData.results)
      }
    }
  },[props.tabType,props.keyName])

  useEffect(() => {
    if(courseData){
      returnCategoryData(courseData.results)
      setPublishCourseLoading(false)
      setLoading(false)
      // if(publishedCoursesData.length > 4){
      //   setPublishedData(true)
      // }
    }

  },[courseData])

  useEffect(() => {
    if(courseDataByTags && props.keyName === "library"){
      returnCategoryData(courseDataByTags.results)
      setPublishCourseLoading(false)
      setLoading(false)
    }
  },[courseDataByTags])

  if(publishedCourses.length === 0 && loading && props.keyName === "library" && !publishCourseLoading){
    setTimeout(function(){
      setLoading(false)
    },500)
  }


  const getCourseData = (courseId) => {
    if(props.keyName === "library"){
      setLoading(true)
      dispatch(removeLessonPracticeExamData());
      setTimeout(function(){
        dispatch(getCourseDetails(courseId));
      },200)
    }
  }

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  useEffect(() => {
    let courseData = [];
    let courseArray = []
    
    if(courseDetailsData && userContext.frmUpdating && props.keyName === "library"){
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
    if(props.keyName === "library"){
      if(userContext.courseFilterValue !== ""){
        let value = userContext.courseFilterValue.toLowerCase();
        let result = [];

        result = courseData && courseData.results && courseData.results.filter((data) => {
          return data.title.toLowerCase().search(value) != -1 || data.category.title.toLowerCase().search(value) != -1;
        });

        returnCategoryData(result)

        if(!document.getElementsByClassName("all_library_tag")[0].classList.contains("green_btn")){
          let elm = document.querySelectorAll(".separate_library_tag");
          for(let i=0; i<elm.length; i++){
            elm[i].classList.remove('green_btn');
          }
          document.querySelector(".all_library_tag").classList.add("green_btn")
        }
      }else{
        if(document.getElementsByClassName("all_library_tag")[0].classList.contains("green_btn")){
          if(courseData && courseData.length !== 0){
            returnCategoryData(courseData.results)
          }
        }
        else{
          setLoading(true)
          setPublishedCourses([])
          setPublishCourseLoading(true)
          dispatch(getCourse());
          setLibraryTagIds([])
          props.changeTabType()
        }
      }
    }
  },[userContext.courseFilterValue])

  const returnCategoryData = (data) => {
    let categoryTitle = []
    let categoryDatas = []
    const publishedCoursesData = data.filter(obj => obj.is_published === true)
    setPublishedCourses(publishedCoursesData)
    publishedCoursesData.map((obj) => {
      if(categoryTitle.length === 0){
        categoryTitle.push(obj.category.title)
        categoryDatas.push({"id" :obj.category.id,"title":obj.category.title})
      }
      else{
        let index = categoryTitle.indexOf(obj.category.title)
        if(index > -1){

        }
        else{
          categoryTitle.push(obj.category.title)
          categoryDatas.push({"id" :obj.category.id,"title":obj.category.title})
        }
      }
    })

    

    setCategory(categoryDatas)
    setPublishCourseLoading(false)
    setLoading(false)
    setAllTitle(categoryTitle)

    let courseLength = []
    let keyObject = []
    if(categoryData && categoryData.length !== 0){
      categoryTitle.map((obj1)=>{
        categoryData.results.map((obj,key) => {
          const objdata = obj.courses.filter((data) => data.is_published === true)
          if(obj1 === obj.title){
            courseLength.push(objdata.length)
          }
        })
      })
    }
    setCoursesLength(courseLength)
  }

  return (
    <>
      <div className="my_courses">
        <div className="tag">
          {/* <Slider {...settings2}> */}
          <button className="btn green_btn all_library_tag" onClick={(e) => {libraryTagChanges(e,'all','')}}>All Courses</button>
          {(categoryData && categoryData.results.map((tagsData,i) =>  {
                return (
                  <button className="btn separate_library_tag" onClick={(e) => {libraryTagChanges(e,'',tagsData.id)}}>{tagsData.title}</button>
                )
            }))}
          {/* </Slider> */}
        </div>
        {categories && categories.map((catData,key) => {
          return( 

            <div className="courses_details">
              <h3>{(type === "all" || libraryTagIds.includes(catData.id)) ? catData.title : ""}</h3>
              {(coursesLength[key] >= 4)
              ?
                <Slider {...settings3}>
                  {publishedCourses && publishedCourses.filter((coursess => coursess.category.id === catData.id)).map((courses,iiiii) => {
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
                  )
                  }
                </Slider>
              :
                <Slider {...settings2}>
                {publishedCourses && publishedCourses.filter((coursess => coursess.category.id === catData.id)).map((courses,iiiii) => {
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
                )
                }
              </Slider>
            }
            </div>
          )
        })}
      </div>
      <div className={loading || publishCourseLoading ? "loader_div position-fixed" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={loading || publishCourseLoading}
          css={override}
          size={50}
        />
      </div>
    </>
  );
};

export default MyLibrary;
