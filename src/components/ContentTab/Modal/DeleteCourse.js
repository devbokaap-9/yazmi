import React,{useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {deleteCourse} from "../../../actions/Content";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const DeleteCourse = (props) => {
    let dispatch = useDispatch();
    let history = useHistory();
    const [flag,setFlag] = useState(false)
    const [loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");

    const deleteCourseFun = () => {
      setLoading(true)
      setFlag(true)
      dispatch(deleteCourse(props.id))
    }

    const deleteCourseRes = useSelector((state) => state.contentData.deleteCourseData);

    const error = useSelector(
      (state) => state.error.errorsData
    );
  
    useEffect(() => {
      if(deleteCourseRes.status === 204 && flag){
        setLoading(false)
        props.closeModal();
        setFlag(false);
        toast.success('Course Deleted');
        history.push('/contents')
      }
    },[deleteCourseRes]);

    useEffect(() => {
      if(error.status === 500 && flag){
        setLoading(false)
        props.closeModal();
        setFlag(false);
        toast.error("Not able to delete");
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
                <div className="cm-title-text">Delete Course</div>
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
              Are you sure you want to delete this course?
              </p>
              <span className="s_content">
                If the course is assigned to anyone, they will loose their progress     
              </span>
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

export default DeleteCourse
