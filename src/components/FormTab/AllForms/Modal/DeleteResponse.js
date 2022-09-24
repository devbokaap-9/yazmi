import React,{useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteFormResponseUser } from '../../../../actions/Form';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const DeleteResponse = (props) => {
    let dispatch = useDispatch();
    let history = useHistory();
    const [flag,setFlag] = useState(false)
    const [loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");

    // get form id 
    const getFormid = useSelector((state) => state.formsData.singleFormData);

    const handleDelete = () => {
      props.closeModal();
      setLoading(true)
      setFlag(true)
      dispatch(deleteFormResponseUser([getFormid.id,props.Id]))
    }

    const deleteResponseUSer = useSelector((state) => state.formsData.deleteResponseData);
    
   
    useEffect(() => {
        if(deleteResponseUSer.status === 204 && flag){
          setLoading(false)
          setFlag(false);
          toast.success('Response Deleted');
        //   history.push('/contents')
        }
    },[deleteResponseUSer]);

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
                <div className="cm-title-text">Delete User</div>
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
              Are you sure you want to delete this User?
              </p>
              <div className="confirm-cta">
                <Link onClick={() => {handleDelete()}}>
                Yes
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

export default DeleteResponse;
