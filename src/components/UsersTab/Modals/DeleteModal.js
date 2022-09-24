import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  DeleteRegionData,
  singleDeleteForRegionUser,
} from "../../../actions/Region";
import { useDispatch, useSelector } from "react-redux";
import { deleteWoredaData, deleteWoredaUser } from "../../../actions/Woreda";
import { deleteSchoolData, deleteSchoolUser } from "../../../actions/School";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteSingleUserData } from "../../../actions/Federal";
import { getDeleteUser } from "../../../actions/User";
import {removeErrorData} from "../../../actions/RemoveError";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;


const DeleteModal = (props) => {
  const { deleteRole, name, id } = props;
  const [regionBtn, setRegionBtn] = useState(false);
  const [regionUserBtn, setRegionUserBtn] = useState(false);
  const [woredaUserBtn, setWoredaUserBtn] = useState(false);
  const [woredaBtn, setWoredaBtn] = useState(false);
  const [schoolBtn, setSchoolBtn] = useState(false);
  const [schooluserBtn, setSchooluserBtn] = useState(false);
  const [federalsUserBtn, setFederalsUserBtn] = useState(false);
  const [userBtn, setUserBtn] = useState(false);
  const [modalName,setName] = useState("")
  const [Loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");

  const dispatch = useDispatch();


  const deleteSchool = useSelector((state) => state.schoolData.deleteSchool);
  const deleteUserSchool = useSelector(
    (state) => state.schoolData.deleteUserSchool
  );
  const deleteWoredaUserData = useSelector(
    (state) => state.woredaData.deleteWoredaUserData
  );
  const deleteworeda = useSelector((state) => state.woredaData.deleteworeda);
  const getSingleDeleteForRegion = useSelector(
    (state) => state.regionData.getSingleDeleteForRegion
  );
  const deleteRegionData = useSelector(
    (state) => state.regionData.deleteRegionData
  );
  const deletefederaluserdata = useSelector(
    (state) => state.federalData.deletefederaluserdata
  );
  const deleteUserData = useSelector(
    (state) => state.usersData.deleteUserData
  );

  const error = useSelector(
    (state) => state.error.errorsData
  );

  const federalDatas = useSelector((state) => state.federalData.federalData);
  // get federal single id
  var FederalId = federalDatas && federalDatas.results && federalDatas.results[0] && federalDatas.results[0].id


  // Toaster
  const notify = () => {
    toast.success("Deleted successfully");
  };

  // Toaster
  const notifyerror = () => {
    toast.error(" Not able to delete");
  };

  useEffect(() => {
      if (deleteSchool.status === 204 && schoolBtn === true && name === "school") {
        props.closeModal();
        setLoading(false)
        notify();
        setSchoolBtn(false);
        setName("");
      }
      else if (deleteUserSchool.status === 204 && schooluserBtn === true && deleteRole === "schoolUser") {
        props.closeModal();
        setLoading(false)
        notify();
        setSchooluserBtn(false);
        setName("");
      }
      else if (deleteWoredaUserData.status === 204 && woredaUserBtn === true && deleteRole === "woredauser") {
        props.closeModal();
        setLoading(false)
        notify();
        setWoredaUserBtn(false);
        setName("");
      }
      else if (deleteworeda.status === 204 && woredaBtn === true && name === "woreda") {
        props.closeModal();
        setLoading(false)
        notify();
        setWoredaBtn(false);
        setName("");
      }
      else if ( deleteRegionData.status === 204 && regionBtn === true && name === "region") {
        props.closeModal();
        setLoading(false)
        notify();
        setRegionBtn(false);
        setName("");
      }
      else if (getSingleDeleteForRegion && getSingleDeleteForRegion.status === 204 && regionUserBtn === true && deleteRole === "regionUser") {
        props.closeModal();
        setLoading(false)
        notify();
        setRegionUserBtn(false);
        setName("");
      }
      else if (deletefederaluserdata && deletefederaluserdata.status === 204 && federalsUserBtn === true && deleteRole === "federalsUser") {
        props.closeModal();
        setLoading(false)
        notify();
        setFederalsUserBtn(false);
        setName("");
      }
      else if (deleteUserData && deleteUserData.status === 204 && userBtn === true && deleteRole === "singleUser") {
        props.closeModal();
        setLoading(false)
        notify();
        setUserBtn(false);
        setName("");
      }
    else{
      if(error.status === 500 && modalName === "users" && (regionBtn || regionUserBtn || woredaUserBtn || woredaBtn || schoolBtn || schooluserBtn || federalsUserBtn || userBtn)){
        props.closeModal();
        setLoading(false)
        notifyerror();
        setUserBtn(false);
        setName("");
      }
    }

  }, [
    deleteSchool,
    deleteUserSchool,
    deleteWoredaUserData,
    deleteworeda,
    deleteRegionData,
    getSingleDeleteForRegion,
    deletefederaluserdata,
    deleteUserData,
    error
  ]);

  // delete single data
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(removeErrorData)
    if (name === "region") {
      setLoading(true)
      dispatch(DeleteRegionData(id));
      setRegionBtn(true);
      setName('users');
    } else if (name === "woreda") {
      setLoading(true)
      dispatch(deleteWoredaData(id));
      setWoredaBtn(true);
      setName('users');
    } else if (name === "school") {
      setLoading(true)
      dispatch(deleteSchoolData(id));
      setSchoolBtn(true);
      setName('users');
    } else if (deleteRole === "schoolUser") {
      setLoading(true)
      dispatch(deleteSchoolUser(id));
      setSchooluserBtn(true);
      setName('users');
    } else if (deleteRole === "woredauser") {
      setLoading(true)
      dispatch(deleteWoredaUser(id));
      setWoredaUserBtn(true);
      setName('users');
    } else if (deleteRole === "regionUser") {
      setLoading(true)
      dispatch(singleDeleteForRegionUser(id));
      setRegionUserBtn(true);
      setName('users');
    }
    else if (deleteRole === "federalsUser") {
      setLoading(true)
      dispatch(deleteSingleUserData(id,FederalId));
      setFederalsUserBtn(true);
      setName('users');
    }
    else if (deleteRole === "singleUser") {
      setLoading(true)
      dispatch(getDeleteUser(id));
      setUserBtn(true);
      setName('users');
    }
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
              Do you want to delete this {props.name} ? All information about
              this {props.name} will be lost
            </p>
            <div className="confirm-cta">
              { Loading ?
                <div class="spinner-border" role="status"></div>
                :
                  <Link
                    onClick={(e) => {
                      handleDelete(e);
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
export default DeleteModal;
