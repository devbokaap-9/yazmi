import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendRemender from "../../Modal/SendRemender";
import Viewuser from "../../Modal/Viewuser";
import DeleteResponse from "../../Modal/DeleteResponse";
import { getFormResponse, getFormResponseAns, sendNotifyToAll, sendNotifyToOne } from '../../../../../actions/Form';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {showToaster,hideToaster} from "../../../../../actions/Auth"

const Responses = () => {
    const dispatch = useDispatch()

    const [userView, setUserView] = useState(false)
    const [sendRemender, setSendRemender] = useState(false)
    const [Delete, setDelete] = useState(false)
    const [DeleteId, setDeleteId] = useState("")
    const [FormId, setFormId] = useState("")
    const [UserProfileId, setuserProfileId] = useState("")
    const [name, setName] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [LoadingOne, setLoadingOne] = useState(false)
    const [ReminderOneId, setReminderOneId] = useState("")
    const [lastSentTime,setLastSentTme] = useState("")
    const handleShowView = (id,form_submitted) => {
      if(form_submitted === true){
        setUserView(true); 
      }
      setuserProfileId(id);dispatch(getFormResponseAns({"0":FormId,"1":id}))
    }
    const handleDelete = (data) => {setDelete(true);setDeleteId(data)}
    // const handleRemender = () => {setSendRemender(true);setName("Radhika Misquitta")}
    // const handlePendingUser = () => {setSendRemender(true);setName("All pending users")}

    

    // get form id 
    const getFormid = useSelector((state) => state.formsData.singleFormData);

    // get form response 
    const getResponsedata = useSelector((state) => state.formsData.getResponsData);
    const reciveResponse = getResponsedata.results && getResponsedata.results.filter((data) => data.is_form_submitted === true )


  //   const convertMS = ( milliseconds ) => {
  //     // var diff =(new Date().getTime() - milliseconds) / 1000;
  //     // diff /= (60 * 60);
  //     // let hours =  Math.abs(Math.round(diff));
  //     // let time = hours + ""
  //     // let days = 0;
  //     // if(hours >= 24){
  //     //   days=Math.floor(hours/24);
  //     //   time = hours + "days"
  //     // }
  //     var delta = (new Date().getTime() - milliseconds) / 1000;

  //     // calculate (and subtract) whole days
  //     var days = Math.floor(delta / 86400);
  //     delta -= days * 86400;

  //     // calculate (and subtract) whole hours
  //     var hours = Math.floor(delta / 3600) % 24;
  //     delta -= hours * 3600;

  //     // calculate (and subtract) whole minutes
  //     var minutes = Math.floor(delta / 60) % 60;
  //     delta -= minutes * 60;
  //     console.log(minutes,'minutes')
  //     console.log(hours,'hours')
  //     console.log(days,'days')
  // }
    
    // console.log(getResponsedata,'response')
    // form notify to all
    const getformNotiy = useSelector((state) => state.formsData.sendNotifyToAllData);

    // form notify to all
    const getformNotiyOne = useSelector((state) => state.formsData.sendNotifyToOneData);

    const isToasterDispay = useSelector(
      (state) => state.authData.isToasterDisplay
    );

    const handlePendingUser = () => {
      // setSendRemender(true);setName("All pending users")
      let data = {}
      data.notify = true
      data.shared_forms = [getFormid.id]
      if(data.notify === true && data.shared_forms[0] !== []){
        setLoading(true)
        dispatch(showToaster());
        dispatch(sendNotifyToAll(getFormid.id,data))
      }
    }
    
    useEffect(() => {
      if(getformNotiy.status === 201 && isToasterDispay){
        setLoading(false)
        dispatch(hideToaster());
        toast.success("Send Reminder To All")
      }
    }, [getformNotiy])
    
    // single reminder
    const handleRemender = (userId) => {
      // setSendRemender(true);setName("Radhika Misquitta")
      setReminderOneId(userId)
      setLoadingOne(true)
      let data = {
        notify: true
      }
      dispatch(sendNotifyToOne(getFormid.id,userId,data))
    }

    useEffect(() => {
      if(getformNotiyOne.status === 200 && LoadingOne){
        setLoadingOne(false)
        toast.success("Send Reminder")
      }
    }, [getformNotiyOne])


    useEffect(() => {
       dispatch(getFormResponse(getFormid.id))
       setFormId(getFormid.id)
    }, [getFormid.id])


    useEffect(() => {
      if(getFormid){
        setLastSentTme("")
        if(getFormid.last_sent !== null){
          getDifference(new Date(getFormid.last_sent))
        }
      }
    },[getFormid])

    const getDifference = (date) => {
      const today = new Date();
      const endDate = date;
      var diffMs = (today - endDate); // milliseconds between now & Christmas
      var diffDays = Math.floor(diffMs / 86400000); // days
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      let time = 0;
      if(diffMins < 60 && diffHrs === 0 && diffDays === 0){
        let unit = "minutes"
        if(diffMins <= 1){
          unit = "minute"
        }
        time = diffMins + " " + unit
      }
      else if(diffHrs < 24 && diffDays === 0){
        let unit = "hours"
        if(diffHrs <= 1){
          unit = "hour"
        }
        time = diffHrs + " " + unit
      }
      else if(diffDays > 0){
        let unit = "days"
        if(diffDays <= 1){
          unit = "day"
        }
        time = diffDays + " " + unit
      }
      setLastSentTme(time)
    }

    const closeShowView = () => {
      setUserView(false)
    }
    const closeRemender = () => {
      setSendRemender(false)
    }


    const closehandleDelete = () => {
      setDelete(false)
    }
  return (
      <>
    <div className="responses_tab">
      <div className="row_div">
        <h4 className="mb-0">{`${reciveResponse && reciveResponse.length} / ${getResponsedata.results && getResponsedata.results.length} Responses Received`} </h4>
        <div className="d-flex flex-column text-end">
          <button className="btn" onClick={handlePendingUser} disabled={getResponsedata.results && getResponsedata.results.length === 0 || Loading ? true : false}>Send Reminder to all pending</button>
          <span>{lastSentTime ? "Last Sent : " + lastSentTime + " ago" : ""}</span>
        </div>
      </div>
      <ul>
        <li>
          <h5>Name</h5>
          <h5 className="text-center">Status</h5>
          <h5 className="text-end">Actions</h5>
        </li>
        {
          getResponsedata && getResponsedata.results.map((data) => 
            
          <li>
              <h5 className={data.is_form_submitted === true ? "cursor_pointer" : ""} onClick={()=>{ handleShowView(data.shared_with.id,data.is_form_submitted)} } >{data.shared_with.username}</h5>
              <h5 className="text-center">{data.is_form_submitted === true ? "Submitted" :  "Pending"}</h5>
              {
                    data.is_form_submitted === true ?
                    <h5 className="text-end">
                      <span className="cursor_pointer" onClick={() => (handleDelete(data.id))}>
                        <svg
                          width="16"
                          height="20"
                          viewBox="0 0 16 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7143 1.11111L11.7857 1.11111L10.6633 0L5.05102 0L3.92857 1.11111L0 1.11111L0 3.33333L15.7143 3.33333V1.11111ZM1.12245 17.7778C1.12245 18.3671 1.35896 18.9324 1.77996 19.3491C2.20096 19.7659 2.77196 20 3.36735 20L12.3469 20C12.9423 20 13.5133 19.7659 13.9343 19.3491C14.3553 18.9324 14.5918 18.3671 14.5918 17.7778L14.5918 4.44444L1.12245 4.44444L1.12245 17.7778Z"
                            fill="#FD4F48"
                          />
                        </svg>
                      </span>
                    </h5> :
                    data.is_form_submitted === false ?
                    <h5 className="text-end">
                      <button onClick={() => {handleRemender(data.id)}} className={ReminderOneId === data.id && LoadingOne ? "cursor_inherit btn p-0":"btn cursor_pointer p-0"} disabled={ReminderOneId === data.id && LoadingOne ? true : false}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.9085 16.305L17.7042 16.1247C17.1245 15.6083 16.6171 15.016 16.1958 14.3639C15.7356 13.464 15.4598 12.4813 15.3845 11.4733V8.50459C15.382 8.14399 15.3499 7.7842 15.2883 7.42888C14.2704 7.21965 13.356 6.66507 12.7 5.85905C12.044 5.05302 11.6867 4.04507 11.6886 3.00584V2.62724C11.0612 2.31846 10.387 2.11541 9.69343 2.02628V1.26907C9.69343 1.0563 9.6089 0.852235 9.45845 0.701778C9.30799 0.551322 9.10393 0.466797 8.89115 0.466797C8.67837 0.466797 8.47431 0.551322 8.32386 0.701778C8.1734 0.852235 8.08888 1.0563 8.08888 1.26907V2.05633C6.53583 2.27541 5.11449 3.04895 4.08724 4.23415C3.05999 5.41935 2.49621 6.93618 2.49998 8.50459L2.49998 11.4733C2.42471 12.4813 2.14889 13.464 1.68869 14.3639C1.27456 15.0144 0.775351 15.6065 0.204325 16.1247L0 16.305L0 17.9997L17.9085 17.9997V16.305Z"
                            fill="#F3AF00"
                          />
                        </svg>
                      </button>
                    </h5> : <></>
                }
            </li>
          )
        }
        {/* <li>
          <h5 className="cursor_pointer">Radhika Misquitta</h5>
          <h5 className="text-center">Pending</h5>
          <h5 className="text-end">
            <span className="cursor_pointer" onClick={handleDelete}>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7143 1.11111L11.7857 1.11111L10.6633 0L5.05102 0L3.92857 1.11111L0 1.11111L0 3.33333L15.7143 3.33333V1.11111ZM1.12245 17.7778C1.12245 18.3671 1.35896 18.9324 1.77996 19.3491C2.20096 19.7659 2.77196 20 3.36735 20L12.3469 20C12.9423 20 13.5133 19.7659 13.9343 19.3491C14.3553 18.9324 14.5918 18.3671 14.5918 17.7778L14.5918 4.44444L1.12245 4.44444L1.12245 17.7778Z"
                  fill="#FD4F48"
                />
              </svg>
            </span>
          </h5>
        </li>
        <li>
          <h5 onClick={handleShowView} className="cursor_pointer">Urvi Shah</h5>
          <h5 className="text-center">Submitted</h5>
          <h5 className="text-end">
            <span onClick={handleRemender} className="cursor_pointer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9085 16.305L17.7042 16.1247C17.1245 15.6083 16.6171 15.016 16.1958 14.3639C15.7356 13.464 15.4598 12.4813 15.3845 11.4733V8.50459C15.382 8.14399 15.3499 7.7842 15.2883 7.42888C14.2704 7.21965 13.356 6.66507 12.7 5.85905C12.044 5.05302 11.6867 4.04507 11.6886 3.00584V2.62724C11.0612 2.31846 10.387 2.11541 9.69343 2.02628V1.26907C9.69343 1.0563 9.6089 0.852235 9.45845 0.701778C9.30799 0.551322 9.10393 0.466797 8.89115 0.466797C8.67837 0.466797 8.47431 0.551322 8.32386 0.701778C8.1734 0.852235 8.08888 1.0563 8.08888 1.26907V2.05633C6.53583 2.27541 5.11449 3.04895 4.08724 4.23415C3.05999 5.41935 2.49621 6.93618 2.49998 8.50459L2.49998 11.4733C2.42471 12.4813 2.14889 13.464 1.68869 14.3639C1.27456 15.0144 0.775351 15.6065 0.204325 16.1247L0 16.305L0 17.9997L17.9085 17.9997V16.305Z"
                  fill="#F3AF00"
                />
              </svg>
            </span>
          </h5>
        </li> */}
      </ul>
    </div>

    <Viewuser form_id={FormId} user_id={UserProfileId} show={userView} closeModal={closeShowView} />
    <SendRemender name={name}  show={sendRemender} closeModal={closeRemender} />
    <DeleteResponse Id={DeleteId} show={Delete} closeModal={closehandleDelete} />
    </>
  );
};

export default Responses;
