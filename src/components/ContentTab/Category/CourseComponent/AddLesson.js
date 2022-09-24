import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeErrorData} from "../../../../actions/RemoveError";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactTags from 'react-tag-autocomplete'
import { toast } from 'react-toastify';
import {getTags, addAttachment, addContentTag, addLesson, deleteAttachment} from "../../../../actions/Content";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { extensionMapping } from "../../../../Constants";


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

//validation
const validationSchema = yup.object({
  title: yup.string().required("Cannot be blank"),
  // file: yup.string().required("Select Content"),
});



const AddLesson = (props) => {
  let dispatch = useDispatch();
  const reactTags = useRef();
  const formRef = useRef();

  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [loading,setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [suggestions,setSuggestions] = useState([]);
  const [contentId,setContentId] = useState([]);
  const [contentError,setContentError] = useState("")
  const [content,setContent] = useState("");
  const [contentType,setContentType] = useState("");
  const [updateDelete,setDelete] = useState(true);
  const [LessonUploadImage,setLessonUploadImage] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const { error } = useSelector((state) => state);


  var segmentCount = (window.location.href.split('/').length - 1) - (window.location.href[window.location.href.length - 1] == '/' ? 1 : 0);

  useEffect(() => {
    if(window.location.href.includes('contents') && segmentCount === 2){
      dispatch(getTags())
    }
  },[]);

  useEffect(() => {
    if(props.type === "createlesson" && props.changeType == "addLesson" && props.key === "lesson"){
      setTags([]);
      setContentId([]);
      formRef.current.values.title = "";
      setContentError("");
      setLoading(false);
      setBtnClickFlag(false);
      props.typeFunction("");
    }
  })

  //image upload code and validation
  const imageUpload = (e) => {
    var file = e.target.files[0];
    let extension = e.target.files[0].name.split(".")
    // if(extension[1] === "doc" || extension[1] === "DOC"){
    //   file = new File([e.target.files[0]], extension[0]+".docx");
    // }
    if(extension[1] === "xls" || extension[1] === "XLS"){
      file = new File([e.target.files[0]], extension[0]+".xlsx");
    }
    var reader = new FileReader(); // CREATE AN NEW INSTANCE.
    if(file && file.size/1000000 < 50){//1000000 Bytes =  1 MB
      reader.onload = function (e) {
        setDelete(true);
        setLoading(true);
        setContentError("");
        setLessonUploadImage(true)
        // if(file.type.includes('image')){
        //   type = "image"
        // }
        // else if(file.type.includes('video')){
        //   type = "video"
        // }
        // else if(file.type.includes('audio')){
        //   type = "audio"
        // }
        // else if(file.type.includes('csv') || file.type.includes('application')){
        //   type = "text"
        // }
        let extension = file.name.split(".")
        let type = '';
        if(extensionMapping(extension[1]) === "image"){
          type = "image"
        } else if (extensionMapping(extension[1]) === "video"){
          type = "video"
        } else if (extensionMapping(extension[1]) === "audio"){
          type = "audio"
        } else if (extensionMapping(extension[1]) === "doc"){
          type = "doc"
        } else if (extensionMapping(extension[1]) === "excel"){
          type = "excel"
        } else if (extensionMapping(extension[1]) === "pdf"){
          type = "pdf"
        } else if (extensionMapping(extension[1]) === "ppt"){
          type = "ppt"
        } 
        
        setContentType(type);
        if(type !== ""){
          setContentError("")
          let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
          let formData = new FormData();
          formData.append('attachment_file', file,file.name);
          formData.append('owner', user_data.profile_id);
          dispatch(addAttachment(formData));
        }else{
          setContentError('Not Valid Extension')
          setLoading(false);
        }
        // var img = new Image();      
        // img.src = e.target.result;

        // img.onload = function () {
            
        // }
      };
      reader.readAsDataURL(file);
    }
    else{
      setContentError('file size exceeded')
    }
  }

  const attachmentData = useSelector((state) => state.contentData.saveAttachments);

  useEffect(() => {
    let contentData = []
    if(attachmentData && loading){
      setLoading(false)
      setDelete(true);
      contentData.push(attachmentData.id)
      setContentId(contentData)
    }
  },[attachmentData]);

  const contentTagData = useSelector((state) => state.contentData.getContentTags);

  useEffect(()=>{
    let tagArray = [];
    if(contentTagData){
      contentTagData.results.map(function(value,key){
        tagArray.push({'id':value['id'],'name':value['title']})
      })
      setSuggestions(tagArray)
    }
  },[contentTagData])

  const handleDelete = (index) => {
    const newTags = tags.slice(0);
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    const newTags = [].concat(tags, tag);
    setTags(newTags);
    if(tag['id'] === undefined){
      let data = {
        title : tag.name
      }
      setLoading(true)
      dispatch(addContentTag(data))
    }
  };

  const addedTagsData = useSelector((state) => state.contentData.addContentTag);

  useEffect(()=>{
    setLoading(false)
    dispatch(getTags())
  },[addedTagsData])

  const handleInput = (tag) => {
    // if(tag.length >= 1){
    //   dispatch(getTags())
    // }
  }

  //lesson submit
  const submitData = (values) => {
    setLoading(true);
    setBtnClickFlag(true);
    dispatch(removeErrorData());
    let tagIds = [];
    suggestions.map((value)=>{
      tags.map((tagValue) => {
        if(tagValue.name === value.name){
          tagIds.push(value.id);
        }
      })
    })

    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    let url = window.location.href.split("/")
    let courseId = url[url.length-1];
    let data = {
      title : values.title,
      content : contentId,
      tags : tagIds,
      course : courseId,
      creator : user_data.profile_id
    }
    if(data.content.length === 0){
      setContentError("Select Content")
      setLoading(false);
    }else{
      dispatch(addLesson(data));
    }
  }

  const lessonDataRes = useSelector((state) => state.contentData.saveLessonData);
  //lesson data response
  useEffect(() => {
    if(lessonDataRes.id && btnClickFlag && error.errorsData === ""){
      setTags([]);
      setContentId([]);
      formRef.current.values.title = "";
      setContentError("");
      setLoading(false);
      setBtnClickFlag(false);
      toast.success('Lesson Added');
      props.callBack();
    }
  },[lessonDataRes])

  const getdeleteAttachments = useSelector((state) => state.contentData.getdeleteAttachments);

  useEffect(() => {
    if(getdeleteAttachments && LessonUploadImage){
      const getfilename = document.getElementsByClassName("upload_input")[0].value = ""
      setDelete(false)
      setLessonUploadImage(false)
    }
  }, [getdeleteAttachments])  

  const handleRemoveImage = () => {
    dispatch(deleteAttachment(contentId[0]))
  }

  return (
    <>
      <Formik
        initialValues={{ title: ""}}
        validationSchema={validationSchema}
        onSubmit={submitData}
        innerRef={formRef}
      >
        {({ values, handleChange }) => {
          return(
            <Form>
              <div className="add_lesson">
                <div className="modal-form-cta ">
                  <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                  <button type="button" className="btn-secondary-yazmi">Cancel</button>
                </div>
                <div className="form-group">
                  <label htmlFor="" className="label-yazmi">
                    Add Lesson Name
                  </label>
                  <Field
                    type="text"
                    className="input-yazmi"
                    name="title"
                  />
                  {(!error.errorsData)
                  ?
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger error_msg"
                    />
                  :
                    <span className="text-danger error_msg">
                      {error.errorsData && error.errorsData.title
                        ? error.errorsData.title
                        : ""}
                    </span>
                  }
                </div>
                <div className="upload_image d-flex mt-3">
                
                  
                <div className="uf-single w-auto mb-1 d-inline-block">
                  <div className="uf-field upload_file upload_yazmi add_lesson_upload">
                    <input type="file" name="file" className="upload_input"  onChange={imageUpload}/>
                    <button type="button" className={loading ? "btn-primary-yazmi button_disable": "btn-grey display-block upload_btn"} disabled={loading ? true : false}>
                      Upload Content
                    </button>
                    </div>
                    {(!error.errorsData)
                      ?
                        <ErrorMessage
                          name="file"
                          component="div"
                          className="text-danger error_msg"
                        />
                      :
                        <span className="text-danger error_msg">
                          {error.errorsData && error.errorsData.file
                            ? error.errorsData.file
                            : ""}
                        </span>
                      }
                  </div>
                  {
                    attachmentData.filename && LessonUploadImage && contentError === ""  ?
                  
                  <div className="uploaded_button">
                    
                    <div className="uploaded_icon  align-items-center">
                    {
                      contentId && contentId.length !== 0
                      ?
                        (contentType === "image")
                        ?
                        <>
                          <span className="d-flex align-items-center">
                          <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/image-svgrepo-com.svg'} alt="" />
                          </span>
                          <p>{attachmentData && attachmentData.filename} </p>
                        </>
                        :
                          (contentType === "video")
                          ?
                          <>
                                <span className="d-flex align-items-center"> 
                                  <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/videoplaysvg.svg'} alt="" />
                                </span>
                                <p>{attachmentData && attachmentData.filename} </p>
                              </>
                            
                          :
                            (contentType === "audio")
                            ?
                                <>
                                  <span className="d-flex align-items-center">
                                    <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/mp3svg.svg'} alt="" />
                                  </span>
                                  <p>{attachmentData && attachmentData.filename} </p>
                                </>
                            : (contentType === "doc") ?
                                <>
                                  <span className="d-flex align-items-center">
                                    <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/icons8-microsoft-word.svg'} alt="" />
                                  </span>
                                  <p>{attachmentData && attachmentData.filename} </p>
                                </>
                            : (contentType === "excel") ?
                                <>
                                  <span className="d-flex align-items-center">
                                  <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/microsoft-excel-2013-logo-svgrepo-com.svg'} alt="" />
                                  </span>
                                  <p>{attachmentData && attachmentData.filename} </p>
                                </> 
                            : (contentType === "pdf") ?
                                <>
                                  <span >
                                    <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/pdfsvg.svg'} alt="" />
                                  </span>
                                  <p>{attachmentData && attachmentData.filename} </p>
                                </> 
                            : (contentType === "ppt") ?
                                <>
                                  <span className="d-flex align-items-center">
                                    <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/pptsvg.svg'} alt="" />
                                  </span>
                                  <p>{attachmentData && attachmentData.filename} </p>
                                </> 
                              :
                              <></>
                      :
                          <></>
                    }
                    </div>
                    <span className="cross_icon" onClick={handleRemoveImage}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="#666666"/>
                      </svg>
                    </span>
                  </div>
                  : 
                  <></>
                  }
                </div>
                     <span className="text-danger error_msg">
                      {contentError ? contentError : ""}
                    </span>
                
                <div className="form-group">
                  <label htmlFor="" className="label-yazmi">
                    Add Tags using Comma
                  </label>
                  <div className="uf-field react__tag_div">
                    {/* <input type="text" className="input-yazmi" /> */}
                    <ReactTags
                      ref={reactTags}
                      tags={tags}
                      suggestions={suggestions}
                      allowNew
                      onDelete={handleDelete}
                      onAddition={handleAddition}
                      onInput={handleInput}
                      placeholderText="Enter your tag"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>

      {/* <div className="add_lesson">
        <div className="modal-form-cta ">
          <button className="btn-primary-yazmi">Save</button>
          <button className="btn-secondary-yazmi">Cancel</button>
        </div>
        <div className="form-group">
          <label htmlFor="" className="label-yazmi">
            Add Lesson Name
          </label>
          <input
            type="text"
            className="form-control input-yazmi"
            placeholder="Introduction to plants"
            name="username"
          />
        </div>
        <div className="uf-single">
          <div className="uf-field upload_file">
            <input type="file" className="upload_input" />
            <button className="btn-grey display-block upload_btn">
              Upload Content
            </button>
            <button className="btn-grey display-block upload_file_name">
              <span className="video_icon">
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2C16 0.897 15.103 0 14 0L2 0C0.897 0 0 0.897 0 2L0 12C0 13.103 0.897 14 2 14L14 14C15.103 14 16 13.103 16 12V8.667L20 12L20 2L16 5.333V2Z"
                    fill="#666666"
                  />
                </svg>
              </span>
              video.mpg
              <span className="cross_icon">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
                    fill="#666666"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="" className="label-yazmi">
            Add Tags using Comma
          </label>
          <textarea type="text" className="form-control input-yazmi" placeholder="Plants, introduction, video about plants" rows="4" />
        </div>
      </div> */}
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

export default AddLesson;
