import React,{useState, useEffect, useRef} from "react";
import { Link,useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {removeErrorData} from "../../../actions/RemoveError";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {addAttachment, addContentTag, getTags,addCourse,editCourse,
  // getGrades, 
  deleteAttachment} from "../../../actions/Content";
import ReactTags from 'react-tag-autocomplete'
import { toast } from 'react-toastify';

//validation
const validationSchema = yup.object({
  title: yup.string().required("Cannot be blank"),
});

const NewCourse = (props) => {
  let dispatch = useDispatch();
  let history = useHistory()
  const reactTags = useRef();

  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [loading,setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [suggestions,setSuggestions] = useState([]);
  const [imageId,setImageId] = useState("");
  const [imageError,setImageError] = useState("")
  const [image,setImage] = useState("");
  const [updateDelete,setDelete] = useState(true);
  const [CourseUploadImage,setCourseUploadImage] = useState(false);
  const [DefaultRemove,setDefaultRemove] = useState(false);
  const [GetImageData,setGetImageData] = useState([]);

  const { error } = useSelector((state) => state);
  
  var segmentCount = (window.location.href.split('/').length - 1) - (window.location.href[window.location.href.length - 1] == '/' ? 1 : 0);

  useEffect(() => {
    if(window.location.href.includes('contents')){
      // dispatch(getGrades());
      if(segmentCount === 1){
        dispatch(getTags())
      }
    }
  },[])

  useEffect(() => {
    if(props.type === "course" && props.chnagetype === "coursecreate") {
      setTags([]);
      setImageId("");
      setImageError("");
      setImage("");
      setGetImageData([])
      setLoading(false);
      setBtnClickFlag(false);
      props.typeFunction("")
      setDefaultRemove(false)
      setDelete(false)
      setCourseUploadImage(false)
    }
    else if(props.type === "course" && props.chnagetype === "corscreate"){
      setImage("");
      setGetImageData([])
      setDefaultRemove(false)
      props.typeFunction("")
      setDefaultRemove(false)
      setDelete(false)
     }
   })

  // const getGradeData = useSelector((state) => state.contentData.gradeData);

  const imageUpload = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader(); // CREATE AN NEW INSTANCE.
    if (file && file.type.includes('image')) {
      if(file.size/1024 < 512){
        reader.onload = function (e) {
          var img = new Image();      
          img.src = e.target.result;

          img.onload = function () {
            var w = this.width;
            var h = this.height;
            var gcd_val = gcd(w, h);
            if(w/gcd_val === 1 && h/gcd_val === 1){
              setLoading(true);
              setImageError("");
              setCourseUploadImage(true)
              setDelete(true)
              let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
              let formData = new FormData();
              formData.append('attachment_file', file);
              formData.append('owner', user_data.profile_id);
              dispatch(addAttachment(formData));
              setImage(e.target.result)
            }
            else{
              setImageError('Required Ratio is 1:1')
            }
          }
        };
        reader.readAsDataURL(file);
      }
      else{
        setImageError('file size exceeded')
      }
    }
    else{
      if(file){
        setImageError('Not a valid image')
      }
    }
  }

  const  gcd = ( w, h ) => {
    return (w % h) ? gcd(h,w % h) : h;
  }

  const attachmentData = useSelector((state) => state.contentData.saveAttachments);

  useEffect(() => {
    if(attachmentData){
      setLoading(false)
      setImageId(attachmentData.id)
    }
  },[attachmentData])

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
    let data = {
      title : values.title,
      description : values.description,
      grades : values.grades,
      // thumbanil : imageId,
      tags : tagIds,
      category : props.id,
      creator : user_data.profile_id
    }
    if(imageId && imageId !== ""){
      data.thumbanil = imageId
    }
    if(props.flag === 0){
      dispatch(addCourse(data));
    }
    else{
      dispatch(editCourse(data,props.courseId));
    }
  }

  const courseDataRes = useSelector((state) => state.contentData.courseData);

  useEffect(() => {
    if(courseDataRes.id && btnClickFlag && error.errorsData === ""){
      props.closeModal();
      setTags([]);
      setImageId("");
      setImageError("");
      setLoading(false);
      setBtnClickFlag(false);
      history.push("/contents")
      toast.success('Course Added');
    }
  },[courseDataRes])

  const updatedCourseDataRes = useSelector((state) => state.contentData.updatedCourseData);

  useEffect(() => {
    if(updatedCourseDataRes.id && btnClickFlag && error.errorsData === ""){
      props.closeModal();
      setTags([]);
      setImageId("");
      setImageError("");
      setLoading(false);
      setBtnClickFlag(false);
      setDefaultRemove(false)
      history.push("/contents")
      toast.success('Course Updated');
    }
  },[updatedCourseDataRes])

  useEffect(() => {
    if(error && error.errorsData){
      setLoading(false);
      setBtnClickFlag(false);
    }
  },[error])

  //course detials
  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);
  
  useEffect(() => {
    if(courseDetailsData){
      let tagArray = [];
      courseDetailsData.tags.map(function(value,key){
        tagArray.push({'id':value['id'],'name':value['title']})
      })
      setTags(tagArray)
      if(courseDetailsData.thumbanil){
        setImage(courseDetailsData.thumbanil.attachment_file)
        setGetImageData(courseDetailsData.thumbanil)
      }
      else{
        setImage("")
        setGetImageData([])
      }
    }
  },[courseDetailsData])

  const getdeleteAttachments = useSelector((state) => state.contentData.getdeleteAttachments);

  useEffect(() => {
    if(getdeleteAttachments && CourseUploadImage && imageId){
      const getfilename = document.getElementsByClassName("new_course_upload")[0].value = ""
      setDelete(false)
      setCourseUploadImage(false)
    }
  }, [getdeleteAttachments])  


  const handleRemoveImage = () => {
    const getfilename = document.getElementsByClassName("new_course_upload")[0].value = ""
    setDelete(false)
    setCourseUploadImage(false)
    // dispatch(deleteAttachment(imageId))
  }

  const defaulthandleRemoveImage = () => {
    const getfilename = document.getElementsByClassName("new_course_upload")[0].value = ""
    setDefaultRemove(true)
    setDelete(false)
    setCourseUploadImage(false)
    // dispatch(deleteAttachment(categoryDetailsData.thumbanil))
  }

  return (
    <Modal show={props.show} onHide={() => {props.closeModal();setTags([]);setImageId("");setImageError("");setImage("")}}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.flag === 0
          ?
            <>
              <h3>Create New Course</h3>
              <p>
                Create a new course that can be assigned to users across the system
              </p>
            </>
          :
            <h3>Edit Course</h3>
          }
          
          <Link
            className="close-modal-header"
            onClick={() => {props.closeModal();setTags([]);setImageId("");setImageError("");setImage("")}}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/modal-close.svg"}
              alt="close"
            />
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ title: (props.flag === 0 ? "" : courseDetailsData.title),description:(props.flag === 0 ? "" : courseDetailsData.description), grades:(props.flag === 0 ? "" : (courseDetailsData && courseDetailsData.grades && courseDetailsData.grades.id) ? courseDetailsData.grades.id : "") }}
          validationSchema={validationSchema}
          onSubmit={submitData}
        >
          {({ values, handleChange }) => {
            return(
              <Form>
                <div className="modal-form-wrapper broadcast-form-wrapper share_form send_remender">
                  <div className="uf-single">
                    <div className="uf-label">Course Name</div>
                    <div className="uf-field">
                      <Field
                        type="text"
                        className="input-yazmi"
                        name="title"
                        maxlength="100"
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
                  </div>
                  <div className="uf-single">
                    <div className="uf-label">Add Thumbnail</div>
                    <div className="upload_image d-flex mt-3">
                      <div className="upload_yazmi add_lesson_upload">
                        {/* {props.flag === 0
                          ?
                            imageId && imageId !== null
                            ?
                              <img src={attachmentData && attachmentData.attachment_file} className="img_size_fix mb-2" />
                            :
                                <></>
                          :
                            (image)?
                              <img src={image} />
                            :
                              imageId && imageId !== null
                              ?
                                <img src={attachmentData && attachmentData.attachment_file} className="img_size_fix mb-2" />
                              :
                                <></>
                          } */}
                        <input type="file" className="bulk_upload_input new_course_upload" onChange={imageUpload}/>
                        <button type="button" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Upload</button>
                        <div className="mt-2">
                          <span className="text-danger error_msg ">
                            {imageError ? imageError : ""}
                          </span>
                        </div>
                      </div>
                      {
                        imageId && imageId !== null && props.type == "course" && attachmentData.filename && updateDelete  && CourseUploadImage && loading === false ?
                        
                        <div className="uploaded_button">
                          
                          <div className="uploaded_icon">
                          {props.flag === 0
                                    ?
                                      imageId && imageId !== null
                                      ?
                                        // <img src={attachmentData && attachmentData.attachment_file} className="img_size_fix mb-2" />
                                        <p>{attachmentData && attachmentData.filename} </p>
                                      :
                                          <></>
                                    :
                                      (image)?
                                        // <img src={image} className="img_size_fix mb-2"/>
                                        <p>{attachmentData && attachmentData.filename} </p>
                                      :
                                        imageId && imageId !== null
                                        ?
                                          // <img src={attachmentData && attachmentData.attachment_file} className="img_size_fix mb-2" />
                                          <p>{attachmentData && attachmentData.filename} </p>
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
                          (image && !DefaultRemove && props.flag !== 0 ) ?
                          <>
                          
                          <div className="uploaded_button">
                            
                            <div className="uploaded_icon">
                              <p>
                                {GetImageData.filename}
                                </p>               
                            </div>
                            <span className="cross_icon " onClick={defaulthandleRemoveImage}>
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
                  </div>
                  <div className="uf-single">
                    <div className="uf-label">
                      Tags <p className="mb-0">Use comma to seperate</p>
                    </div>

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

                  <div className="uf-single">
                    <div className="uf-label">Course Description</div>
                    <div className="uf-field">
                      <textarea
                        className="input-yazmi"
                        placeholder="Enter Your message here..."
                        rows="4"
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                      />
                    </div>
                  </div>
                  {/* <div className="uf-single">
                    <div className="uf-label">Assign Grades</div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      {getGradeData && getGradeData.results && getGradeData.results.map((gradeData) => {
                        return(
                          <div className="radio-field-wrapper">
                            <label className="container-radio">
                              {gradeData.title}
                              <input type="radio" name="grades" value={gradeData.id} onChange={handleChange} checked={(values.grades === gradeData.id) ? "checked" : ""}/>
                              <span className="checkmark-radio"></span>
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div> */}
                  {/* {(!error.errorsData)
                  ?
                    <></>
                  :
                    <span className="text-danger error_msg">
                      {error.errorsData && error.errorsData.grades
                        ? error.errorsData.grades
                        : ""}
                    </span>
                  } */}
                  <div className="modal-form-cta">
                    <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                    <button type="button" className="btn-secondary-yazmi" onClick={() => {props.closeModal();setTags([]);setImageId("");setImageError("");setImage("")}}>
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default NewCourse;
