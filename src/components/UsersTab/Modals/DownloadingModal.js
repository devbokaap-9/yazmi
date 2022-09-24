import React,{useState,useEffect} from "react";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {downloadLists} from "../../../actions/User";

const DownloadingModal = (props) => {
  let dispatch = useDispatch();
  const [flag,setFlag] = useState(false)

  const { error } = useSelector((state) => state);

  useEffect(() => {
    if(error && props.type !== ""){
      setFlag(true)
    }
  },[error])
  
  const downloadExcel = () => {
    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
      let token = user_data.key
    dispatch(downloadLists(token,props.type))
  }
  return (
    <>
        <Modal show={props.show} onHide={props.closeShowDownloading} className="confirmModal downloadingModal">
       
            <Modal.Body>
                <div className="confirm-modal-wrapper text-center">
                <p className="downloading-title">Downloading....</p>
                <p className="downloading-text">Click {(flag)?<Link className="link-highlight" onClick={() => {downloadExcel()}}>here</Link> : "here"} if download does not start<br/>automatically in 10 seconds</p>
                </div>
            </Modal.Body>

        </Modal>
    </>
  )
};
export default DownloadingModal;
