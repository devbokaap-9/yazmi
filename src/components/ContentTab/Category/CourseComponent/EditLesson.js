import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeErrorData} from "../../../../actions/RemoveError";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactTags from 'react-tag-autocomplete'
import { toast } from 'react-toastify';
import {getTags, addAttachment, addContentTag, editLessonPracticeExam, deleteAttachment} from "../../../../actions/Content";
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
});

const EditLesson = (props) => {
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
    const [EditLessonUploadImage,setEditLessonUploadImage] = useState(false);
    const [RemoveName,setRemoveName] = useState(false);
    const [AllContent,setAllContent] = useState([]);
    const [DefaultRemoveName,setDefaultRemoveName] = useState(true);
    let [color, setColor] = useState("#ffffff");
  
    const { error } = useSelector((state) => state);
  
    var segmentCount = (window.location.href.split('/').length - 1) - (window.location.href[window.location.href.length - 1] == '/' ? 1 : 0);
  
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
          setLoading(true);
          setContentError("");
          setEditLessonUploadImage(true)
          setRemoveName(true)
          let extension = file.name.split(".")
          let type = '';
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
          if(extensionMapping(extension[1]) === "image"){
            type = "image"
            // setContentType("image")
          } else if (extensionMapping(extension[1]) === "video"){
            type = "video"
            // setContentType("video")
          } else if (extensionMapping(extension[1]) === "audio"){
            type = "audio"
            // setContentType("audio")
          } else if (extensionMapping(extension[1]) === "doc"){
            type = "doc"
            // setContentType("doc")
          } else if (extensionMapping(extension[1]) === "excel"){
            type = "excel"
            // setContentType("excel")
          } else if (extensionMapping(extension[1]) === "pdf"){
            type = "pdf"
            // setContentType("pdf")
          } else if (extensionMapping(extension[1]) === "ppt"){
            type = "ppt"
            // setContentType("ppt")
          } 
          setContentType(type);
          if(type !== ""){
            setContentError("")
            let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            let formData = new FormData();
            formData.append('attachment_file', file,file.name);
            formData.append('owner', user_data.profile_id);
            dispatch(addAttachment(formData));
            setContent(e.target.result)
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
      dispatch(addAttachment())
    }, [])
    
    
    useEffect(() => {
      let contentData = []
      if(attachmentData && loading){
        setLoading(false)
        contentData.push(attachmentData.id)
        setContent(attachmentData.attachment_file)
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
        dispatch(editLessonPracticeExam(data,props.id,'lessons'));
      }
    }
  
    const updatedLessonDataRes = useSelector((state) => state.contentData.updateLessonPracticeExamData);
  
    useEffect(() => {
      if(updatedLessonDataRes.id && btnClickFlag && error.errorsData === ""){
        setTags([]);
        setContentId([]);
        setContent("");
        formRef.current.values.title = "";
        setContentError("");
        setLoading(false);
        setBtnClickFlag(false);
        props.callBack();
        setEditLessonUploadImage(false)
        toast.success('Lesson Updated');
      }
    },[updatedLessonDataRes])
  
    const lessonData = useSelector((state) => state.contentData.getLessonPracticeExamData);

    useEffect(() => {
      let contentIdArray = []
      if(lessonData.id){
        if(lessonData.content && lessonData.content[0]){
          contentIdArray.push(lessonData.content[0].id)
          setContentId(contentIdArray)
          setContent(lessonData.content[0].attachment_file)
          setAllContent(lessonData.content[0])
          let extension = lessonData.content[0].filename.split(".")
          if(extensionMapping(extension[1]) === "image"){
            // type = "image"
            setContentType("image")
          } else if (extensionMapping(extension[1]) === "video"){
            // type = "video"
            setContentType("video")
          } else if (extensionMapping(extension[1]) === "audio"){
            // type = "audio"
            setContentType("audio")
          } else if (extensionMapping(extension[1]) === "doc"){
            // type = "doc"
            setContentType("doc")
          } else if (extensionMapping(extension[1]) === "excel"){
            // type = "excel"
            setContentType("excel")
          } else if (extensionMapping(extension[1]) === "pdf"){
            // type = "pdf"
            setContentType("pdf")
          } else if (extensionMapping(extension[1]) === "ppt"){
            // type = "ppt"
            setContentType("ppt")
          } 
        }
        else{
          setContentId([])
          setContent("")
        }

      }
    },[lessonData])
    const getImagename = lessonData.content[0] && lessonData.content[0].filename && lessonData.content[0].filename
  
    const getAttachmentsData = useSelector((state) => state.contentData.getAttachmentsData);

    
  
    // useEffect(() => {
    //   let attachment = "";
    //   let contentIdArray = []
    //   if(getAttachmentsData && lessonData && lessonData.content && lessonData.content.length !== 0){
    //     attachment = getAttachmentsData.results.filter(obj => obj.id === lessonData.content[0].id)
    //     if(attachment && attachment[0]){
    //       contentIdArray.push(lessonData.content[0].id)
    //       setContentId(contentIdArray)
    //       setContent(attachment[0].attachment_file)
    //       setAllContent(attachment[0])
    //       let extension = lessonData.content[0].filename.split(".")
    //       if(extensionMapping(extension[1]) === "image"){
    //         // type = "image"
    //         setContentType("image")
    //       } else if (extensionMapping(extension[1]) === "video"){
    //         // type = "video"
    //         setContentType("video")
    //       } else if (extensionMapping(extension[1]) === "audio"){
    //         // type = "audio"
    //         setContentType("audio")
    //       } else if (extensionMapping(extension[1]) === "doc"){
    //         // type = "doc"
    //         setContentType("doc")
    //       } else if (extensionMapping(extension[1]) === "excel"){
    //         // type = "excel"
    //         setContentType("excel")
    //       } else if (extensionMapping(extension[1]) === "pdf"){
    //         // type = "pdf"
    //         setContentType("pdf")
    //       } else if (extensionMapping(extension[1]) === "ppt"){
    //         // type = "ppt"
    //         setContentType("ppt")
    //       } 
    //     }
    //     else{
    //       setContentId([])
    //       setContent("")
    //     }
    //   }
    // },[getAttachmentsData]);



    useEffect(() => {
    let tagArray = [];
      if(lessonData && lessonData.tags.length !== 0){
        lessonData.tags.map(function(value,key){
          tagArray.push({'id':value['id'],'name':value['title']})
        })
        setTags(tagArray)
      }
    },[lessonData])

    const handleBack = () => {
        props.setStateBack(false)
    }

    const handleRemoveImage = () => {
      setRemoveName(true)
      dispatch(deleteAttachment(contentId[0]))
      setContentId([])
    }

    const getdeleteAttachments = useSelector((state) => state.contentData.getdeleteAttachments);

    useEffect(() => {
      if(getdeleteAttachments && EditLessonUploadImage){
        const getfilename = document.getElementsByClassName("Edit_upload_input")[0].value = ""
        setEditLessonUploadImage(false)
      }
    }, [getdeleteAttachments]) 
    
    const defaulthandleRemoveImage = () => {
      const getfilename = document.getElementsByClassName("Edit_upload_input")[0].value = ""
      setDefaultRemoveName(false)
      dispatch(deleteAttachment(contentId[0]))
      setContentId([]);
    }

    return (
    <>
      <Formik
        initialValues={{ title: lessonData.title}}
        validationSchema={validationSchema}
        onSubmit={submitData}
        innerRef={formRef}
      >
        {({ values, handleChange }) => {
          return(
            <Form>
                <div className="add_lesson">
                    <div className="modal-form-cta modal_form_cta_test">
                    <div className="d-flex align-items-center ">
                        <span className="cursor_pointer" onClick={handleBack}>
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
                        <h3 className="">Edit Lesson</h3>
                    </div>
                    <div>
                        <button className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                        <button className="btn-secondary-yazmi">Cancel</button>
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="label-yazmi">
                            Edit Lesson Name
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
                    
                    <input type="file" className="Edit_upload_input upload_input"   onChange={imageUpload}/>
                    <button type="button" className={loading ? "btn-primary-yazmi button_disable": "btn-grey display-block upload_btn"} disabled={loading ? true : false}>
                      Upload Content
                    </button>
                    </div>
                  </div>
                  {
                    attachmentData.filename && EditLessonUploadImage   ?
                    <>
                    <div className="uploaded_button">
                      <div className="uploaded_icon">
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
                    </>
                  : DefaultRemoveName && AllContent.length !== 0 && !RemoveName ? 
                  <>
                    <div className="uploaded_button">
                    
                    <div className="uploaded_icon">
                    
                    {
                            (contentType === "image")
                            ?
                            <>
                              <span className="d-flex align-items-center">
                                <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/image-svgrepo-com.svg'} alt="" />
                              </span>
                              <p>{AllContent && AllContent.filename} </p>
                            </>
                            :
                              (contentType === "video")
                              ?
                              <>
                                    <span className="d-flex align-items-center"> 
                                      <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/videoplaysvg.svg'} alt="" />
                                    </span>
                                    <p>{AllContent && AllContent.filename} </p>
                                  </>
                                
                              :
                                (contentType === "audio")
                                ?
                                    <>
                                      <span className="d-flex align-items-center">
                                        <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/mp3svg.svg'} alt="" />
                                      </span>
                                      <p>{AllContent && AllContent.filename} </p>
                                    </>
                                : (contentType === "doc") ?
                                    <>
                                      <span className="d-flex align-items-center">
                                        <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/icons8-microsoft-word.svg'} alt="" />
                                      </span>
                                      <p>{AllContent && AllContent.filename} </p>
                                    </>
                                : (contentType === "excel") ?
                                    <>
                                      <span className="d-flex align-items-center">
                                        <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/microsoft-excel-2013-logo-svgrepo-com.svg'} alt="" />
                                      </span>
                                      <p>{AllContent && AllContent.filename} </p>
                                    </> 
                                : (contentType === "pdf") ?
                                    <>
                                      <span >
                                        <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/pdfsvg.svg'} alt="" />
                                      </span>
                                      <p>{AllContent && AllContent.filename} </p>
                                    </> 
                                : (contentType === "ppt") ?
                                    <>
                                      <span className="d-flex align-items-center">
                                        <img className="img_icon_size" src={process.env.PUBLIC_URL+'/images/pptsvg.svg'} alt="" />
                                      </span>
                                      <p>{AllContent && AllContent.filename} </p>
                                    </> 
                                  :
                                  <></>
                        }
                      
                    </div>
                    <span className="cross_icon" 
                    onClick={defaulthandleRemoveImage}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="#666666"/>
                      </svg>
                    </span>
                  </div>
                  </> 
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

export default EditLesson;
