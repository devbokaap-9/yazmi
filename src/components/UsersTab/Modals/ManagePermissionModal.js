import React,{useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { getPermissions } from "../../../actions/Role";
import { useDispatch, useSelector } from "react-redux";
import {custom_federal_data_created,custom_federal_data_delete,custom_federal_data_edit,custom_federal_data_get,custom_federal_data_all,custom_federal_operation_download,custom_federal_operation_upload,custom_federal_operation_suspend,custom_region_data_created,custom_region_data_delete,custom_region_data_edit,custom_region_data_get,custom_region_data_all,custom_region_operation_download,custom_region_operation_upload,custom_region_operation_suspend,custom_woreda_data_created,custom_woreda_data_delete,custom_woreda_data_edit,custom_woreda_data_get,custom_woreda_data_all,custom_woreda_operation_download,custom_woreda_operation_upload,custom_woreda_operation_suspend,custom_school_data_created,custom_school_data_delete,custom_school_data_edit,custom_school_data_get,custom_school_data_all,custom_school_operation_download,custom_school_operation_upload,custom_school_operation_suspend} from "../../../Constants";
import * as yup from "yup";
import { Formik, Form,  Field, ErrorMessage } from "formik";
import ReactTags from 'react-tag-autocomplete'
import {searchUsersData, addUserData} from "../../../actions/User";
import {removeErrorData} from "../../../actions/RemoveError";
import { toast } from 'react-toastify';

const ManagePermissionModal = (props) => {
    const [btnClickFlag,setBtnClickFlag] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [userArray,setUserArray] = useState([]);
    const [userPermissions,setUserPermissions] = useState([]);
    const reactTags = useRef();
    const [tags, setTags] = useState([]);
    const [suggestions,setSuggestions] = useState([]);
    // const [permissionData,setPermissionData] = useState([]);
    const [errorFlag,setErrorFlag] = useState(false)

    const validationSchema = yup.object({
      profile: yup.string().required("Cannot be blank"),
    });

    // validation error
    const { error } = useSelector((state) => state);

    const searchedUsersData  = useSelector((state) => state.usersData.searchedUserData.results);

    const { federalData } = useSelector((state) => state.federalData);
    var { count, results } = federalData;
    // get federal single id
    var FederalId = results && results[0].id

    const invitedData = useSelector((state) => (window.location.href.includes("federal")) ? state.federalData.singleInvitedFederalUserData : (window.location.href.includes("regions")) ? state.regionData.singleInvitedRegionUsers : (window.location.href.includes("woreda")) ? state.woredaData.woredaInvitedUsersData : (window.location.href.includes("schools")) ? state.schoolData.schoolInvitedUsersData : "" );
    // console.log(invitedData,'invited')
    // console.log(suggestions,'suggestion')
    // console.log(tags,'tag')

    const handleDelete = (index) => {
      const newTags = tags.slice(0);
      newTags.splice(index, 1);
      setTags(newTags);
      setErrorFlag(false)
    };

    const handleAddition = (tag) => {
      if(tag['id'] !== undefined){
        const newTags = [].concat(tags, tag);
        setTags(newTags);
        setErrorFlag(false)
      }
    };

    const handleInput = (tag) => {
      if(tag.length >= 1){
        // console.log(tag,'taggg')
        dispatch(searchUsersData(tag))
      }
    }

    let dispatch = useDispatch();
      
    useEffect(()=>{
      dispatch(getPermissions());
    },[]);

    useEffect(()=>{
      let suggestionArray = [];
      if(searchedUsersData){
        searchedUsersData.map(function(value,key){
          suggestionArray.push({'id':value['id'],'name':value['first_name']+' ('+value['username']+')'})
        })
        setSuggestions(suggestionArray)
      }
    },[searchedUsersData])

    const formRef = useRef();
    const permissionData = useSelector((state) => state.rolesData.permissionData);

    const permissionChange = (name,id,codename,data) => {
      // if(name === "user"){
      //   let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_get)
      //   let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_created)
      //   let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_delete)
      //   let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_edit)
      //   let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_all)
      //   let index = formRef.current.values.userData.indexOf(id);
      //   if(index !== -1){//check id is in array or not , if already present then remove else add
      //     formRef.current.values.userData.splice(index, 1);
      //   }
      //   else{
      //     formRef.current.values.userData.push(id)
      //   }
      //   let viewIndex = formRef.current.values.userData.indexOf(viewId[0]['id']);
      //   let createIndex = formRef.current.values.userData.indexOf(createId[0]['id']);
      //   let deleteIndex = formRef.current.values.userData.indexOf(deleteId[0]['id']);
      //   let editIndex = formRef.current.values.userData.indexOf(editId[0]['id']);
      //   let allIndex = formRef.current.values.userData.indexOf(allId[0]['id']);
      //   //if all is checked
      //   if(codename === custom_user_data_all){
      //     if(index !== -1){
      //       let indexArray = []
      //       indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
      //       indexArray.sort()
      //       console.log(indexArray,'array')
      //       for (var i = indexArray.length -1; i >= 0; i--){
      //         formRef.current.values.userData.splice(indexArray[i],1);
      //       }
      //     }else{
      //       if(createIndex === -1){
      //         formRef.current.values.userData.push(createId[0]['id'])
      //       }
      //       if(viewIndex === -1){
      //         formRef.current.values.userData.push(viewId[0]['id'])
      //       }
      //       if(deleteIndex === -1){
      //         formRef.current.values.userData.push(deleteId[0]['id'])
      //       }
      //       if(editIndex === -1){
      //         formRef.current.values.userData.push(editId[0]['id'])
      //       }
      //     }
      //   }
      //   //if create/edit/delete/get checked then default all is checked
      //   if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
          
      //     if(index !== -1 && codename !== custom_user_operation_download && codename !== custom_user_operation_share && codename !== custom_user_operation_suspend){
      //       // formRef.current.values.userData.splice(allIndex,1)
      //     }
      //     else{
      //       if(allIndex === -1){
      //         formRef.current.values.userData.push(allId[0]['id'])
      //       }
      //     }
      //   }
      //   else{
      //     if(codename !== custom_user_data_all && allIndex !== -1){
      //       formRef.current.values.userData.splice(allIndex, 1);
      //     }
      //   }
      //   //check create/edit/delete/share/suspend/download checked then get will be checked default
      //   if((codename === custom_user_data_created || codename === custom_user_data_delete || codename === custom_user_data_edit || codename === custom_user_operation_download || codename === custom_user_operation_share || codename === custom_user_operation_suspend) && (allIndex === -1)){
      //     //if create/edit/delete/share/suspend/download id is in array then only add view id 
      //     if(viewIndex === -1 && index === -1){
      //       formRef.current.values.userData.push(viewId[0]['id'])
      //       if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
      //         if(allIndex === -1){
      //           formRef.current.values.userData.push(allId[0]['id'])
      //         }
      //       }
      //     }
      //   }
      //   setUserArray([])
      //   setUserPermissions(formRef.current.values.userData)
      // }
      if(name === "federal"){
        let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_get)
        let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_created)
        let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_delete)
        let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_edit)
        let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_all)
        let index = formRef.current.values.userData.indexOf(id);
        if(index !== -1){//check id is in array or not , if already present then remove else add
          formRef.current.values.userData.splice(index, 1);
        }
        else{
          formRef.current.values.userData.push(id)
        }
        let viewIndex = formRef.current.values.userData.indexOf(viewId[0]['id']);
        let createIndex = formRef.current.values.userData.indexOf(createId[0]['id']);
        let deleteIndex = formRef.current.values.userData.indexOf(deleteId[0]['id']);
        let editIndex = formRef.current.values.userData.indexOf(editId[0]['id']);
        let allIndex = formRef.current.values.userData.indexOf(allId[0]['id']);
        //if all is checked
        if(codename === custom_federal_data_all){
          // console.log(1)
          if(index !== -1){
            // console.log(2)
            let indexArray = []
            indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
            indexArray.sort()
            // console.log(indexArray,'array')
            for (var i = indexArray.length -1; i >= 0; i--){
              formRef.current.values.userData.splice(indexArray[i],1);
            }
          }else{
            // console.log(3)
            if(createIndex === -1){
              formRef.current.values.userData.push(createId[0]['id'])
            }
            if(viewIndex === -1){
              formRef.current.values.userData.push(viewId[0]['id'])
            }
            if(deleteIndex === -1){
              formRef.current.values.userData.push(deleteId[0]['id'])
            }
            if(editIndex === -1){
              formRef.current.values.userData.push(editId[0]['id'])
            }
          }
        }
        //if create/edit/delete/get checked then default all is checked
        if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        //  console.log(4)
          if(index !== -1 && codename !== custom_federal_operation_download && codename !== custom_federal_operation_upload && codename !== custom_federal_operation_suspend){
            // console.log(5)
            // formRef.current.values.userData.splice(allIndex,1)
          }
          else{
            // console.log(6)
            if(allIndex === -1){
              // console.log(7)
              formRef.current.values.userData.push(allId[0]['id'])
            }
          }
        }
        else{
          // console.log(8)
          if(codename !== custom_federal_data_all && allIndex !== -1){
            // console.log(9)
            formRef.current.values.userData.splice(allIndex, 1);
          }
        }
        //check create/edit/delete/share/suspend/download checked then get will be checked default
        if((codename === custom_federal_data_created || codename === custom_federal_data_delete || codename === custom_federal_data_edit || codename === custom_federal_operation_download || codename === custom_federal_operation_upload || codename === custom_federal_operation_suspend) && (allIndex === -1)){
          // console.log(10)
          //if create/edit/delete/share/suspend/download id is in array then only add view id 
          if(viewIndex === -1 && index === -1){
            // console.log(11)
            formRef.current.values.userData.push(viewId[0]['id'])
            
  
            if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
              if(allIndex === -1){
                formRef.current.values.userData.push(allId[0]['id'])
              }
            }
          }
        }
        setUserArray([])
        setUserPermissions(formRef.current.values.userData)
      }
      if(name === "region"){
        let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_get)
        let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_created)
        let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_delete)
        let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_edit)
        let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_all)
        let index = formRef.current.values.userData.indexOf(id);
        if(index !== -1){//check id is in array or not , if already present then remove else add
          formRef.current.values.userData.splice(index, 1);
        }
        else{
          formRef.current.values.userData.push(id)
        }
        let viewIndex = formRef.current.values.userData.indexOf(viewId[0]['id']);
        let createIndex = formRef.current.values.userData.indexOf(createId[0]['id']);
        let deleteIndex = formRef.current.values.userData.indexOf(deleteId[0]['id']);
        let editIndex = formRef.current.values.userData.indexOf(editId[0]['id']);
        let allIndex = formRef.current.values.userData.indexOf(allId[0]['id']);
        //if all is checked
        if(codename === custom_region_data_all){
          // console.log(1)
          if(index !== -1){
            // console.log(2)
            let indexArray = []
            indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
            indexArray.sort()
            // console.log(indexArray,'array')
            for (var i = indexArray.length -1; i >= 0; i--){
              formRef.current.values.userData.splice(indexArray[i],1);
            }
          }else{
            // console.log(3)
            if(createIndex === -1){
              formRef.current.values.userData.push(createId[0]['id'])
            }
            if(viewIndex === -1){
              formRef.current.values.userData.push(viewId[0]['id'])
            }
            if(deleteIndex === -1){
              formRef.current.values.userData.push(deleteId[0]['id'])
            }
            if(editIndex === -1){
              formRef.current.values.userData.push(editId[0]['id'])
            }
          }
        }
        //if create/edit/delete/get checked then default all is checked
        if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        //  console.log(4)
          if(index !== -1 && codename !== custom_region_operation_download && codename !== custom_region_operation_upload && codename !== custom_region_operation_suspend){
            // console.log(5)
            // formRef.current.values.userData.splice(allIndex,1)
          }
          else{
            // console.log(6)
            if(allIndex === -1){
              // console.log(7)
              formRef.current.values.userData.push(allId[0]['id'])
            }
          }
        }
        else{
          // console.log(8)
          if(codename !== custom_region_data_all && allIndex !== -1){
            // console.log(9)
            formRef.current.values.userData.splice(allIndex, 1);
          }
        }
        //check create/edit/delete/share/suspend/download checked then get will be checked default
        if((codename === custom_region_data_created || codename === custom_region_data_delete || codename === custom_region_data_edit || codename === custom_region_operation_download || codename === custom_region_operation_upload || codename === custom_region_operation_suspend) && (allIndex === -1)){
          // console.log(10)
          //if create/edit/delete/share/suspend/download id is in array then only add view id 
          if(viewIndex === -1 && index === -1){
            // console.log(11)
            formRef.current.values.userData.push(viewId[0]['id'])
            
  
            if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
              if(allIndex === -1){
                formRef.current.values.userData.push(allId[0]['id'])
              }
            }
          }
        }
        setUserArray([])
        setUserPermissions(formRef.current.values.userData)
      }
      if(name === "woreda"){
        let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_get)
        let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_created)
        let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_delete)
        let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_edit)
        let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_all)
        let index = formRef.current.values.userData.indexOf(id);
        if(index !== -1){//check id is in array or not , if already present then remove else add
          formRef.current.values.userData.splice(index, 1);
        }
        else{
          formRef.current.values.userData.push(id)
        }
        let viewIndex = formRef.current.values.userData.indexOf(viewId[0]['id']);
        let createIndex = formRef.current.values.userData.indexOf(createId[0]['id']);
        let deleteIndex = formRef.current.values.userData.indexOf(deleteId[0]['id']);
        let editIndex = formRef.current.values.userData.indexOf(editId[0]['id']);
        let allIndex = formRef.current.values.userData.indexOf(allId[0]['id']);
        //if all is checked
        if(codename === custom_woreda_data_all){
          // console.log(1)
          if(index !== -1){
            // console.log(2)
            let indexArray = []
            indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
            indexArray.sort()
            // console.log(indexArray,'array')
            for (var i = indexArray.length -1; i >= 0; i--){
              formRef.current.values.userData.splice(indexArray[i],1);
            }
          }else{
            // console.log(3)
            if(createIndex === -1){
              formRef.current.values.userData.push(createId[0]['id'])
            }
            if(viewIndex === -1){
              formRef.current.values.userData.push(viewId[0]['id'])
            }
            if(deleteIndex === -1){
              formRef.current.values.userData.push(deleteId[0]['id'])
            }
            if(editIndex === -1){
              formRef.current.values.userData.push(editId[0]['id'])
            }
          }
        }
        //if create/edit/delete/get checked then default all is checked
        if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        //  console.log(4)
          if(index !== -1 && codename !== custom_woreda_operation_download && codename !== custom_woreda_operation_upload && codename !== custom_woreda_operation_suspend){
            // console.log(5)
            // formRef.current.values.userData.splice(allIndex,1)
          }
          else{
            // console.log(6)
            if(allIndex === -1){
              // console.log(7)
              formRef.current.values.userData.push(allId[0]['id'])
            }
          }
        }
        else{
          // console.log(8)
          if(codename !== custom_woreda_data_all && allIndex !== -1){
            // console.log(9)
            formRef.current.values.userData.splice(allIndex, 1);
          }
        }
        //check create/edit/delete/share/suspend/download checked then get will be checked default
        if((codename === custom_woreda_data_created || codename === custom_woreda_data_delete || codename === custom_woreda_data_edit || codename === custom_woreda_operation_download || codename === custom_woreda_operation_upload || codename === custom_woreda_operation_suspend) && (allIndex === -1)){
          // console.log(10)
          //if create/edit/delete/share/suspend/download id is in array then only add view id 
          if(viewIndex === -1 && index === -1){
            // console.log(11)
            formRef.current.values.userData.push(viewId[0]['id'])
            
  
            if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
              if(allIndex === -1){
                formRef.current.values.userData.push(allId[0]['id'])
              }
            }
          }
        }
        setUserArray([])
        setUserPermissions(formRef.current.values.userData)
      }
      if(name === "school"){
        let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_get)
        let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_created)
        let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_delete)
        let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_edit)
        let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_all)
        let index = formRef.current.values.userData.indexOf(id);
        if(index !== -1){//check id is in array or not , if already present then remove else add
          formRef.current.values.userData.splice(index, 1);
        }
        else{
          formRef.current.values.userData.push(id)
        }
        let viewIndex = formRef.current.values.userData.indexOf(viewId[0]['id']);
        let createIndex = formRef.current.values.userData.indexOf(createId[0]['id']);
        let deleteIndex = formRef.current.values.userData.indexOf(deleteId[0]['id']);
        let editIndex = formRef.current.values.userData.indexOf(editId[0]['id']);
        let allIndex = formRef.current.values.userData.indexOf(allId[0]['id']);
        //if all is checked
        if(codename === custom_school_data_all){
          // console.log(1)
          if(index !== -1){
            // console.log(2)
            let indexArray = []
            indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
            indexArray.sort()
            // console.log(indexArray,'array')
            for (var i = indexArray.length -1; i >= 0; i--){
              formRef.current.values.userData.splice(indexArray[i],1);
            }
          }else{
            // console.log(3)
            if(createIndex === -1){
              formRef.current.values.userData.push(createId[0]['id'])
            }
            if(viewIndex === -1){
              formRef.current.values.userData.push(viewId[0]['id'])
            }
            if(deleteIndex === -1){
              formRef.current.values.userData.push(deleteId[0]['id'])
            }
            if(editIndex === -1){
              formRef.current.values.userData.push(editId[0]['id'])
            }
          }
        }
        //if create/edit/delete/get checked then default all is checked
        if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        //  console.log(4)
          if(index !== -1 && codename !== custom_school_operation_download && codename !== custom_school_operation_upload && codename !== custom_school_operation_suspend){
            // console.log(5)
            // formRef.current.values.userData.splice(allIndex,1)
          }
          else{
            // console.log(6)
            if(allIndex === -1){
              // console.log(7)
              formRef.current.values.userData.push(allId[0]['id'])
            }
          }
        }
        else{
          // console.log(8)
          if(codename !== custom_school_data_all && allIndex !== -1){
            // console.log(9)
            formRef.current.values.userData.splice(allIndex, 1);
          }
        }
        //check create/edit/delete/share/suspend/download checked then get will be checked default
        if((codename === custom_school_data_created || codename === custom_school_data_delete || codename === custom_school_data_edit || codename === custom_school_operation_download || codename === custom_school_operation_upload || codename === custom_school_operation_suspend) && (allIndex === -1)){
          // console.log(10)
          //if create/edit/delete/share/suspend/download id is in array then only add view id 
          if(viewIndex === -1 && index === -1){
            // console.log(11)
            formRef.current.values.userData.push(viewId[0]['id'])
            
  
            if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
              if(allIndex === -1){
                formRef.current.values.userData.push(allId[0]['id'])
              }
            }
          }
        }
        setUserArray([])
        setUserPermissions(formRef.current.values.userData)
      }
    }

    const handleSubmit = () => {
      dispatch(removeErrorData())
      // console.log(userPermissions,'permission')
      // console.log(tags,'tag')
      if(userPermissions.length > 0 && tags.length > 0){
        setBtnClickFlag(true)
        setLoading(true);

        let paramName = window.location.href.split('/').slice(-2)[0]
        let federalParamName = window.location.href.split('/').slice(-1)[0]
        let save_data = []
        tags.map(function(value,key){
          let data = {
            "membership" : "INVITED",
            "profile" : value['id'],
            "permissions" : userPermissions,
          }
          if(federalParamName === "federal"){
            paramName = 'federals'
            save_data.push({...data,...{"federal" : FederalId}})
          }
          else{
            let id = window.location.href.split('/').slice(-1)[0]
            if(id !== undefined && id !== 'undefined'){
              if(paramName === "regions"){
                save_data.push({...data,...{"region" : id}})
              }
              else if(paramName === "woreda"){
                paramName = "woredas"
                save_data.push({...data,...{"woreda" : id}})
              }
              else if(paramName === "schools"){
                save_data.push({...data,...{"school" : id}})
              }
            }
          }

        })
        setErrorFlag(false)
        if(federalParamName === "federal"){
          dispatch(addUserData(save_data,FederalId,paramName));
        }
        else{
          let id = window.location.href.split('/').slice(-1)[0]
          if(id !== undefined && id !== 'undefined'){
            dispatch(addUserData(save_data,id,paramName));
          }
        }
      }
      else{
        if(!errorFlag){
          setErrorFlag(true)
          if(tags.length === 0){
            toast.error('Select Name')
          }
          else if(userPermissions.length === 0){
            toast.error('Select Permission')
          }
        }
      }
    }

    const userResData = useSelector(
      (state) =>state.usersData.addUserData
    );
      
    useEffect( () => {
      //if success then only execute
      let paramName = window.location.href.split('/').slice(-2)[0]
      let federalParamName = window.location.href.split('/').slice(-1)[0]
      let id = window.location.href.split('/').slice(-1)[0]
      if (userResData && userResData[0].profile && props.show && btnClickFlag && error.errorsData === '') {
        props.closeModal();
        setBtnClickFlag(false)
        setLoading(false);
        setTags([])
        setSuggestions([])
        setErrorFlag(false)
        toast.success('Permission Added')
        // if(paramName === "schools"){
        //   toast.success('School User Added');
        //   dispatch(schoolUserData(id));
        // }
        // else if(paramName === "woreda"){
        //   toast.success('Woreda User Added');
        //   dispatch(getWoredaUser(id));
        // }
        // else if(paramName === "regions"){
        //   toast.success('Region User Added');
        //   dispatch(getSingleRegionUser(id));
        // }
        // else if(federalParamName === "federal"){
        //   toast.success('Federal User Added');
        //   dispatch(getSingleFederalData(FEDERAL_ID));
        // }
      }
    },[userResData])

    useEffect( () => {
      if(error && error.errorsData && btnClickFlag){
        setLoading(false);
        if(error.errorsData.non_field_errors){
          toast.error(error.errorsData.non_field_errors[0])
        }
        else{
          toast.error('Something went Wrong, pls try again!')
        }
      }
    },[error])

    return (
        <>
            <Modal show={props.show} onHide={()=>{props.closeModal();setTags([]);setLoading(false);setErrorFlag(false)}} className="create_new_role manage_permission_modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                    <h3>Manage Permissions</h3>
                    <Link className="close-modal-header" onClick={()=>{props.closeModal();setTags([]);setLoading(false);setErrorFlag(false)}}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" /></Link>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={{
                        profile: "",userData:userArray
                    }}
                    validationSchema={validationSchema}
                    innerRef={formRef}
                    >
                    {({ values, handleChange }) => {
                        return (
                            <Form>
                              <div className="modal-form-wrapper manage-permissions-wrapper share_form">
                                  <div className="uf-single enter-federal">
                                      <div className="uf-label">User Name</div>
                                      <div className="uf-field react__tag_div">
                                      {/* <input
                                          type="text"
                                          className="input-yazmi"
                                          placeholder="Enter User Name or User Group"
                                      /> */}
                                      <ReactTags
                                        ref={reactTags}
                                        tags={tags}
                                        suggestions={suggestions}
                                        allowNew
                                        onDelete={handleDelete}
                                        onAddition={handleAddition}
                                        onInput={handleInput}
                                        placeholderText="enter your name"
                                      />
                                      </div>
                                  </div>
                                  <div >
                                      <div className="uf-label">Select Access Type</div>
                                          <div className="row">
                                                          
                                                         
                                                       
                                            {permissionData &&
                                                permissionData.map((data) => {
                                                    return(
                                                    (data.appname === "federal" && window.location.href.includes("federal"))
                                                    ?
                                                        <>
                                                        {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                                        data.permissions[0].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox"  aria-label="option 1"name="userData[]"  onChange={()=>{permissionChange('federal',subdata.id,subdata.codename,data)}}  
                                                                    checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}
                                                                    />
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            
                                                            )
                                                          })}
                                                          </ul>
                                                          </div>}
                                          
                                                       
                                                          {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                                        data.permissions[1].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox" name="userData[]"  onChange={()=>{permissionChange('federal',subdata.id,subdata.codename,data)}}  checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}/>
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                        
                                                        </>
                                                       
                                                    :
                                                    (data.appname === "region" && window.location.href.includes("regions"))
                                                    ?
                                                        <>
                                                         {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                                        data.permissions[0].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox"  aria-label="option 1"name="userData[]"  onChange={()=>{permissionChange('region',subdata.id,subdata.codename,data)}}  
                                                                    checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}
                                                                    />
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                          {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                                        data.permissions[1].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox" name="userData[]"  onChange={()=>{permissionChange('region',subdata.id,subdata.codename,data)}}  checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}/>
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                        </>
                                                    :
                                                    (data.appname === "woreda" && window.location.href.includes("woreda"))
                                                    ?
                                                        <>
                                                        {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                                        data.permissions[0].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox"  aria-label="option 1"name="userData[]"  onChange={()=>{permissionChange('woreda',subdata.id,subdata.codename,data)}}  
                                                                    checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}
                                                                    />
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                          {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                                        data.permissions[1].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox" name="userData[]"  onChange={()=>{permissionChange('woreda',subdata.id,subdata.codename,data)}}  checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}/>
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                        </>
                                                    :
                                                    (data.appname === "school" && window.location.href.includes("schools"))
                                                    ?
                                                        <>
                                                        {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                                        data.permissions[0].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox"  aria-label="option 1"name="userData[]"  onChange={()=>{permissionChange('school',subdata.id,subdata.codename,data)}}  
                                                                    checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}
                                                                    />
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                          {
                                                         <div className="actions_div">
                                                    <ul>
                                                        {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                                        data.permissions[1].permissions.map((subdata) => {
                                                            return(
                                                              <li>
                                                                <div className="checkbox_div">
                                                                    <label className="container-radio">
                                                                    {(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}
                                                                    <Field type="checkbox" name="userData[]"  onChange={()=>{permissionChange('school',subdata.id,subdata.codename,data)}}  checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}/>
                                                                    <span className="checkmark-radio"></span>
                                                                    </label>
                                                                </div>
                                                                </li>
                                                            )
                                                        })}
                                                        </ul>
                                                          </div>}
                                                        </>
                                                    :
                                                        <></>
                                                    )
                                                }
                                                
                                                )}
                                                
                                              </div> 
                                      </div>
                                      <div className="shared-with-wrapper">
                                          <div className="sw-single">
                                              <div className="sw-left sw-title">Shared with</div>
                                              <div className="sw-right sw-title">Rights</div>
                                          </div>
                                          {invitedData && invitedData.results && invitedData.results.map((data) => {
                                            return(
                                              <div className="sw-single">
                                                <div className="sw-left">{data.profile.fullname}</div>
                                                <div className="sw-right">
                                                  {
                                                    data.permissions && data.permissions.map((permissionData,key) => {
                                                      return(
                                                        <>
                                                          {
                                                            ((key === 0) ? permissionData.name : " , "+permissionData.name) }
                                                        </>
                                                      )
                                                    })
                                                  }  
                                                </div>
                                              </div>
                                            )
                                          })}
                                      </div>
                                      <div className="modal-form-cta">
                                          <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false} onClick={handleSubmit}>Save</button>
                                          <button className="btn-secondary-yazmi" onClick={()=>{props.closeModal();setTags([]);setLoading(false);setErrorFlag(false)}}>Cancel</button>
                                      </div>
                                  </div>
                              </Form>
                            )
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
};
export default ManagePermissionModal;
