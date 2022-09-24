import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {downloadLists} from "../../../actions/User";
import DownloadingModal from "../Modals/DownloadingModal";
import checkPermission from "../../../utils/CheckPermission"

const DownloadListModal = (props) => {
  let dispatch = useDispatch();

  const [downloadType,setDownloadType] = useState('')
  const [showDownloading, setShowDownloading] = useState(false);

  const handleShowDownloading = () => setShowDownloading(true);

  const closeShowDownloading = () => {
    setShowDownloading(false);
  };

  const downloadList = (name) => {
    props.closeModal();
    setDownloadType(name)
    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    let token = user_data.key
    dispatch(downloadLists(token,name))
  }
  const downloadData = useSelector((state) => state.usersData.downloadData);

  useEffect(() => {
    if(downloadData){
      closeShowDownloading();
    }
  },[downloadData])

  const { error } = useSelector((state) => state);

  useEffect(() => {
    if(error && handleShowDownloading){
      setShowDownloading(false)
    }
  },[error])


  return (
    <>
      <Modal show={props.show} onHide={props.closeModal} className="download_list">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Download List</h3>
            <Link
              // to="#/"
              className="close-modal-header"
              onClick={props.closeModal}
            >
              <img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" />
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body  className="download_list_modal">
            <ul>
              {(checkPermission('custom_user_operation_download'))
              ?
                <li onClick={() => {downloadList('all-others');handleShowDownloading()}}>Other Users (Except Student & Teacher) Download List</li>
              :
                <></>
              }
              {(checkPermission('custom_school_operation_download'))
              ?
                <>
                  <li onClick={() => {downloadList('students');handleShowDownloading()}}>Student Download List</li>
                  <li onClick={() => {downloadList('teachers');handleShowDownloading()}}>Teacher Download List</li>
                </>
              :
                <></>
              }
            </ul>
            <div className="modal-form-cta">
                    <button
                      className="btn-secondary-yazmi"
                      onClick={props.closeModal}
                    >
                      Cancel
                    </button>
                  </div>
        </Modal.Body>
      </Modal>

      <DownloadingModal
        show={showDownloading}
        closeShowDownloading={closeShowDownloading}
        type={downloadType}
      />
    </>
  );
};

export default DownloadListModal;
