import React, { useState,useEffect,useContext } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import SubHeader from "../../Layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import {getLessonPracticeExamData} from "../../../actions/Content";
import {lessonSubmission} from "../../../actions/Learning";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {UserContext} from "../../../UserContext";
import {extensionMapping} from "../../../Constants";
import { DocumentViewer } from 'react-documents';
// Core viewer
// import { Document, Page, pdfjs } from 'react-pdf';
// import {PDFViewer, pdfjs} from 'pdf-viewer-reactjs'
// import { Viewer } from '@react-pdf-viewer/core';
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// import PDFViewer from 'pdf-viewer-reactjs'
// import { Viewer } from '@react-pdf-viewer/core';

// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
 
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import FileViewer from 'react-file-viewer';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const Course = () => {
  let dispatch = useDispatch();
  const userContext = useContext(UserContext)
  const [check1, setCheck] = useState(false);
  const [count, setCount] = useState(0);
  let [color, setColor] = useState("#ffffff");
  const [flag,setFlag] = useState(false)
  const [loading,setLoading] = useState(false)
  const [contentType,setContentType] = useState("")

  const [attempt, setAttempt] = useState("70");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [RouteFlag, setRouteFlag] = useState(false);
  const [DocUrl, setDocUrl] = useState("");


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const setUserCount = (length) => {
    setCount(length);
  };

  let location = useLocation();
  let history = useHistory();

  const handlePush = () => {
    userContext.setFrmUpdating(false)
    setRouteFlag(true)
    history.push("/student");
  };


  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);
  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);
  useEffect(() => {
    if(window.location.href.includes("student") && window.location.href.includes("course-details")){
      setContentType("")
      let url = window.location.href.split("/")
      let id = url.pop();
      let type = url[url.length-1]
      if(id !== "student" && id !== "course-details" && (type === "lessons" || type === "practices" || type === "exams")){
        dispatch(getLessonPracticeExamData(courseDetailsData.id,id,type))
      }
    }
  },[])

  if(userContext.formLdng && !loading && (location.pathname.includes("/student/course-details/lessons") || location.pathname.includes("/student/course-details/practices") || location.pathname.includes("/student/course-details/exams"))){
    setContentType("")
    setLoading(true)
    userContext.setFrmLdng(false)
    setDocUrl("")
  }

  const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);
  

  useEffect(() => {
    if(getLessonPracticeExamDataRes.id){
      if(location.pathname.includes("/student/course-details/lessons")){
        if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "video"){
          setContentType("video")
        }
        else if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "pdf"){
          setContentType("pdf")
          setTimeout(function(){
            callLessPracticeExamSubmission()
          },2500)
        }
        else if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "ppt"){
          setContentType("ppt")
          setTimeout(function(){
            callLessPracticeExamSubmission()
          },2500)
        }
        else if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "excel"){
          setContentType("excel") 
          setTimeout(function(){
            callLessPracticeExamSubmission()
          },2500)
        }
        else if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "doc"){
          setContentType("doc")
          setDocUrl(getLessonPracticeExamDataRes.content[0].attachment_file)
          setTimeout(function(){
            callLessPracticeExamSubmission()
          },2500)
        }
        else if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "audio"){
          setContentType("audio")
        }
        else if(extensionMapping(getLessonPracticeExamDataRes.filetype) === "image"){
          setContentType("image")
        }
      }
      else{
        setContentType("")
        if(location.pathname.includes("/student/course-details/practices") || location.pathname.includes("/student/course-details/exams")){
          userContext.setPracticeExamQtnsCnt(0)
          userContext.setPracticeExamAns([])
          // userContext.setPracticeExamWrongAnsCnt(0)
          userContext.setWrongPracticeExamQtnIds([])
        }
      }
      setLoading(false)
    }
  },[getLessonPracticeExamDataRes])

  //video end code
  const videoEndCall = () => {
    if(document.getElementById('video') !== null){
      document.getElementById('video').addEventListener('ended', function(e) {
        if(!flag){
          callLessPracticeExamSubmission()
        }
      });
    }
  }

  //audio end code
  const audioEndCall = () => {
    if(document.getElementById('audio') !== null){
      document.getElementById('audio').addEventListener('ended', function(e) {
        if(!flag){
          callLessPracticeExamSubmission()
        }
      });
    }
  }

  const callLessPracticeExamSubmission = () => {
    if(!getLessonPracticeExamDataRes.is_submission){
      let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
      setFlag(true)
      let data = {
        "lesson" : getLessonPracticeExamDataRes.id,
        "watched_by" : user_data.profile_id
      }
      dispatch(lessonSubmission(data,courseDetailsData.id,'lessons',getLessonPracticeExamDataRes.id))
    }
  }

  const submissionRes = useSelector((state) => state.learningData.lessonSubmissionData);

  useEffect(() => {
    if(submissionRes.id){
      setFlag(false)
    }
  },[submissionRes])

  let getWidth = window.innerWidth;

  return (
    <>
      <main className="main_section order-lg-last order-first">
        <div className="all_user">
          {location.pathname === "/student/viewexam" ||
          location.pathname.includes("/student/course-details") ||
          location.pathname.includes("/student/course-details/practices") ||
          location.pathname === "/student/pratice" ||
          getWidth <= 800 ? (
            <button className="btn back_btn" onClick={handlePush}>
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
          ) : (
            <></>
          )}
          <SubHeader
            checkedAll={check1}
            name={getLessonPracticeExamDataRes.title}
            count=""
            countname={
              location.pathname.includes("/student/course-details/practices")
                ? "Practice quiz"
                :
                location.pathname.includes("/student/course-details/exams")
                ?
                  "Exams"
                : "Lesson"
            }
            addName="User"
          />

          {/* {location.pathname === "/student/pratice/starttest" ? ( */}
          <div className="data_table video_table">
            {location.pathname.includes("/student/course-details/practices") ? (
              <div className="start_test">
                <img
                  src={process.env.PUBLIC_URL + "/images/testlogo.png"}
                  alt=""
                />
                <h3>Ready for a practice quiz ?</h3>
                <p>Refresh your knowledge on what you just learned.</p>
                <Link
                  className="btn btn-primary-yazmi"
                  to={"/student/course-details/practices/"+getLessonPracticeExamDataRes.id+"/start-test"}
                >
                  Start Test
                </Link>
              </div>
            ) : location.pathname.includes("/student/course-details/exams") ? (
              getLessonPracticeExamDataRes.allowed_attempts -  getLessonPracticeExamDataRes.submissions_count <= 0 ? (
                <>
                  <div className="start_test no_attempt">
                    <img
                      src={process.env.PUBLIC_URL + "/images/noattempt.png"}
                      alt=""
                    />
                    <h3 className="px-2">No Attempts Left</h3>
                    <p className="px-2">
                      You have already used the maximum number of attempts for
                      this exam
                    </p>
                  </div>
                </>
              ) : (
                <div className="start_test view_exam">
                  <img
                    src={process.env.PUBLIC_URL + "/images/startexam.png"}
                    alt=""
                  />
                  <h3>Ready to take the exam?</h3>
                  <p>{getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? getLessonPracticeExamDataRes.items.length : 0} questions</p>
                  <ul>
                    <li>This exam will test your overall knowledge</li>
                    <li>
                      You need to score more than <strong>[{getLessonPracticeExamDataRes ? getLessonPracticeExamDataRes.passing_percentage : 0}]</strong>% or
                      above to successfully complete this course
                    </li>
                    <li>
                      You have <strong>{getLessonPracticeExamDataRes ? (getLessonPracticeExamDataRes.allowed_attempts -  getLessonPracticeExamDataRes.submissions_count) : 0}</strong> attempts to complete this
                      course
                    </li>
                  </ul>
                  <p className="para">
                    By clicking on “Start Exam” you agree to not cheat during
                    this exam. You will be audited during the exam
                  </p>
                  <Link
                    className="btn btn-primary-yazmi"
                    to={"/student/course-details/exams/"+getLessonPracticeExamDataRes.id+"/start-test"}
                  >
                    Start Exam
                  </Link>
                </div>
              )
            ) : (
                // (contentType === "pdf" || contentType === "ppt" || contentType === "doc" || contentType === "excel")
                (contentType === "pdf")
                  ?
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                        <div style={{ maxHeight: '100%',overflow: 'auto' }} id="pdf">
                            <Viewer fileUrl={getLessonPracticeExamDataRes.content[0] && getLessonPracticeExamDataRes.content[0].attachment_file}/>
                        </div>
                      </Worker>
                    // <></>
                  :
                    (contentType === "excel" )
                    ?
                      <FileViewer
                        fileType={getLessonPracticeExamDataRes.filetype}
                        filePath={getLessonPracticeExamDataRes.content[0] && getLessonPracticeExamDataRes.content[0].attachment_file}
                        // errorComponent={CustomErrorComponent}
                        // onError={this.onError}
                      />
                      
                      // <></>
                    :
                      // 403 error coming in docviewer
                      (contentType === "doc")
                      ?
                        // <DocViewer 
                        //   // pluginRenderers={DocViewerRenderers}
                        //   documents={[{ uri:getLessonPracticeExamDataRes.content[0].attachment_file}]} 
                        // />
                        <DocumentViewer
                          queryParams="hl=Nl"
                          url={DocUrl}
                          // viewerUrl={selectedViewer.viewerUrl}
                          // viewer={selectedViewer.name}
                          viewerUrl={'https://docs.google.com/gview?url=%URL%&embedded=true'}
                          viewer="url"
                          // overrideLocalhost={getLessonPracticeExamDataRes.content[0].attachment_file}
                          >
                        </DocumentViewer>
                      :
                        (contentType === "ppt")
                        ?
                          <>
                            {/* <iframe
                              src={`https://view.officeapps.live.com/op/embed.aspx?src=${getLessonPracticeExamDataRes.content[0].attachment_file}`}
                              width="100%"
                              height="600px"
                              frameBorder="0"
                              title="slides"
                            ></iframe> */}
                          </>
                        :
                            
                          (contentType === "video")
                          ?
                            <video controls id="video" onLoadStart={videoEndCall}>
                              <source
                                src={getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.content && getLessonPracticeExamDataRes.content[0] ? getLessonPracticeExamDataRes.content[0].attachment_file : ""}
                                type="video/mp4"
                              />
                            </video>
                          :
                          (contentType === "audio")
                          ?
                            <audio controls id="audio" onLoadStart={audioEndCall}>
                              <source
                                src={getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.content && getLessonPracticeExamDataRes.content[0] ? getLessonPracticeExamDataRes.content[0].attachment_file : ""}
                                type="audio/mp3"
                              />
                            </audio>
                          :
                            (contentType === "image")
                            ?
                              <img src={getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.content && getLessonPracticeExamDataRes.content[0] ? getLessonPracticeExamDataRes.content[0].attachment_file : ""} onLoad={callLessPracticeExamSubmission}/>
                            :
                              <></>
            )}
            <SubHeader
              classpass="responsive_header"
              checkedAll={check1}
              name={getLessonPracticeExamDataRes.title}
              count=""
              countname={
                location.pathname.includes("/student/course-details/practices")
                ? "Practice quiz"
                :
                location.pathname.includes("/student/course-details/exams")
                ?
                  "Exams"
                : "Lesson"
              }
              addName="User"
            />
          </div>
        </div>
      </main>
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

export default Course;
