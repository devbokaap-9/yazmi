import React,{useState, useEffect, useRef, useContext} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import FormCheck from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik, Form,  Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createRoleData , getRolesData, getRolesDataLevelWise, getPermissions } from "../../../actions/Role";
import {removeErrorData} from "../../../actions/RemoveError";
import { toast } from 'react-toastify';
import { UserContext } from '../../../UserContext';
import {custom_user_data_all,custom_user_data_get,custom_user_data_created,custom_user_data_delete,custom_user_data_edit,custom_user_operation_download,custom_user_operation_upload,custom_user_operation_share,custom_user_operation_suspend,custom_role_data_all,custom_role_data_created,custom_role_data_delete,custom_role_data_edit,custom_role_operation_share,custom_role_data_get,custom_course_data_all,custom_course_data_created,custom_course_data_delete,custom_course_data_edit,custom_course_data_get,custom_course_operation_assign,custom_course_operation_publish,custom_resource_data_all,custom_resource_data_created,custom_resource_data_delete,custom_resource_data_edit,custom_resource_data_get,custom_resource_operation_download,custom_resource_operation_publish,custom_announcements_data_all,custom_announcements_data_created,custom_announcements_data_delete,custom_announcements_data_edit,custom_announcements_data_get,custom_announcements_operation_download,custom_announcements_operation_receive,custom_announcements_operation_send,custom_federal_data_created,custom_federal_data_delete,custom_federal_data_edit,custom_federal_data_get,custom_federal_data_all,custom_federal_operation_download,custom_federal_operation_upload,custom_federal_operation_suspend,custom_region_data_created,custom_region_data_delete,custom_region_data_edit,custom_region_data_get,custom_region_data_all,custom_region_operation_download,custom_region_operation_upload,custom_region_operation_suspend,custom_woreda_data_created,custom_woreda_data_delete,custom_woreda_data_edit,custom_woreda_data_get,custom_woreda_data_all,custom_woreda_operation_download,custom_woreda_operation_upload,custom_woreda_operation_suspend,custom_school_data_created,custom_school_data_delete,custom_school_data_edit,custom_school_data_get,custom_school_data_all,custom_school_operation_download,custom_school_operation_upload,custom_school_operation_suspend,custom_form_data_created,custom_form_data_delete,custom_form_data_edit,custom_form_data_get,custom_form_data_all,custom_form_operation_download,custom_form_operation_preview,custom_form_operation_share} from "../../../Constants";

const CreateNewRole = (props) => {
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [userArray,setUserArray] = useState([])
  const [federalArray,setFederalArray] = useState([])
  const [regionArray,setRegionArray] = useState([])
  const [woredaArray,setWoredaArray] = useState([])
  const [schoolArray,setSchoolArray] = useState([])
  const [formArray,setFormArray] = useState([])
  const [roleArray,setRoleArray] = useState([])
  const [courseArray,setCourseArray] = useState([])
  const [resourceArray,setResourceArray] = useState([])
  const [announcementArray,setAnnouncementArray] = useState([])
  const [learnerArray,setLearnerArray] = useState([])
  const [permissionError,setPermissionError] = useState(false)

  const validationSchema = yup.object({
    title: yup.string().required("Cannot be blank"),
    level: yup.string().required("Select one option"),
  });

  useEffect(()=>{
    dispatch(getPermissions());
  },[]);

  const permissionData = useSelector((state) => state.rolesData.permissionData);
  
  const permissionChange = (name,id,codename,data) => {
    setPermissionError(false)
    if(name === "user"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_get)
      // let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_created)
      // let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_delete)
      // let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_edit)
      // let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_user_data_all)
      let index = formRef.current.values.userData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.userData.splice(index, 1);
      }
      else{
        formRef.current.values.userData.push(id)
      }
      let viewIndex = formRef.current.values.userData.indexOf(viewId[0]['id']);
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if(codename === custom_user_operation_download || codename === custom_user_operation_upload){
        //if create/edit/delete/share/suspend/download id is in array then only add view id 
        if(viewIndex === -1 && index === -1){
          formRef.current.values.userData.push(viewId[0]['id'])
          
        }
      }
      setUserArray([])
    }
    if(name === "federal"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_federal_data_all)
      let index = formRef.current.values.federalData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.federalData.splice(index, 1);
      }
      else{
        formRef.current.values.federalData.push(id)
      }
      let viewIndex = formRef.current.values.federalData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.federalData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.federalData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.federalData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.federalData.indexOf(allId[0]['id']);
      //if all is checked
      if(codename === custom_federal_data_all){
        if(index !== -1){
          let indexArray = []
          indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
          indexArray.sort()
          // console.log(indexArray,'array')
          for (var i = indexArray.length -1; i >= 0; i--){
            formRef.current.values.federalData.splice(indexArray[i],1);
          }
        }else{
          if(createIndex === -1){
            formRef.current.values.federalData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.federalData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.federalData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.federalData.push(editId[0]['id'])
          }
        }
      }
      //if create/edit/delete/get checked then default all is checked
      if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
      
        if(index !== -1 && codename !== custom_federal_operation_download && codename !== custom_federal_operation_upload && codename !== custom_federal_operation_suspend){
          
          // formRef.current.values.userData.splice(allIndex,1)
        }
        else{
          if(allIndex === -1){
            formRef.current.values.federalData.push(allId[0]['id'])
          }
        }
      }
      else{
        if(codename !== custom_federal_data_all && allIndex !== -1){
          formRef.current.values.federalData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if((codename === custom_federal_data_created || codename === custom_federal_data_delete || codename === custom_federal_data_edit || codename === custom_federal_operation_download || codename === custom_federal_operation_upload || codename === custom_federal_operation_suspend) && (allIndex === -1)){
        // console.log(10)
        //if create/edit/delete/share/suspend/download id is in array then only add view id 
        if(viewIndex === -1 && index === -1){
          // console.log(11)
          formRef.current.values.federalData.push(viewId[0]['id'])
          

          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.federalData.push(allId[0]['id'])
            }
          }
        }
      }
      setFederalArray([])
    }
    if(name === "region"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_region_data_all)
      let index = formRef.current.values.regionData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.regionData.splice(index, 1);
      }
      else{
        formRef.current.values.regionData.push(id)
      }
      let viewIndex = formRef.current.values.regionData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.regionData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.regionData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.regionData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.regionData.indexOf(allId[0]['id']);
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
            formRef.current.values.regionData.splice(indexArray[i],1);
          }
        }else{
          // console.log(3)
          if(createIndex === -1){
            formRef.current.values.regionData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.regionData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.regionData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.regionData.push(editId[0]['id'])
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
            formRef.current.values.regionData.push(allId[0]['id'])
          }
        }
      }
      else{
        // console.log(8)
        if(codename !== custom_region_data_all && allIndex !== -1){
          // console.log(9)
          formRef.current.values.regionData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if((codename === custom_region_data_created || codename === custom_region_data_delete || codename === custom_region_data_edit || codename === custom_region_operation_download || codename === custom_region_operation_upload || codename === custom_region_operation_suspend) && (allIndex === -1)){
        // console.log(10)
        //if create/edit/delete/share/suspend/download id is in array then only add view id 
        if(viewIndex === -1 && index === -1){
          // console.log(11)
          formRef.current.values.regionData.push(viewId[0]['id'])
          

          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.regionData.push(allId[0]['id'])
            }
          }
        }
      }
      setRegionArray([])
    }
    if(name === "woreda"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_woreda_data_all)
      let index = formRef.current.values.woredaData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.woredaData.splice(index, 1);
      }
      else{
        formRef.current.values.woredaData.push(id)
      }
      let viewIndex = formRef.current.values.woredaData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.woredaData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.woredaData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.woredaData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.woredaData.indexOf(allId[0]['id']);
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
            formRef.current.values.woredaData.splice(indexArray[i],1);
          }
        }else{
          // console.log(3)
          if(createIndex === -1){
            formRef.current.values.woredaData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.woredaData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.woredaData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.woredaData.push(editId[0]['id'])
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
            formRef.current.values.woredaData.push(allId[0]['id'])
          }
        }
      }
      else{
        // console.log(8)
        if(codename !== custom_woreda_data_all && allIndex !== -1){
          // console.log(9)
          formRef.current.values.woredaData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if((codename === custom_woreda_data_created || codename === custom_woreda_data_delete || codename === custom_woreda_data_edit || codename === custom_woreda_operation_download || codename === custom_woreda_operation_upload || codename === custom_woreda_operation_suspend) && (allIndex === -1)){
        // console.log(10)
        //if create/edit/delete/share/suspend/download id is in array then only add view id 
        if(viewIndex === -1 && index === -1){
          // console.log(11)
          formRef.current.values.woredaData.push(viewId[0]['id'])
          

          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.woredaData.push(allId[0]['id'])
            }
          }
        }
      }
      setWoredaArray([])
    }
    if(name === "school"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_school_data_all)
      let index = formRef.current.values.schoolData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.schoolData.splice(index, 1);
      }
      else{
        formRef.current.values.schoolData.push(id)
      }
      let viewIndex = formRef.current.values.schoolData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.schoolData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.schoolData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.schoolData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.schoolData.indexOf(allId[0]['id']);
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
            formRef.current.values.schoolData.splice(indexArray[i],1);
          }
        }else{
          // console.log(3)
          if(createIndex === -1){
            formRef.current.values.schoolData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.schoolData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.schoolData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.schoolData.push(editId[0]['id'])
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
            formRef.current.values.schoolData.push(allId[0]['id'])
          }
        }
      }
      else{
        // console.log(8)
        if(codename !== custom_school_data_all && allIndex !== -1){
          // console.log(9)
          formRef.current.values.schoolData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if((codename === custom_school_data_created || codename === custom_school_data_delete || codename === custom_school_data_edit || codename === custom_school_operation_download || codename === custom_school_operation_upload || codename === custom_school_operation_suspend) && (allIndex === -1)){
        // console.log(10)
        //if create/edit/delete/share/suspend/download id is in array then only add view id 
        if(viewIndex === -1 && index === -1){
          // console.log(11)
          formRef.current.values.schoolData.push(viewId[0]['id'])
          

          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.schoolData.push(allId[0]['id'])
            }
          }
        }
      }
      setSchoolArray([])
    }
    if(name === "form"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_form_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_form_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_form_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_form_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_form_data_all)
      let index = formRef.current.values.formData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.formData.splice(index, 1);
      }
      else{
        formRef.current.values.formData.push(id)
      }
      let viewIndex = formRef.current.values.formData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.formData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.formData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.formData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.formData.indexOf(allId[0]['id']);
      //if all is checked
      if(codename === custom_form_data_all){
        // console.log(1)
        if(index !== -1){
          // console.log(2)
          let indexArray = []
          indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
          indexArray.sort()
          // console.log(indexArray,'array')
          for (var i = indexArray.length -1; i >= 0; i--){
            formRef.current.values.formData.splice(indexArray[i],1);
          }
        }else{
          // console.log(3)
          if(createIndex === -1){
            formRef.current.values.formData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.formData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.formData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.formData.push(editId[0]['id'])
          }
        }
      }
      //if create/edit/delete/get checked then default all is checked
      if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
      //  console.log(4)
        if(index !== -1 && codename !== custom_form_operation_download && codename !== custom_form_operation_preview && codename !== custom_form_operation_share){
          // console.log(5)
          // formRef.current.values.userData.splice(allIndex,1)
        }
        else{
          // console.log(6)
          if(allIndex === -1){
            // console.log(7)
            formRef.current.values.formData.push(allId[0]['id'])
          }
        }
      }
      else{
        // console.log(8)
        if(codename !== custom_form_data_all && allIndex !== -1){
          // console.log(9)
          formRef.current.values.formData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if((codename === custom_form_data_created || codename === custom_form_data_delete || codename === custom_form_data_edit || codename === custom_form_operation_download || codename === custom_form_operation_preview || codename === custom_form_operation_share) && (allIndex === -1)){
        // console.log(10)
        //if create/edit/delete/share/suspend/download id is in array then only add view id 
        if(viewIndex === -1 && index === -1){
          // console.log(11)
          formRef.current.values.formData.push(viewId[0]['id'])
          

          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.formData.push(allId[0]['id'])
            }
          }
        }
      }
      setFormArray([])
    }
    if(name === "role"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_role_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_role_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_role_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_role_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_role_data_all)
      let index = formRef.current.values.roleData.indexOf(id);
      if(index !== -1){
        formRef.current.values.roleData.splice(index, 1);
      }
      else{
        formRef.current.values.roleData.push(id)
      }
      let viewIndex = formRef.current.values.roleData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.roleData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.roleData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.roleData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.roleData.indexOf(allId[0]['id']);
      //if all is checked
      if(codename === custom_role_data_all){
        if(index !== -1){
          let indexArray = []
          indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
          indexArray.sort()
          for (var i = indexArray.length -1; i >= 0; i--){
            formRef.current.values.roleData.splice(indexArray[i],1);
          }
        }else{
          if(createIndex === -1){
            formRef.current.values.roleData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.roleData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.roleData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.roleData.push(editId[0]['id'])
          }
        }
      }
      //if create/edit/delete/get checked then default all is checked
      if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
       
        if(index !== -1 && codename !== custom_role_operation_share){
          // formRef.current.values.roleData.splice(allIndex,1)
        }
        else{
          if(allIndex === -1){
            formRef.current.values.roleData.push(allId[0]['id'])
          }
        }
      }
      else{
        if(codename !== custom_role_data_all && allIndex !== -1){
          formRef.current.values.roleData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share checked then get will be checked default
      if(codename === custom_role_data_created || codename === custom_role_data_delete || codename === custom_role_data_edit || codename === custom_role_operation_share){
        //if create/edit/delete/share/suspend/download id is in array then only add view id
        if(viewIndex === -1 && index === -1){
          formRef.current.values.roleData.push(viewId[0]['id'])
          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.roleData.push(allId[0]['id'])
            }
          }
        }
      }
      setRoleArray([])
    }
    if(name === "course"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_course_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_course_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_course_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_course_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_course_data_all)
      let index = formRef.current.values.courseData.indexOf(id);
      if(index !== -1){
        formRef.current.values.courseData.splice(index, 1);
      }
      else{
        formRef.current.values.courseData.push(id)
      }
      let viewIndex = formRef.current.values.courseData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.courseData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.courseData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.courseData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.courseData.indexOf(allId[0]['id']);
      //if all is checked
      if(codename === custom_course_data_all){
        if(index !== -1){
          let indexArray = []
          indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
          indexArray.sort()
          for (var i = indexArray.length -1; i >= 0; i--){
            formRef.current.values.courseData.splice(indexArray[i],1);
          }
        }else{
          if(createIndex === -1){
            formRef.current.values.courseData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.courseData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.courseData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.courseData.push(editId[0]['id'])
          }
        }
      }
      //if create/edit/delete/get checked then default all is checked
      if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        if(index !== -1 && codename !== custom_course_operation_assign && codename !== custom_course_operation_publish){
          // formRef.current.values.courseData.splice(allIndex,1)
        }
        else{
          if(allIndex === -1){
            formRef.current.values.courseData.push(allId[0]['id'])
          }
        }
      }
      else{
        if(codename !== custom_course_data_all && allIndex !== -1){
          formRef.current.values.courseData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if(codename === custom_course_data_created || codename === custom_course_data_delete || codename === custom_course_data_edit || codename === custom_course_operation_assign || codename === custom_course_operation_publish){
        //if create/edit/delete/assign/publish id is in array then only add view id
        if(viewIndex === -1 && index === -1){
          formRef.current.values.courseData.push(viewId[0]['id'])
          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.courseData.push(allId[0]['id'])
            }
          }
        }
      }
      setCourseArray([])
    }
    if(name === "resource"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_resource_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_resource_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_resource_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_resource_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_resource_data_all)
      let index = formRef.current.values.resourceData.indexOf(id);
      if(index !== -1){
        formRef.current.values.resourceData.splice(index, 1);
      }
      else{
        formRef.current.values.resourceData.push(id)
      }
      let viewIndex = formRef.current.values.resourceData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.resourceData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.resourceData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.resourceData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.resourceData.indexOf(allId[0]['id']);
      //if all is checked
      if(codename === custom_resource_data_all){
        if(index !== -1){
          let indexArray = []
          indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
          indexArray.sort()
          for (var i = indexArray.length -1; i >= 0; i--){
            formRef.current.values.resourceData.splice(indexArray[i],1);
          }
        }else{
          if(createIndex === -1){
            formRef.current.values.resourceData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.resourceData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.resourceData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.resourceData.push(editId[0]['id'])
          }
        }
      }
      //if create/edit/delete/get checked then default all is checked
      if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        if(index !== -1 && codename !== custom_resource_operation_download && codename !== custom_resource_operation_publish){
          // formRef.current.values.resourceData.splice(allIndex,1)
        }
        else{
          if(allIndex === -1){
            formRef.current.values.resourceData.push(allId[0]['id'])
          }
        }
      }
      else{
        if(codename !== custom_resource_data_all && allIndex !== -1){
          formRef.current.values.resourceData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/suspend/download checked then get will be checked default
      if(codename === custom_resource_data_created || codename === custom_resource_data_delete || codename === custom_resource_data_edit || codename === custom_resource_operation_download || codename === custom_resource_operation_publish){
        //if create/edit/delete/download/publish id is in array then only add view id else remove view id
        if(viewIndex === -1 && index === -1){
          formRef.current.values.resourceData.push(viewId[0]['id'])
          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.resourceData.push(allId[0]['id'])
            }
          }
        }
      }
      setResourceArray([])
    }
    if(name === "announcement"){
      let viewId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_announcements_data_get)
      let createId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_announcements_data_created)
      let deleteId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_announcements_data_delete)
      let editId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_announcements_data_edit)
      let allId = data && data.permissions[0].permissions.filter((data) => data.codename == custom_announcements_data_all)
      let index = formRef.current.values.announcementData.indexOf(id);
      if(index !== -1){
        formRef.current.values.announcementData.splice(index, 1);
      }
      else{
        formRef.current.values.announcementData.push(id)
      }
      let viewIndex = formRef.current.values.announcementData.indexOf(viewId[0]['id']);
      let createIndex = formRef.current.values.announcementData.indexOf(createId[0]['id']);
      let deleteIndex = formRef.current.values.announcementData.indexOf(deleteId[0]['id']);
      let editIndex = formRef.current.values.announcementData.indexOf(editId[0]['id']);
      let allIndex = formRef.current.values.announcementData.indexOf(allId[0]['id']);
      //if all is checked
      if(codename === custom_announcements_data_all){
        if(index !== -1){
          let indexArray = []
          indexArray.push(createIndex,deleteIndex,editIndex,viewIndex)
          indexArray.sort()
          for (var i = indexArray.length -1; i >= 0; i--){
            formRef.current.values.announcementData.splice(indexArray[i],1);
          }
        }else{
          if(createIndex === -1){
            formRef.current.values.announcementData.push(createId[0]['id'])
          }
          if(viewIndex === -1){
            formRef.current.values.announcementData.push(viewId[0]['id'])
          }
          if(deleteIndex === -1){
            formRef.current.values.announcementData.push(deleteId[0]['id'])
          }
          if(editIndex === -1){
            formRef.current.values.announcementData.push(editId[0]['id'])
          }
        }
      }
      //if create/edit/delete/get checked then default all is checked
      if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1 && viewIndex !== -1){
        if(index !== -1 && codename !== custom_announcements_operation_download && codename !== custom_announcements_operation_receive && codename !== custom_announcements_operation_send){
          // formRef.current.values.announcementData.splice(allIndex,1)
        }
        else{
          if(allIndex === -1){
            formRef.current.values.announcementData.push(allId[0]['id'])
          }
        }
      }
      else{
        if(codename !== custom_announcements_data_all && allIndex !== -1){
          formRef.current.values.announcementData.splice(allIndex, 1);
        }
      }
      //check create/edit/delete/share/receive/download/send checked then get will be checked default
      if(codename === custom_announcements_data_created || codename === custom_announcements_data_delete || codename === custom_announcements_data_edit || codename === custom_announcements_operation_download || codename === custom_announcements_operation_receive || codename === custom_announcements_operation_send){
        //if create/edit/delete/download/publish id is in array then only add view id
        if(viewIndex === -1 && index === -1){
          formRef.current.values.announcementData.push(viewId[0]['id'])
          if(createIndex !== -1 && editIndex !== -1 && deleteIndex !== -1){
            if(allIndex === -1){
              formRef.current.values.announcementData.push(allId[0]['id'])
            }
          }
        }
      }
      setAnnouncementArray([])
    }
    if(name === "learner"){
      let index = formRef.current.values.learnerData.indexOf(id);
      if(index !== -1){//check id is in array or not , if already present then remove else add
        formRef.current.values.learnerData.splice(index, 1);
      }
      else{
        formRef.current.values.learnerData.push(id)
      }
      setLearnerArray([])
    }
  }

  const dispatch = useDispatch()
  const userContext = useContext(UserContext);
  // validation error
  const { error } = useSelector((state) => state);

  //get data from reducer
  const createRoleDataRes = useSelector(
    (state) =>
    state.rolesData.createData
  );

  const formRef = useRef();

  const levelChange = (e) => {
    formRef.current.values.level = e.target.value 
    dispatch(getRolesDataLevelWise(e.target.value))
  }

  const rolesData = useSelector((state) => state.rolesData.levelWiseRolesData);
  var { results } = rolesData;

  let allRoles = [];
  if(results){
    results.map(function(value){
      allRoles.push({'id':value.id,'title':value.title})
      if(value.subroles.length > 0){
        value.subroles.map(function(subRoleValue){
          allRoles.push({'id':subRoleValue.id,'title':subRoleValue.title})
        })
      }
    })
  }

  const handleSubmitRole = (values) => {
    setPermissionError(false)
    if(window.location.href.includes('roles') || window.location.href.includes('role')){
    dispatch(removeErrorData())
    // if(values.userData.length !== 0 || values.roleData.length !== 0 || values.courseData.length !== 0 || values.resourceData.length !== 0 || values.announcementData.length !== 0)
    // {
    if(values.userData.length !== 0 || values.federalData.length !== 0 || values.regionData.length !== 0 || values.woredaData.length !== 0 || values.schoolData.length !== 0 || values.formData.length !== 0 || values.roleData.length !== 0 || values.courseData.length !== 0 || values.learnerData.length !== 0)
    {
      setBtnClickFlag(true)
      setLoading(true);
      // dispatch(createRoleData(values))
      // let permissions = values.userData.concat(values.roleData).concat(values.courseData).concat(values.resourceData).concat(values.announcementData);
      let permissions = values.userData.concat(values.roleData).concat(values.federalData).concat(values.regionData).concat(values.woredaData).concat(values.schoolData).concat(values.formData).concat(values.courseData).concat(values.learnerData);

      let permissionData = {
        permissions : permissions
      }
      let data = {...values,...permissionData}
      dispatch(createRoleData(data))
    }
    else{
      setPermissionError(true)
    }
  }
  }

  useEffect(() => {
    if(window.location.href.includes('roles') || window.location.href.includes('role')){
      if(createRoleDataRes.id && props.show && btnClickFlag && error.errorsData === ''){
        props.closeModal();
        setBtnClickFlag(false)
        setLoading(false);
        toast.success('Role Added')
        dispatch(getRolesData(!userContext.gByToggle));
      }
      else{
        if(error && error.errorsData && btnClickFlag){
          setLoading(false);
          if(error.errorsData.title || error.errorsData.level || error.errorsData.parent){
            setBtnClickFlag(false)
          }
        }
      }
    }
  }, [createRoleDataRes,error])

  return (
    <>
    <Modal
      show={props.show}
      onHide={props.closeModal}
      className="create_new_role"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Create New Role</h3>
          <Link
            className="close-modal-header"
            onClick={props.closeModal}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/modal-close.svg"}
              alt="close"
            />
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            title: "",level:"",parent:"",userData:userArray,federalData:federalArray,regionData:regionArray,woredaData:woredaArray,schoolData:schoolArray,formData:formArray,roleData:roleArray,courseData:courseArray,resourceData:resourceArray,announcementData:announcementArray, learnerData : learnerArray
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitRole}
          innerRef={formRef}
        >
          {({ values, handleChange }) => {
            return (
              <Form>
                <div className="body_head">
                  <div className="uf-single">
                    <div className="uf-label">Role Name</div>
                    <div className="uf-field">
                      <Field
                        name="title"
                        type="text"
                        className="input-yazmi"
                        placeholder="Role Name"
                        onChange={handleChange}
                        value={values.title}
                      />
                      {(!error.errorsData)
                        ?
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-danger error_msg"
                          />
                        :
                          <span className="text-danger error_msg">
                            {error.errorsData && error.errorsData.title
                              ? error.errorsData.title
                              : ""}
                          </span>
                        }
                    </div>
                  </div>

                  <div className="uf-single">
                    <div className="uf-label">Select Level</div>
                    <div className="uf-field">
                      <select className="search-yazmi" onChange={(e) => {levelChange(e)}} name="level">
                        <option value="">Select Level</option>
                        <option value="1">Federal</option>
                        <option value="2">Region</option>
                        <option value="3">Woreda</option>
                        <option value="4">School</option>
                      </select>
                      {(!error.errorsData)
                        ?
                          <ErrorMessage
                            name="level"
                            component="div"
                            className="text-danger error_msg"
                          />
                        :
                          <span className="text-danger error_msg">
                            {error.errorsData && error.errorsData.level
                              ? error.errorsData.level
                              : ""}
                          </span>
                        }
                    </div>
                  </div>

                  <div className="uf-single">
                    <div className="uf-label">Select Parent</div>
                    <div className="uf-field">
                      <select className="search-yazmi" onChange={handleChange} name="parent" value={values.parent}>
                        <option value="">Select Parent</option>
                        {
                          allRoles && allRoles.map((data,key) => 
                            <option value={data.id}>{data.title}</option>
                              
                          )
                        }
                      </select>
                      <span className="text-danger error_msg">
                        {error.errorsData && error.errorsData.parent
                          ? error.errorsData.parent
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="select_head">Select Actions for each role</h3>

                <div className="row">
                  <div className="col-md-3">
                    <div className="role_name_div">
                      <h4 className="invisible">Data</h4>
                      <ul>
                        <li>All User Management</li>
                      </ul>
                      <ul>
                        <li>Federal Management</li>
                      </ul>
                      <ul>
                        <li>Region Management</li>
                      </ul>
                      <ul>
                        <li>Woreda Management</li>
                      </ul>
                      <ul>
                        <li>School Management</li>
                      </ul>
                      <ul>
                        <li>Role Management</li>
                      </ul>
                      <ul>
                        <li>Form Management</li>
                      </ul>
                      <ul>
                        <li>Course Management</li>
                      </ul>
                      <ul>
                        <li>Learner Management</li>
                      </ul>
                      {/* <ul>
                        <li>Resources Management</li>
                      </ul> */}
                      {/* <ul>
                        <li>Announcement Management</li>
                      </ul> */}
                    </div>
                  </div>
                  <div className="col">
                    <div className="actions_div">
                      <h4>Data</h4>
                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "user")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="userData[]" onChange={()=>{permissionChange('user',subdata.id,subdata.codename,data)}}  checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false}/>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "federal")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="federalData[]" onChange={()=>{permissionChange('federal',subdata.id,subdata.codename,data)}}  checked={(values.federalData.length > 0 && (values.federalData.indexOf(subdata.id) != -1)) ? true : false}/>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "region")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="regionData[]" onChange={()=>{permissionChange('region',subdata.id,subdata.codename,data)}}  checked={(values.regionData.length > 0 && (values.regionData.indexOf(subdata.id) != -1)) ? true : false}/>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "woreda")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="woredaData[]" onChange={()=>{permissionChange('woreda',subdata.id,subdata.codename,data)}}  checked={(values.woredaData.length > 0 && (values.woredaData.indexOf(subdata.id) != -1)) ? true : false}/>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "school")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="schoolData[]" onChange={()=>{permissionChange('school',subdata.id,subdata.codename,data)}}  checked={(values.schoolData.length > 0 && (values.schoolData.indexOf(subdata.id) != -1)) ? true : false}/>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "role")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="roleData[]" onChange={()=>{permissionChange('role',subdata.id,subdata.codename,data)}}  checked={(values.roleData.length > 0 && (values.roleData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "form")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="formData[]" onChange={()=>{permissionChange('form',subdata.id,subdata.codename,data)}}  checked={(values.formData.length > 0 && (values.formData.indexOf(subdata.id) != -1)) ? true : false}/>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "course")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="courseData[]" onChange={()=>{permissionChange('course',subdata.id,subdata.codename,data)}}  checked={(values.courseData.length > 0 && (values.courseData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "learner")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="learnerData[]" onChange={()=>{permissionChange('learner',subdata.id,subdata.codename,data)}}  checked={(values.learnerData.length > 0 && (values.learnerData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      {/* <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "resource")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="resourceData[]" onChange={()=>{permissionChange('resource',subdata.id,subdata.codename,data)}}  checked={(values.resourceData.length > 0 && (values.resourceData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul> */}
                      {/* <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "announcements")
                              ?
                                <>
                                  {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                                  data.permissions[0].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="announcementData[]" onChange={()=>{permissionChange('announcement',subdata.id,subdata.codename,data)}}  checked={(values.announcementData.length > 0 && (values.announcementData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul> */}

                {permissionError ?
                <span className="text-danger error_msg">Select Permission
                          </span>
                          :null}

                      <div className="modal-form-cta">
                        <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                        <button
                          className="btn-secondary-yazmi"
                          onClick={props.closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="access_div">
                      <h4>Operations</h4>
                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "user")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="userData[]" onChange={()=>{permissionChange('user',subdata.id,subdata.codename,data)}}  checked={(values.userData.length > 0 && (values.userData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "federal")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="federalData[]" onChange={()=>{permissionChange('federal',subdata.id,subdata.codename,data)}}  checked={(values.federalData.length > 0 && (values.federalData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "region")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="regionData[]" onChange={()=>{permissionChange('region',subdata.id,subdata.codename,data)}}  checked={(values.regionData.length > 0 && (values.regionData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "woreda")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="woredaData[]" onChange={()=>{permissionChange('woreda',subdata.id,subdata.codename,data)}}  checked={(values.woredaData.length > 0 && (values.woredaData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "school")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="schoolData[]" onChange={()=>{permissionChange('school',subdata.id,subdata.codename,data)}}  checked={(values.schoolData.length > 0 && (values.schoolData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "form")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="formData[]" onChange={()=>{permissionChange('form',subdata.id,subdata.codename,data)}}  checked={(values.formData.length > 0 && (values.formData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "course")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="courseData[]" onChange={()=>{permissionChange('course',subdata.id,subdata.codename,data)}}  checked={(values.courseData.length > 0 && (values.courseData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul>

                      <ul>
                        <li>
                          
                        </li>
                      </ul>
                      {/* <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "learner")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="learnerData[]" onChange={()=>{permissionChange('learner',subdata.id,subdata.codename,data)}}  checked={(values.learnerData.length > 0 && (values.learnerData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul> */}
                      {/* <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "resource")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="resourceData[]" onChange={()=>{permissionChange('resource',subdata.id,subdata.codename,data)}}  checked={(values.resourceData.length > 0 && (values.resourceData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul> */}
                      {/* <ul>
                        <li>
                          {permissionData &&
                          permissionData.map((data) => {
                            return(
                              (data.appname === "announcements")
                              ?
                                <>
                                  {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                                  data.permissions[1].permissions.map((subdata) => {
                                    return(
                                      <div className="li_div">
                                        <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                        <div className="checbox_div">
                                          <FormCheck.Check  aria-label="option 1" name="announcementData[]" onChange={()=>{permissionChange('announcement',subdata.id,subdata.codename,data)}}  checked={(values.announcementData.length > 0 && (values.announcementData.indexOf(subdata.id) != -1)) ? true : false} />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </>
                              :
                                <></>
                            )
                          })}
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default CreateNewRole;
