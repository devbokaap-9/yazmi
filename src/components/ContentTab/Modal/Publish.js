import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {editCourse} from "../../../actions/Content";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const Publish = (props) => {
  let dispatch = useDispatch();

  const [flag,setFlag] = useState(false)
  const [loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");
  const [publish,setPublish] = useState(false)

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  const publishUnpublishCourse = () => {
    props.closeModal();
    setLoading(true)
    setFlag(true)
    setPublish(props.isPublish)
    let data = {
      "category" : courseDetailsData.category.id,
      "creator" : courseDetailsData.creator.id,
      "grades" : courseDetailsData.grades.id,
      "title" : courseDetailsData.title,
      "is_published" : props.isPublish
    }
    
    dispatch(editCourse(data,courseDetailsData.id))
  }

  const editCourseRes = useSelector((state) => state.contentData.updatedCourseData);
  
  useEffect(() => {
    if(editCourseRes.id && flag && loading){
      setLoading(false)
      setFlag(false);
      if(publish){
        toast.success('Course Published');
        setPublish(false)
      }
      else{
        toast.success('Course Unpublished');
        setPublish(false)
      }
    }
  },[editCourseRes]);


  return (
    <>
      <Modal
        show={props.show}
        onHide={props.closeModal}
        className="delete-modal-wrapper"
      >
        <Modal.Body>
          <div className="confirm-modal-wrapper">
            <div className="cm-title">
              <div className="cm-title-text">{props.isPublish ? "Publish " : "Unpublish "} Course</div>
              <div className="cm-title-close">
                {" "}
                <Link onClick={props.closeModal}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/modal-close-dark.svg"
                    }
                    alt="Close"
                  />
                </Link>
              </div>
            </div>
            <p className="cm-content">
                Are you sure you want to {props.isPublish ? "publish" : "ubpublish"} this course?
            </p>
            <div className="confirm-cta">
              <Link onClick={() => {publishUnpublishCourse()}}>
              {props.isPublish ? "Publish" : "Unpublish"}
              </Link>
              <Link onClick={props.closeModal}>
              Cancel
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
  )
}

export default Publish
