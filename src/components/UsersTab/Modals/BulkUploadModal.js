import React,{useState, useEffect, useRef} from "react";
import { Link,useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import {bulkUpload} from "../../../actions/User";
import {useSelector,useDispatch} from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {removeErrorData} from "../../../actions/RemoveError";
import { toast,ToastContainer } from 'react-toastify';
import { hideToaster, showToaster } from "../../../actions/Auth";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const BulkUploadModal = (props) => {
  let location = useLocation();
  let dispatch = useDispatch();
  let ref = useRef();

  const [file,setFile] = useState("")
  const [errorData,setError] = useState("")
  const [filename,setFilename] = useState("")
  const [loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");
  const [flag,setFlag] = useState(false)

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);
  const isToasterShow = useSelector((state) => state.authData.isToasterDisplay);
  // useEffect(() => {
  //   if()
  // },[flag])

  const inputFileClick = (e) => {
    // console.log(11111)
    setError("")
    setFile("")
    setFilename("")
    ref.current.value = "";
  }

  const excelUpload = (e) => {
    dispatch(removeErrorData())
    setError("")
    setFile("")
    setFilename("")
    // console.log(e,'event')
    var excelFile = e.target.files[0];
    setFile(excelFile);
    setFilename(excelFile.name)
  }

  const submitExcel = () => {
    dispatch(removeErrorData())
    if(file !== ""){
      setLoading(true)
      let entity = "users";
      if(window.location.href.includes("regions") && segmentCount === 1){
        entity = "regions"
      }
      else if(window.location.href.includes("woreda") && segmentCount === 1){
        entity = "woredas"
      }
      else if(window.location.href.includes("schools") && segmentCount === 1){
        entity = "schools"
      }

      let data = new FormData();
      data.append('file', file);
      data.append('entity', entity);
      dispatch(showToaster())
      dispatch(bulkUpload(data,entity))
    }
    else{
      setError("Upload Excel File")
    }
  }
  const { error } = useSelector((state) => state);

  const { usersData }  = useSelector((state) => state.usersData);

  useEffect(() => {
    if(usersData && loading && isToasterShow){
      dispatch(hideToaster())
      props.closeModal()
      setLoading(false)
      setError("")
      setFilename("")
      setFile("")
      toast.success("Uploaded Successfully");
    }
  },[usersData])


  const regionData  = useSelector((state) => state.regionData.regionData);

  useEffect(() => {
    if(regionData && loading && isToasterShow){
      dispatch(hideToaster())
      props.closeModal()
      setLoading(false)
      setError("")
      setFilename("")
      setFile("")
      toast.success("Uploaded Successfully");
    }
  },[regionData])

  const woredaData = useSelector((state) => state.woredaData.woredaData);

  useEffect(() => {
    if(woredaData && loading && isToasterShow){
      dispatch(hideToaster())
      props.closeModal()
      setLoading(false)
      setError("")
      setFilename("")
      setFile("")
      toast.success("Uploaded Successfully");
    }
  },[woredaData])

  const schoolData = useSelector((state) => state.schoolData.schoolData);

  useEffect(() => {
    if(schoolData && loading && isToasterShow){
      dispatch(hideToaster())
      props.closeModal()
      setLoading(false)
      setError("")
      setFilename("")
      setFile("")
      toast.success("Uploaded Successfully");
    }
  },[schoolData])

  // console.log(error,'errrr')

  useEffect(() => {
    if(error && error.errorsData && error.errorsData !== ""){
      if(error.errorsData.error){
        setError(error.errorsData.error)
      }
      else if(error.errorsData.msg){
        setError(error.errorsData.msg)
      }
      setLoading(false)
    }
  },[error])

  return (
    <>
        <Modal show={props.show} onHide={() => {props.closeModal();setError("");setFile("");setFilename("")}}>
            <Modal.Header closeButton>
            <Modal.Title>
                <h3>Bulk Upload</h3>
                <p>Upload a XLS file containing your {(window.location.href.includes("federal") || ((window.location.href.includes("regions") || window.location.href.includes("woreda") || window.location.href.includes("schools")) && segmentCount === 2)) ? "user" : window.location.href.includes("regions") ? "region" : window.location.href.includes("woreda") ? "woreda" : window.location.href.includes("schools") ? "school" : ""} details</p>
                <Link className="close-modal-header" onClick={() => {props.closeModal();setError("");setFile("");setFilename("")}}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="Close"/></Link>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="bulk-upload-modal">
                <p>Click Browse</p>
                {/* <Link className="upload-file">Browse</Link> */}
                <div className="yazmi_browser">
                  <div className="upload_yazmi upload_yazmi_browser">
                    <input type="file" className="bulk_upload_input" onChange={excelUpload} ref={ref} onClick={inputFileClick}/>
                    <p className="upload-file mb-0 upload_link">Browse</p>
                  </div>
                  {filename !== ""
                  ?
                  <button className="upload-file btn-grey">
                  <img className="" src={process.env.PUBLIC_URL+'/images/microsoft-excel-2013-logo-svgrepo-com.svg'} alt="" />
                    {filename}
                  </button>
                  :
                    <></>
                  }
                </div>
                <p>Click <Link to={(window.location.href.includes("federal") || ((window.location.href.includes("regions") || window.location.href.includes("woreda") || window.location.href.includes("schools")) && segmentCount === 2) || (window.location.href.includes("users") && segmentCount === 1)) ? {  pathname: "https://yazmi-storage-public-bucket.s3.us-east-2.amazonaws.com/upload-samples/created_student_teacher_others.xlsx"} : window.location.href.includes("regions") ? {  pathname: "https://yazmi-storage-public-bucket.s3.us-east-2.amazonaws.com/upload-samples/create_regions.xlsx"} : window.location.href.includes("woreda") ? {  pathname: "https://yazmi-storage-public-bucket.s3.us-east-2.amazonaws.com/upload-samples/create_woredas.xlsx"} : window.location.href.includes("schools") ? {  pathname: "https://yazmi-storage-public-bucket.s3.us-east-2.amazonaws.com/upload-samples/create_schools.xlsx"} : ""  } download target="_blank">here</Link> to download sample XLS.</p>
                <span className="text-danger error_msg ">{errorData ? errorData : ""}</span>
                <div className="modal-form-cta d-flex justify-content-center">
                  {/* <div className="upload_yazmi">
                    <input type="file" className="bulk_upload_input" /> */}
                    { loading ?
                      <div class="spinner-border" role="status"></div>
                    :
                      <button className="btn-primary-yazmi" onClick={submitExcel}>Upload</button>
                    }
                  {/* </div> */}
                  <button className="btn-secondary-yazmi" onClick={() => {props.closeModal();setError("");setFile("");setFilename("")}}>Cancel</button>
                </div>
            </div>
            </Modal.Body>

      </Modal>
      {/* <div className={loading ? "loader_div" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={loading}
          css={override}
          size={50}
        />
      </div> */}
      {!window.location.href.includes('roles')?
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
      />:null}
    </>
  )
};
export default BulkUploadModal;
