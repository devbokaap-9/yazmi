import React, { useEffect, useState,useContext } from "react";
import { Link, useParams , useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {removeErrorData} from "../../../actions/RemoveError";
import {bulkAction, entityBulkDelete} from "../../../actions/User";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {UserContext} from "../../../UserContext";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const DeleteAllModal = (props) => {
    const dispatch = useDispatch();
    let userContext = useContext(UserContext)
    let location = useLocation()

    const [Loading,setLoading] = useState(false)
    let [color, setColor] = useState("#ffffff");

    let param = useParams();

    // Toaster
    const notify = () => {
    toast.success("Deleted successfully");
    };

    // Toaster
    // const notifyerror = () => {
    // toast.error(" Not able to delete");
    // };


    const usersData  = useSelector((state) => (window.location.href.includes('federal')) ? state.federalData && state.federalData.singlefederal : (window.location.href.includes('regions')) ? state.regionData.getSingleRegionUserData : (window.location.href.includes('woreda')) ? state.woredaData.getWoredaUser : (window.location.href.includes('schools')) ? state.schoolData.userSchoolData : "");

    const federalDatas = useSelector((state) => state.federalData.federalData);
    // get federal single id
    var FederalId = federalDatas && federalDatas.results && federalDatas.results[0] && federalDatas.results[0].id

    var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

    const enitiesData  = useSelector((state) => (window.location.href.includes('regions')) ? state.regionData.regionData : (window.location.href.includes('woreda')) ? state.woredaData.woredaData : (window.location.href.includes('schools')) ? state.schoolData.schoolData : "");


    const usersBulkActionRes = useSelector((state) => state.usersData.usersBulkActionRes);
   
    const error = useSelector(
        (state) => state.error.errorsData
    );

    // console.log(enitiesData,'entitiesdata')

    useEffect(() => {
        //condn added in suspend modal
        if(usersBulkActionRes && usersBulkActionRes.status === 200 && !error && error.status !== 500 && userContext.allBtn !== ''){
            setLoading(false)
            props.closeModal()
            if(props.actionName === 'deleteAll'){
                toast.success("All Users Deleted Successfully")
            }
            else if(props.actionName === 'suspendAll'){
                toast.success("All Users Suspended Successfully")
            }
            userContext.setAllBtn("")
        }
    },[usersBulkActionRes])

    const entitiesBulkDeleteRes = useSelector((state) => state.usersData.entitiesBulkDelete);

    useEffect(() => {
        //condn added in suspend modal
        if(entitiesBulkDeleteRes && entitiesBulkDeleteRes.status === 200 && !error && error.status !== 500 && userContext.allBtn !== ''){
            setLoading(false)
            props.closeModal()
            if(props.actionName === 'deleteAll'){
                toast.success("All Records Deleted Successfully")
            }
            userContext.setAllBtn("")
        }
    },[entitiesBulkDeleteRes])

    useEffect(() =>{
        if(error && error.status === 500){
            userContext.setAllBtn("")
            props.closeModal()
            if(props.actionName === 'deleteAll'){
                setLoading(false)
                toast.error("Not able to delete")
            }
            // else if(props.actionName === 'suspendAll'){
            //     toast.error("Not able to suspend")
            // }
        }
    },[error])

    let profileUsersIdArray = [];
    let entityIdArray = [];
    const handleDelete = () => {
        dispatch(removeErrorData)
        setLoading(true)
        if(window.location.href.includes("federal") || segmentCount === 2){
            let action = ""
            if(props.actionName === "deleteAll"){
                action = "delete"
            }
            else if(props.actionName === "suspendAll"){
                action = "suspend"
            }
            if(usersData && usersData.results && usersData.results.length > 0){
                usersData.results.map(function(value){
                    profileUsersIdArray.push(value.profile.id)
                })
                if(profileUsersIdArray && profileUsersIdArray.length > 0){
                    let data = {
                        'profiles' : profileUsersIdArray,
                        'action' : action
                    }
                    let url = ""
                    let id = ""
                    if(window.location.href.includes('federal')){
                        url = "federal"
                        id = FederalId
                    }
                    else{
                        id = param.id
                        if(window.location.href.includes('regions')){
                            url = "region"
                        }
                        else if(window.location.href.includes('woreda')){
                            url = "woreda"
                        }
                        else if(window.location.href.includes('schools')){
                            url = "school"
                        }
                    }
                    dispatch(bulkAction(data,url,id))
                }
            }
        }
        else{
            if((window.location.href.includes("regions") || window.location.href.includes("woreda") || window.location.href.includes("schools")) && segmentCount === 1){
                let entity = ""
                let data = ""
                if(enitiesData && enitiesData.results && enitiesData.results.length > 0){
                    enitiesData.results.map(function(value){
                        entityIdArray.push(value.id)
                    })
                }

                if(window.location.href.includes('regions')){
                    entity = "regions"
                    if(entityIdArray && entityIdArray.length > 0){
                        data = {
                            'regions' : entityIdArray
                        }
                    }
                }
                else if(window.location.href.includes('woreda')){
                    entity = "woredas"
                    if(entityIdArray && entityIdArray.length > 0){
                        data = {
                            'woredas' : entityIdArray
                        }
                    }
                }
                else if(window.location.href.includes('schools')){
                    entity = "schools"
                    if(entityIdArray && entityIdArray.length > 0){
                        data = {
                            'schools' : entityIdArray
                        }
                    }
                }
                console.log(data,'dataaaa')
                dispatch(entityBulkDelete(entity,data))
            }
        }
    }

 
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
                Do you want to {props.actionName === "deleteAll" ? "delete all" : "suspend all"}  this {(window.location.href.includes("federal") || segmentCount === 2) ? "Users" : (window.location.href.includes("regions")) ? "Regions" : (window.location.href.includes("woreda")) ? "Woredas" : (window.location.href.includes("schools")) ? "Schools" : "" } ?
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
export default DeleteAllModal;
