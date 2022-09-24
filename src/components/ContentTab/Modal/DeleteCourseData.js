import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {deleteCourseData} from "../../../actions/Content";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const DeleteCourseData = (props) => {
    let dispatch = useDispatch();
    const [flag,setFlag] = useState(false)
    const [loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");

    const deleteCourseFun = () => {
      setLoading(true)
      let segments = window.location.href.split("/");
      let segment = segments[segments.length-1];
      setFlag(true)
      let type = "lessons"
      if(props.type === "practice"){
        type = "practices"
      }
      else if(props.type === "exam"){
        type = "exams"
      }
      dispatch(deleteCourseData(segment,props.id,type))
    }

    const deleteCourseDataRes = useSelector((state) => state.contentData.deleteCourseDetailData);

    const error = useSelector(
      (state) => state.error.errorsData
    );
  
    useEffect(() => {
      if(deleteCourseDataRes.status === 204 && flag){
        setLoading(false)
        props.closeModal();
        setFlag(false);
        toast.success(props.title+' Deleted');
      }
    },[deleteCourseDataRes]);

    useEffect(() => {
      if(error.status === 500 && flag){
        setLoading(false)
        props.closeModal();
        setFlag(false);
        toast.error(" Not able to delete");
      }
    },[error]);

    

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
                <div className="cm-title-text">Delete {props.title}</div>
                <div className="cm-title-close">
                  {" "}
                  <button onClick={props.closeModal} disabled={loading ? true : false}>
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/modal-close-dark.svg"
                      }
                      alt="Close"
                    />
                  </button>
                </div>
              </div>
              <p className="cm-content">
              Are you sure you want to delete this {props.type}?
              </p>
              <div className="confirm-cta">
              { loading ?
                <div class="spinner-border" role="status"></div>
                :
                <Link onClick={() => {deleteCourseFun()}}>
                Yes
                </Link>
              }
                <button onClick={props.closeModal} disabled={loading ? true : false}>
                  Cancel
                </button>
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

export default DeleteCourseData
