import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bulkAction, removeBulkAction } from "../../../actions/User";
import {removeErrorData} from "../../../actions/RemoveError";
import { getSingleFederalData } from "../../../actions/Federal";
import { getRegionsData, getSingleRegionUser } from "../../../actions/Region";
import { getWoredasData, getWoredaUser } from "../../../actions/Woreda";
import { getSchoolsData, schoolUserData } from "../../../actions/School";
import { UserContext } from '../../../UserContext';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const SuspendModal = (props) => {
  const { deleteRole, name, id,actionName } = props;

  const [Loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");


  const  params = useParams();

  const dispatch = useDispatch();

  const suspendRes = useSelector(
    (state) => state.usersData.usersBulkActionRes
  );

  const error = useSelector(
    (state) => state.error.errorsData
  );

  const userContext = useContext(UserContext);

  const { federalData } = useSelector((state) => state.federalData);
  var { count, results } = federalData;
  // get federal single id
  var FederalId = results && results[0].id
  
  useEffect(() => {
    if(userContext.allBtn !== 'suspendAll' && userContext.allBtn !== 'deleteAll'){
      if (suspendRes && suspendRes.status === 200 && window.location.href.includes('federal')) {
          dispatch(getSingleFederalData(FederalId))
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
      else if (suspendRes && suspendRes.status === 200 && window.location.href.includes('regions') && deleteRole === "region") {
          dispatch(getRegionsData())
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
      else if (suspendRes && suspendRes.status === 200 && window.location.href.includes('regions') && deleteRole === "regionUser") {
          dispatch(getSingleRegionUser(params.id))
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
      else if (suspendRes && suspendRes.status === 200 && window.location.href.includes('woreda') && deleteRole === "woreda") {
          dispatch(getWoredasData())
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
      else if (suspendRes && suspendRes.status === 200 && window.location.href.includes('woreda') && deleteRole === "woredauser") {
          dispatch(getWoredaUser(params.id))
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
      else if (suspendRes && suspendRes.status === 200 && window.location.href.includes('schools') && deleteRole === "school") {
          dispatch(getSchoolsData())
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
      else if (suspendRes && suspendRes.status === 200 && window.location.href.includes('schools') && deleteRole === "schoolUser") {
          dispatch(schoolUserData(params.id))
          setLoading(false)
          props.closeModal()
          toast.success('Suspended Successfully')
          dispatch(removeBulkAction())
      }
    }
  }, [suspendRes]);

  useEffect(() =>{
    if(error && (error.status === 500 || error.status === 400)){
        setLoading(false)
        props.closeModal()
        // toast.error("Not able to suspend")
    }
},[error])

  // delete single data
  const handleSuspend = (e) => {
    e.preventDefault()
    dispatch(removeErrorData)
    dispatch(removeBulkAction())
    setLoading(true)
    let idArray = [];
    if(id !== ''){
        idArray.push(id)
    }
    let data = {
        'profiles' : idArray,
        'action' : actionName
    }
    dispatch(bulkAction(data,'',''));
    // if (name === "region") {
    //   dispatch(DeleteRegionData(id));
    //   setRegionBtn(true);
    //   setName('users');
    // } else if (name === "woreda") {
    //   dispatch(deleteWoredaData(id));
    //   setWoredaBtn(true);
    //   setName('users');
    // } else if (name === "school") {
    //   dispatch(deleteSchoolData(id));
    //   setSchoolBtn(true);
    //   setName('users');
    // } else if (deleteRole === "schoolUser") {
    //   dispatch(deleteSchoolUser(id));
    //   setSchooluserBtn(true);
    //   setName('users');
    // } else if (deleteRole === "woredauser") {
    //   dispatch(deleteWoredaUser(id));
    //   setWoredaUserBtn(true);
    //   setName('users');
    // } else if (deleteRole === "regionUser") {
    //   dispatch(singleDeleteForRegionUser(id));
    //   setRegionUserBtn(true);
    //   setName('users');
    // }
    // else if (deleteRole === "federalsUser") {
    //     url = "federal"
    //     dispatch(bulkAction(data,url,''));
    //     setFederalsUserBtn(true);
    //     setName('users');
    // }
    // else if (deleteRole === "singleUser") {
    //   dispatch(getDeleteUser(id));
    //   setUserBtn(true);
    //   setName('users');
    // }
  };

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
            <p className="cm-content">
              Do you want to suspend this {props.name} ?
            </p>
            <div className="confirm-cta">
              { Loading ?
                  <div class="spinner-border" role="status"></div>
                  :
                <Link
                  onClick={(e) => {
                    handleSuspend(e);
                  }}
                >
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

      <div className={Loading? "loader_div" : ""}>
        <ClipLoader color={color} className="loader" loading={Loading} css={override} size={50} />
      </div>
    </>
  );
};
export default SuspendModal;
