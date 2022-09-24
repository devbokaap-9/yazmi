import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { DeleteRegionData } from "../../../actions/Region";
import { useDispatch, useSelector } from "react-redux"; 
import { toast } from 'react-toastify';
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



const DeleteRegionModal = (props) => {
    const [btn, setBtn] = useState(false)
    const [Loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");


    let history = useHistory();
    const {deleteRole,name, id,} = props
    const dispatch = useDispatch();
    const deleteRegionData = useSelector((state) => state.regionData.deleteRegionData);

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
        if(error.status === 500 && btn){
            props.closeModal();
            notifyerror();
            setBtn(false);
            setLoading(false)
            dispatch(removeErrorData)
        }
        else if(deleteRegionData.status === 204 && btn === true){
            props.closeModal()
            notify()
            history.push("/regions");
            setBtn(false)
            setLoading(false)
            dispatch(removeErrorData)
        }
        
    }, [deleteRegionData,error])


    // delete single data
    const handleDelete = () => {
        setLoading(true)
        dispatch(DeleteRegionData(locationId))
        setBtn(true)
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
                deleteRegionData.status === 204 ? <ToastContainer
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
export default DeleteRegionModal;
