import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { deleteSchoolData,  } from "../../../actions/School"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {removeErrorData} from "../../../actions/RemoveError";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const DeleteSchoolModal = (props) => {
    let history = useHistory();
    const [btn, setBtn] = useState(false)
    const [Loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");

    const {deleteRole,name, id,} = props
    const dispatch = useDispatch();
    const deleteSchool = useSelector((state) =>state.schoolData.deleteSchool);

    const error = useSelector((state) => state.error.errorsData);

    let location = useLocation();
    var locationId = location.pathname.split('/')[location.pathname.split('/').length-1]

    // Toaster
    const notify = () => {toast.success("Deleted successfully")};

     // Toaster
     const notifyerror = () => {
        toast.error(" Not able to delete");
    };

    useEffect(() => {
        if(deleteRole === "schoolUserDelete"){
            if(error.status === 500 && btn){
                props.closeModal();
                notifyerror();
                setBtn(false);
                setLoading(false)
                dispatch(removeErrorData)
            }
            else if(deleteSchool.status === 204 && btn === true){
                history.push("/schools");
                props.closeModal()  
                notify()
                setBtn(false)
                setLoading(false)
                dispatch(removeErrorData)
            }
        }
        
    }, [deleteSchool,error])


    // delete single data
    const handleDelete = () => {
        if(deleteRole === "schoolUserDelete"){
            dispatch(removeErrorData)
            setLoading(true)
            dispatch(deleteSchoolData(locationId))
            setBtn(true)
        }
    }


    return (
        <>
            <Modal show={props.show} onHide={props.closeModal} className="delete-modal-wrapper">
                <Modal.Body>
                    <div className="confirm-modal-wrapper">
                        <div className="cm-title">
                            <div className="cm-title-text">CONFIRM</div>
                            <div className="cm-title-close">
                                {" "}
                                <button onClick={props.closeModal} disabled={Loading ? true : false}>
                                    <img
                                        src={
                                            process.env.PUBLIC_URL + "/images/modal-close-dark.svg"
                                        }
                                        alt="Close"
                                    />
                                </button>
                            </div>
                        </div>
                        <p className="cm-content">Do you want to delete this {props.name}? All information about this {props.name} will be lost</p>                        
                        <div className="confirm-cta">
                            { Loading ?
                                <div class="spinner-border" role="status"></div>
                                :
                            <Link onClick={()=>{handleDelete()}}>
                                Yes
                            </Link>
                            }
                            <button onClick={props.closeModal} disabled={Loading ? true : false}>
                                No
                            </button>
                            
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {
                deleteSchool.status === 204 ? <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              /> : ""
            }

            <div className={Loading? "loader_div" : ""}>
                <ClipLoader color={color} className="loader" loading={Loading} css={override} size={50} />
            </div>
            
        </>
    )
};
export default DeleteSchoolModal;
