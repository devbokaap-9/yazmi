import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {logoutAPI} from "../../../actions/Auth";
import { updateSingleUser } from "../../../actions/User";
import { getProfileDetails } from "../../../actions/Auth";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import checkPermission from "../../../utils/CheckPermission";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const ConfirmModal = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setstate] = useState(false)
    const [loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");

    let getid = ""
    let token = ""
    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    if(user_data){
        getid = user_data.profile_id
        token = user_data.key
    }

    const redirectRoute = () => {
        if(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload')){
            history.push("/users")
        }
        else if(checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend')){
            history.push("/federal")
        }
        else if(checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend')){
            history.push("/regions")
        }
        else if(checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend')){
            history.push("/woreda")
        }
        else if(checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend')){
            history.push("/schools")
        }
        else if(checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share')){
            history.push("/form")
        }
        else if(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')){
            history.push("/contents")
        }
        else if(checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share')){
            history.push("/roles")
        }
    }

    const logout = () => {
        if(props.confirmtextValue === 'logout'){
            if(state){
                let data = {}
                data.dont_ask_again_login = true
                setLoading(true)
                props.closeModal();
                dispatch(updateSingleUser(getid,data))
            }
            else{
                dispatch(logoutAPI());
            }
        }
        else if(props.confirmtextValue === 'login'){
            props.closeModal();
            let data = {}
            data.last_logged_in_as = props.roleType
            let last_log_in_as = {
                last_logged_in_as : props.roleType
            }
            localStorage.setItem('last_log_in_as',encodeURIComponent(JSON.stringify(last_log_in_as)))
            if(state){
                data.dont_ask_again_role = true
                setLoading(true)
            }
            else{
                if(props.roleType === "admin"){
                    // history.push("/users")
                    redirectRoute();
                }
                else if(props.roleType === "learner"){
                    history.push("/student")
                }
            }
            dispatch(updateSingleUser(getid,data))
        }
    }

    const responseUpdateUser = useSelector((state) => state.usersData.updateSingleUser);

    useEffect(() => {
        if(responseUpdateUser.status === 200 && loading && props.confirmtextValue === 'logout'){
            dispatch(logoutAPI());
        }
        else if(responseUpdateUser.status === 200 && loading && props.confirmtextValue === 'login'){
            setLoading(false)
            dispatch(getProfileDetails(token))
            // dispatch(getSingleUser(getid))
            props.closeModal();
            if(props.roleType === "admin"){
                // history.push("/users")
                redirectRoute();
            }
            else if(props.roleType === "learner"){
            history.push("/student")
            }
        }
    }, [responseUpdateUser])

    return (
        <>
            <Modal show={props.show} onHide={props.closeModal} className="confirmModal">
                <Modal.Body>
                    <div className="confirm-modal-wrapper">
                        <div className="cm-title">
                            <div className="cm-title-text text-center">CONFIRM</div>
                            <div className="cm-title-close">
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
                        <p className="cm-content">{(props.confirmtextValue === 'logout') ?"Do you want to logout?" : (props.roleType === "learner") ? "Do you want to leave this page and login as a student" : "Do you want to leave this page and login as a admin"}</p>
                        <label className="container-checkbox">
                            Don't ask me again
                            <input type="checkbox" onChange={()=> {if(state){setstate(false)}else{setstate(true)}}} />
                            <span className="checkmark-checkbox"></span>
                        </label>
                        <div className="confirm-cta">
                            <Link onClick={logout}>
                                Yes
                            </Link>
                            <Link onClick={props.closeModal}>
                                No
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
    );
};
export default ConfirmModal;
