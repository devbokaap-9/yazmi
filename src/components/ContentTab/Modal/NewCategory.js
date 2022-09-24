import React,{useState, useRef, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {removeErrorData} from "../../../actions/RemoveError";
import { useDispatch, useSelector } from "react-redux";
import {addAttachment, getTags, addContentTag, addCategory, editCategory, deleteAttachment} from "../../../actions/Content";
import ReactTags from 'react-tag-autocomplete'
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';

//validation
const validationSchema = yup.object({
  title: yup.string().required("Cannot be blank"),
});

const NewCategory = (props) => {
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [tags, setTags] = useState([]);
  const [suggestions,setSuggestions] = useState([]);
  const [imageId,setImageId] = useState("");
  const [imageError,setImageError] = useState("")
  const [image,setImage] = useState("")//image that we get at the time of edit
  const [updateDelete,setDelete] = useState(true);
  const [GetImageData,setGetImageData] = useState([]);
  const [CategoryUploadImage,setCategoryUploadImage] = useState(false);
  const [DefaultRemove,setDefaultRemove] = useState(false);


  const dispatch = useDispatch();
  let history = useHistory()
  const reactTags = useRef();

  const { error } = useSelector((state) => state);

  useEffect(() => {
    if(window.location.href.includes('contents')){
      dispatch(getTags())
    }
  },[])


  useEffect(() => {
   if(props.type === "category" && props.chnagetype === "catcreate") {
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
    setCategoryUploadImage(false)
   }
   else if(props.type === "category" && props.chnagetype === "catedit"){
    setDefaultRemove(false)
    props.typeFunction("")
   }
  })

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
              setCategoryUploadImage(true)
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
    let data = {
      title : values.title,
      tags : tagIds
    }
    
    if(imageId && imageId !== ""){
      data.thumbanil = imageId
    }
    if(props.flag === 0){
      dispatch(addCategory(data));
    }
    else{
      
      dispatch(editCategory(props.id,data));
    }
  }

  const addCategoryData = useSelector((state) => state.contentData.saveCategoryData);

  useEffect(() => {
    if(addCategoryData.id && btnClickFlag && error.errorsData === ""){
      props.closeModal();
      setTags([]);
      setImageId("");
      setImageError("");
      setImage("");
      setGetImageData([])
      setLoading(false);
      setBtnClickFlag(false);
      history.push("/contents")
      toast.success('Category Added');
    }
  },[addCategoryData]);

  const updatedCategoryData = useSelector((state) => state.contentData.updatedCategoryData);

  useEffect(() => {
    if(updatedCategoryData.id && btnClickFlag && error.errorsData === ""){
      props.closeModal();
      setTags([]);
      setImageId("");
      setImageError("");
      setImage("");
      setGetImageData([])
      setLoading(false);
      setBtnClickFlag(false);
      history.push("/contents")
      setDefaultRemove(false)
      toast.success('Category Updated');
    }
  },[updatedCategoryData]);

  const categoryDetailsData = useSelector((state) => state.contentData.categoryDetailsData);

  
  const attachmentsData = useSelector((state) => state.contentData.getAttachmentsData);

  useEffect(() => {
    if(categoryDetailsData){
      let tagArray = [];
      categoryDetailsData.tags.map(function(value,key){
        tagArray.push({'id':value['id'],'name':value['title']})
      })
      setTags(tagArray)
      if(categoryDetailsData.thumbanil){
        setImage(categoryDetailsData.thumbanil.attachment_file)
        setGetImageData(categoryDetailsData.thumbanil)
      }
      else{
        setImage("")
        setGetImageData([])
      }
    }
  },[categoryDetailsData])

  const getdeleteAttachments = useSelector((state) => state.contentData.getdeleteAttachments);


  useEffect(() => {
    if(getdeleteAttachments && CategoryUploadImage && imageId){
      const getfilename = document.getElementsByClassName("bulk_upload_input")[0].value = ""
      setDelete(false)
      setCategoryUploadImage(false)
    }
  }, [getdeleteAttachments])  

  const handleRemoveImage = () => {
    const getfilename = document.getElementsByClassName("bulk_upload_input")[0].value = ""
    setDelete(false)
    setCategoryUploadImage(false)
    // dispatch(deleteAttachment(imageId))
  }

  const defaulthandleRemoveImage = () => {
    const getfilename = document.getElementsByClassName("bulk_upload_input")[0].value = ""
    setDefaultRemove(true)
    setDelete(false)
    setCategoryUploadImage(false)
    // dispatch(deleteAttachment(categoryDetailsData.thumbanil))
  }
  
  return (
    <>
      <Modal show={props.show} onHide={() => {props.closeModal();setTags([]);setImageId("");setImageError("");setImage("");setGetImageData([])}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.flag === 0
            ?
              <>
                <h3>Add New Category</h3>
                <p>Add a new subject category to add courses under</p>
              </>
            :
              <h3>Edit Category</h3>
            }
            <Link
              className="close-modal-header"
              onClick={() => {props.closeModal();setTags([]);setImageId("");setImageError("");setImage("");setGetImageData([])}}
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
            initialValues={{ title: (props.flag === 0) ? "" : categoryDetailsData.title}}
            validationSchema={validationSchema}
            onSubmit={submitData}
          >
            {({ values, handleChange }) => {
              return(
                <Form>
                  <div className="modal-form-wrapper broadcast-form-wrapper share_form send_remender">
                    <div className="uf-single">
                      <div className="uf-label">Category Name</div>
                      <div className="uf-field">
                        <Field
                          type="text"
                          className="input-yazmi"
                          name="title"
                          maxlength="75"
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
                      <div className="uf-single w-auto mb-1">
                        <div className="uf-label">Add Thumbnail</div>
                          <div className="upload_image d-flex">
                            <div className="d-flex">
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
                                  <img src={image} className="img_size_fix mb-2"/>
                                :
                                  imageId && imageId !== null
                                  ?
                                    <img src={attachmentData && attachmentData.attachment_file} className="img_size_fix mb-2" />
                                  :
                                      <></>
                              } */}
                              <input type="file" className="bulk_upload_input " onChange={imageUpload}/>
                              <button type="button" className={loading ? "btn-primary-yazmi button_disable ": "btn-primary-yazmi"} disabled={loading ? true : false}>Upload</button>
                              <div className="mt-2">
                                <span className="text-danger error_msg pt-2">
                                  {imageError ? imageError : ""}
                                </span>
                              </div>
                            </div>
                            {
                    imageId && imageId !== null && props.type == "category" && attachmentData.filename && updateDelete == true && CategoryUploadImage && loading === false && CategoryUploadImage ?
                  
                  <div className="uploaded_button">
                    
                    {/* <div className="uploaded_icon"> */}
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
                    {/* </div> */}
                    <span className="cross_icon " onClick={handleRemoveImage}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="#666666"/>
                      </svg>
                    </span>
                  </div>
                  
                  : (image && !DefaultRemove) ?
                  <div className="uploaded_button">
                    
                    <div className="uploaded_icon">
                      <p>{GetImageData.filename}</p>               
                    </div>
                    <span className="cross_icon " onClick={defaulthandleRemoveImage}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="#666666"/>
                      </svg>
                    </span>
                  </div> 
                  :
                  <></>
                  }
                  </div>

                      </div>
                    </div>
                    <div className="uf-single">
                      <div className="uf-label">Tags <p className="mb-0">Use comma to seperate</p></div>
                      
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
                    <div className="modal-form-cta">
                      <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                      <button type="button" className="btn-secondary-yazmi" onClick={() => {props.closeModal();setTags([]);setImageId("");setImageError("");setImage("");setGetImageData([])}}>
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default NewCategory;
