import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import UserTab from "../Tabs/UserTab";
import RoleTab from "../Tabs/RoleTab";
import { useHistory } from "react-router-dom";
import BroadcastModal from "../UsersTab/Modals/BroadcastModal";
import AllFormSidebar from "./AllFormSidebar";
import Categories from "../Tabs/Learning/Categories";
import Student from "./StudentSidebar";
import StudentDashboardSidebar from "./StudentDashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import {getCategories, getCourse} from "../../actions/Content";
import checkPermission from "../../utils/CheckPermission";

const Sidebar = () => {
  let dispatch = useDispatch();

  const [showBroadcast, setShowBroadcast] = useState(false);

  const handleShowBroadcast = () => setShowBroadcast(true);

  const closeShowBroadcast = () => {
      setShowBroadcast(false);
  }

  let location = useLocation();
  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

  const addClass = (tabname) => {
    var element = document.getElementById("right__sidebar");
    if(element){
      element.classList.add("sidebar_close");
    }
    setTimeout(function(){
      if(document.getElementById("uncontrolled-tab-example-tab-Users") !== null){
        document.getElementById("uncontrolled-tab-example-tab-Users").click();
      }
      else if(document.getElementById("uncontrolled-tab-example-tab-Categories") !== null){
        document.getElementById("uncontrolled-tab-example-tab-Categories").click();
      }
    },1)
  };

  const removeClass = () => {
    var element = document.getElementById("right__sidebar");
    element.classList.remove("sidebar_close");
  };

  let history = useHistory();

  const handleTab = (e) => {
    if (e === "Users") {
      // history.push("/users");
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
    } else {
      history.push("/roles");
    }
  };
  let getWidth = window.innerWidth;

  // let displayMode = 'browser';
  // const mqStandAlone = '(display-mode: standalone)';
  // if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
	
	
	// 	document.getElementsByName("sidebar")[0].style.display='none'
  //   displayMode = 'standalone';
  // }



  useEffect(() => {
    // if(window.location.href.includes('contents')){
      dispatch(getCategories());
      dispatch(getCourse());
    // }
  },[]);

  const categoryData = useSelector((state) => state.contentData.getCategoryData);

  const courseData = useSelector((state) => state.contentData.getCourses);

  return (
    <>
    <div className="sidebar d-flex" id="sidebar">
      { !location.pathname.includes("student")  ? 
      <div className="left_sidebar">
        <ul className="list-unstyled mb-0 h-100">
          {(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload') || checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend') || checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend') || checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend') || checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend') || checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share'))
          ?
          <li className="mb_44">
            <Link
              exact
              className={location.pathname.includes('users') || location.pathname.includes('roles') || location.pathname.includes('role') || location.pathname.includes('regions') || location.pathname.includes('woreda') || location.pathname.includes('federal') || location.pathname.includes('schools') ? "navbar__link text-decoration-none navbar__link--active" : "navbar__link text-decoration-none" }
              // className="navbar__link text-decoration-none"
              to={(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload')) ? "/users" : (checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend')) ? "/federal" : (checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend')) ? "/regions" : (checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend')) ? "/woreda" : (checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend')) ? "/schools" : (checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share')) ? "/form" : (checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')) ? "/contents" : (checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share')) ? "/roles" : "/users"}
              onClick={() => {addClass('users')}}
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2123 14.4552L15.3093 14.4795C15.366 14.2534 15.5102 14.0591 15.71 13.9392C15.9099 13.8193 16.1492 13.7836 16.3753 13.8401C17.6433 14.1571 18.4456 14.9653 18.9078 15.8917L18.9079 15.8918C19.357 16.7891 19.4909 17.7959 19.4909 18.6114C19.4909 18.8446 19.3982 19.0684 19.2333 19.2333C19.0684 19.3982 18.8446 19.4909 18.6114 19.4909C18.3781 19.4909 18.1544 19.3982 17.9894 19.2333C17.8245 19.0684 17.7318 18.8446 17.7318 18.6114C17.7318 17.9585 17.6208 17.2501 17.3354 16.6781L17.3353 16.678C17.0628 16.1341 16.6396 15.7191 15.9488 15.5463C15.7227 15.4896 15.5284 15.3455 15.4085 15.1457C15.2886 14.9458 15.2529 14.7055 15.3094 14.4794L15.2123 14.4552ZM15.2123 14.4552C15.1495 14.707 15.1892 14.9745 15.3227 15.1971C15.4563 15.4197 15.6727 15.5802 15.9245 15.6433L16.3996 13.743C16.1477 13.6802 15.8812 13.7199 15.6586 13.8534C15.436 13.987 15.2755 14.2034 15.2123 14.4552ZM14.5954 1.79181L14.5954 1.79173C14.6771 1.70996 14.7741 1.64508 14.8809 1.60082C14.9877 1.55656 15.1021 1.53377 15.2177 1.53377C15.3333 1.53377 15.4478 1.55656 15.5545 1.60082C15.6613 1.64508 15.7583 1.70996 15.84 1.79173L15.8401 1.79178C16.3766 2.32826 16.8023 2.96519 17.0927 3.66618C17.3831 4.36717 17.5325 5.11851 17.5325 5.87727C17.5325 6.63604 17.3831 7.38737 17.0927 8.08837C16.8023 8.78936 16.3766 9.42628 15.8401 9.96277L15.84 9.96277C15.7583 10.0445 15.6613 10.1093 15.5545 10.1536C15.4477 10.1978 15.3333 10.2205 15.2177 10.2205C15.1022 10.2205 14.9877 10.1978 14.8809 10.1536C14.7742 10.1093 14.6771 10.0445 14.5954 9.96277C14.5137 9.88105 14.4489 9.78403 14.4046 9.67725C14.3604 9.57047 14.3376 9.45603 14.3376 9.34046C14.3376 9.22488 14.3604 9.11044 14.4046 9.00366C14.4489 8.89688 14.5137 8.79986 14.5954 8.71814L14.5954 8.71813C15.3487 7.96461 15.7719 6.94275 15.7719 5.87727C15.7719 4.81179 15.3487 3.78994 14.5954 3.03642L14.5954 3.03637C14.5136 2.95468 14.4487 2.85768 14.4045 2.7509C14.3602 2.64413 14.3374 2.52968 14.3374 2.41409C14.3374 2.2985 14.3602 2.18405 14.4045 2.07728L14.3121 2.03898L14.4045 2.07728C14.4487 1.9705 14.5136 1.8735 14.5954 1.79181ZM7.83636 1.85909C6.77068 1.85909 5.74864 2.28243 4.99508 3.03599C4.24152 3.78954 3.81818 4.81158 3.81818 5.87727C3.81818 6.94296 4.24152 7.965 4.99508 8.71856C5.74864 9.47211 6.77068 9.89546 7.83636 9.89546C8.90205 9.89546 9.92409 9.47211 10.6776 8.71856C11.4312 7.965 11.8545 6.94296 11.8545 5.87727C11.8545 4.81158 11.4312 3.78954 10.6776 3.03599C9.92409 2.28243 8.90205 1.85909 7.83636 1.85909ZM2.05909 5.87727C2.05909 4.34505 2.66777 2.87557 3.75122 1.79212C4.83466 0.708675 6.30414 0.1 7.83636 0.1C9.36859 0.1 10.8381 0.708675 11.9215 1.79212C13.005 2.87557 13.6136 4.34505 13.6136 5.87727C13.6136 7.4095 13.005 8.87897 11.9215 9.96242C10.8381 11.0459 9.36859 11.6545 7.83636 11.6545C6.30414 11.6545 4.83466 11.0459 3.75122 9.96242C2.66777 8.87897 2.05909 7.4095 2.05909 5.87727ZM4.40795 15.5727C3.10764 15.5727 1.85909 16.8172 1.85909 18.6114C1.85909 18.8446 1.76642 19.0684 1.60148 19.2333C1.43653 19.3982 1.21282 19.4909 0.979545 19.4909C0.746275 19.4909 0.522559 19.3982 0.357613 19.2333C0.192666 19.0684 0.1 18.8446 0.1 18.6114C0.1 16.0746 1.92236 13.8136 4.40795 13.8136L11.2648 13.8136C13.7504 13.8136 15.5727 16.0746 15.5727 18.6114C15.5727 18.8446 15.4801 19.0684 15.3151 19.2333C15.1502 19.3982 14.9265 19.4909 14.6932 19.4909C14.4599 19.4909 14.2362 19.3982 14.0712 19.2333C13.9063 19.0684 13.8136 18.8446 13.8136 18.6114C13.8136 16.8172 12.5651 15.5727 11.2648 15.5727L4.40795 15.5727Z"
                    fill="#ffffff"
                    stroke="white"
                    strokeWidth="0.2"
                  />
                </svg>
              </span>
            </Link>
          </li>
          :
            <></>
          }
          {(checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share'))
          ?
            <li className="mb_44">
              <NavLink
              className={location.pathname.includes('form') || location.pathname.includes('notownform') ? "navbar__link text-decoration-none navbar__link--active" : "navbar__link text-decoration-none" }
                // activeClassName="navbar__link--active"
                // className="navbar__link text-decoration-none"
                to="/form"
                onClick={addClass}
              >
                <span>
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9 12.271L13.5452 10.062L13.5 10.0391L13.4548 10.062L9.1 12.271V1.82609V1.72609H9H1.8H1.7V1.82609V19.1739V19.2739H1.8H16.2H16.3V19.1739V15.6217H17.9V19.1738C17.8993 19.6318 17.7196 20.0707 17.4008 20.3942C17.082 20.7176 16.6501 20.8993 16.1998 20.9H1.8001C1.34981 20.8995 0.917799 20.7179 0.598952 20.3944C0.280057 20.0709 0.100451 19.6319 0.0999999 19.1738L0.1 1.82613C0.100465 1.36802 0.280069 0.929087 0.598952 0.605583C0.917799 0.282114 1.34981 0.100456 1.8001 0.0999999L16.1999 0.1C16.6502 0.10047 17.0822 0.282126 17.401 0.605582L17.4723 0.535382L17.401 0.605583C17.7199 0.929099 17.8995 1.36805 17.9 1.82619V12.271ZM16.1548 9.5684L16.3 9.64207V9.47922V1.82609V1.72609H16.2H10.8H10.7V1.82609V9.47922V9.64207L10.8452 9.5684L13.5 8.22178L16.1548 9.5684Z"
                      fill="white"
                      stroke="#ffffff"
                      strokeWidth="0.2"
                    />
                  </svg>
                </span>
              </NavLink>
            </li>
          :
            <></>
          }
          {/* <li className="mb_44">
            <NavLink
              activeClassName="navbar__link--active"
              className="navbar__link text-decoration-none"
              to="/product"
              onClick={addClass}
            >
              <span>

                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.1186 9.92845H19.8187C19.8881 10.2809 19.937 10.637 19.9653 10.995H10.326L4.19971 18.3746C2.69947 16.9181 1.73177 15.0001 1.45179 12.928C1.1718 10.8559 1.59575 8.74984 2.65565 6.94747C3.71555 5.14511 5.35 3.75087 7.29691 2.98833C9.24382 2.2258 11.3904 2.13914 13.3924 2.74225L14.0591 1.569C11.9187 0.850795 9.6057 0.830259 7.45295 1.51034C5.3002 2.19043 3.41877 3.53606 2.07949 5.35352C0.740206 7.17099 0.0121594 9.36654 0.00015097 11.6241C-0.0118574 13.8817 0.692792 16.0849 2.01266 17.9165C3.33253 19.7481 5.19955 21.1137 7.34494 21.8166C9.49033 22.5196 11.8034 22.5236 13.9513 21.8282C16.0992 21.1329 17.971 19.7739 19.2973 17.9469C20.6236 16.12 21.336 13.9193 21.3319 11.6617C21.3285 11.0785 21.2772 10.4966 21.1786 9.92178L21.1186 9.92845ZM10.666 20.9944C8.7119 20.9934 6.8081 20.3751 5.22631 19.2278L10.9526 12.3283H19.9653C19.7969 14.6804 18.7443 16.8816 17.0191 18.4893C15.2939 20.097 13.0241 20.992 10.666 20.9944Z"
                    fill="white"
                  />
                  <path
                    d="M16.5657 0.422609L12.7526 6.99551C12.6639 7.12572 12.613 7.27795 12.6055 7.43533C12.598 7.59271 12.6342 7.7491 12.7101 7.88715C12.786 8.02521 12.8987 8.13955 13.0356 8.21749C13.1726 8.29544 13.3284 8.33395 13.4859 8.32876H21.1187C21.2762 8.33395 21.432 8.29544 21.569 8.21749C21.7059 8.13955 21.8186 8.02521 21.8945 7.88715C21.9704 7.7491 22.0066 7.59271 21.9991 7.43533C21.9916 7.27795 21.9407 7.12572 21.852 6.99551L18.0389 0.422609C17.9637 0.293987 17.8562 0.187298 17.7269 0.113155C17.5977 0.0390121 17.4513 0 17.3023 0C17.1533 0 17.0069 0.0390121 16.8777 0.113155C16.7484 0.187298 16.6409 0.293987 16.5657 0.422609Z"
                    fill="white"
                  />
                </svg>
              </span>
            </NavLink>
          </li> */}
          {(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish'))
          ?
            <li className="mb_44">
              <NavLink
                // activeClassName="navbar__link--active"
                // className="navbar__link text-decoration-none"
                className={location.pathname.includes('contents') ? "navbar__link text-decoration-none navbar__link--active" : "navbar__link text-decoration-none" }
                to="/contents"
                onClick={addClass}
              >
                <span>
                  <svg
                    width="22"
                    height="27"
                    viewBox="0 0 22 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.55556 3.77783L3.77778 3.77783C3.04107 3.77783 2.33453 4.07049 1.81359 4.59142C1.29266 5.11236 1 5.8189 1 6.55561L1 23.2223C1 23.959 1.29266 24.6655 1.81359 25.1865C2.33453 25.7074 3.04107 26.0001 3.77778 26.0001L17.6667 26.0001C18.4034 26.0001 19.1099 25.7074 19.6309 25.1865C20.1518 24.6655 20.4445 23.959 20.4445 23.2223L20.4445 6.55561C20.4445 5.8189 20.1518 5.11236 19.6309 4.59142C19.1099 4.07049 18.4034 3.77783 17.6667 3.77783L14.8889 3.77783"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.1112 1L9.33344 1C7.79932 1 6.55566 2.24365 6.55566 3.77778C6.55566 5.3119 7.79932 6.55556 9.33344 6.55556H12.1112C13.6453 6.55556 14.889 5.3119 14.889 3.77778C14.889 2.24365 13.6453 1 12.1112 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.55566 20.4444L6.55566 13.5"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7222 20.4443V19.0554"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.8889 20.4443V16.2776"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </NavLink>
            </li>
          :
            <></>
          }
          {/* <li className="mb_44">
            <NavLink
              activeClassName="navbar__link--active"
              className="navbar__link text-decoration-none"
              to="/contacts"
              onClick={addClass}
            >
              <span>
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1" fill="white">
                    <path d="M8.2667 24.9969C7.6568 24.9933 7.06461 24.7915 6.57941 24.4219L3.99223 22.4972C3.39519 22.0317 2.99905 21.3553 2.88516 20.6068C2.77126 19.8584 2.94826 19.0947 3.37981 18.4727C3.60814 18.1355 3.75325 17.749 3.80322 17.3449C3.85319 16.9408 3.8066 16.5306 3.66727 16.148L3.59228 15.948C3.49527 15.6017 3.31795 15.2831 3.07473 15.0182C2.83151 14.7533 2.52924 14.5494 2.19246 14.4232H1.99248C1.26241 14.1777 0.658661 13.6541 0.312329 12.9661C-0.0340037 12.2781 -0.0949539 11.4813 0.142714 10.7487L1.16759 7.49906C1.26193 7.12256 1.43562 6.77056 1.67704 6.46664C1.91846 6.16271 2.22202 5.91387 2.56741 5.73678C2.88906 5.57106 3.24099 5.47231 3.6019 5.44653C3.96282 5.42075 4.32521 5.46847 4.66715 5.5868C5.03946 5.7121 5.43673 5.74458 5.82445 5.68141C6.21216 5.61825 6.57859 5.46134 6.89187 5.22435L7.05435 5.09936C7.33793 4.87308 7.56712 4.58605 7.72503 4.25942C7.88294 3.93279 7.96554 3.57489 7.96674 3.2121V2.91214C7.96338 2.1474 8.26226 1.41229 8.79832 0.86687C9.33438 0.32145 10.0642 0.0098816 10.8289 0L14.016 0C14.388 0.00100261 14.7562 0.0754959 15.0994 0.219201C15.4426 0.362907 15.754 0.572994 16.0157 0.837395C16.566 1.39706 16.8717 2.15226 16.8656 2.93713V3.28709C16.8593 3.63174 16.934 3.97305 17.0838 4.2835C17.2336 4.59396 17.4543 4.86486 17.728 5.07437L17.8655 5.17435C18.146 5.3847 18.4732 5.52411 18.8193 5.58069C19.1653 5.63728 19.5198 5.60936 19.8528 5.49931L20.2777 5.36183C20.6377 5.24248 21.0181 5.19687 21.3962 5.22772C21.7742 5.25856 22.1422 5.36523 22.4781 5.54136C22.814 5.71749 23.111 5.95947 23.3514 6.25287C23.5918 6.54627 23.7706 6.88508 23.8772 7.24909L24.8646 10.3987C25.0931 11.1266 25.0306 11.9147 24.6904 12.5975C24.3501 13.2804 23.7586 13.8048 23.0399 14.0607L22.7899 14.1482C22.4222 14.2686 22.0898 14.4775 21.8217 14.7564C21.5537 15.0354 21.3582 15.3759 21.2526 15.748C21.1531 16.094 21.1295 16.4574 21.1834 16.8133C21.2374 17.1692 21.3675 17.5093 21.565 17.8103L21.89 18.2852C22.3209 18.9107 22.4963 19.6773 22.3801 20.4279C22.2639 21.1786 21.865 21.8563 21.2651 22.3222L18.7529 24.2595C18.4494 24.4916 18.1016 24.6591 17.7309 24.7517C17.3602 24.8444 16.9745 24.8601 16.5975 24.7981C16.2205 24.736 15.8601 24.5975 15.5387 24.3909C15.2173 24.1844 14.9415 23.9142 14.7284 23.597L14.5784 23.3846C14.3737 23.0769 14.0944 22.8262 13.7666 22.6557C13.4387 22.4852 13.073 22.4006 12.7036 22.4097C12.3512 22.4188 12.0058 22.5107 11.6953 22.6779C11.3848 22.845 11.118 23.0828 10.9164 23.3721L10.6289 23.7845C10.4157 24.1039 10.1394 24.3762 9.81699 24.5847C9.49456 24.7932 9.13284 24.9335 8.75414 24.9969C8.59205 25.0128 8.42879 25.0128 8.2667 24.9969ZM3.00486 12.0235C3.71063 12.2752 4.34747 12.689 4.86412 13.2317C5.38077 13.7744 5.76281 14.4308 5.97948 15.1481V15.2981C6.24937 16.0438 6.33799 16.843 6.23802 17.6297C6.13805 18.4164 5.85237 19.168 5.40456 19.8225C5.32551 19.9099 5.28174 20.0234 5.28174 20.1412C5.28174 20.259 5.32551 20.3726 5.40456 20.4599L8.09172 22.4972C8.12678 22.5247 8.16732 22.5444 8.21063 22.555C8.25394 22.5656 8.29901 22.5668 8.34281 22.5585C8.38662 22.5502 8.42814 22.5326 8.46459 22.507C8.50105 22.4813 8.53159 22.4481 8.55416 22.4097L8.84163 21.9973C9.27518 21.3708 9.85418 20.8588 10.529 20.5052C11.2038 20.1515 11.9543 19.9668 12.7161 19.9668C13.478 19.9668 14.2285 20.1515 14.9033 20.5052C15.5781 20.8588 16.1571 21.3708 16.5907 21.9973L16.7406 22.2222C16.7944 22.2985 16.8746 22.3519 16.9656 22.3722C17.0074 22.3784 17.0499 22.376 17.0907 22.3653C17.1316 22.3545 17.1698 22.3356 17.2031 22.3097L19.7778 20.36C19.8679 20.2884 19.9272 20.1851 19.9435 20.0712C19.9597 19.9573 19.9317 19.8414 19.8652 19.7475L19.5403 19.2726C19.1169 18.6552 18.8375 17.9505 18.7229 17.2107C18.6082 16.4709 18.6612 15.7147 18.8779 14.9981C19.0975 14.2449 19.4948 13.5555 20.0364 12.9878C20.578 12.4202 21.248 11.9909 21.99 11.736L22.24 11.6485C22.3441 11.6068 22.4276 11.5256 22.4721 11.4225C22.5166 11.3195 22.5185 11.2031 22.4774 11.0986L21.5025 7.9865C21.4791 7.93205 21.4449 7.88292 21.4019 7.8421C21.359 7.80128 21.3082 7.76962 21.2526 7.74903C21.2158 7.73037 21.1751 7.72064 21.1338 7.72064C21.0926 7.72064 21.0519 7.73037 21.0151 7.74903L20.5902 7.88652C19.8713 8.12376 19.1056 8.18288 18.3589 8.05879C17.6121 7.93469 16.9067 7.6311 16.3032 7.1741L16.2532 7.06162C15.6741 6.62307 15.2046 6.05626 14.8815 5.40568C14.5583 4.75511 14.3904 4.03848 14.3909 3.31209V2.92463C14.3932 2.80417 14.3484 2.68758 14.2659 2.59968C14.194 2.53469 14.1004 2.49902 14.0035 2.49969L10.8289 2.49969C10.778 2.50287 10.7282 2.51607 10.6824 2.53854C10.6366 2.56101 10.5957 2.5923 10.562 2.63062C10.5283 2.66895 10.5025 2.71354 10.4861 2.76185C10.4697 2.81016 10.463 2.86123 10.4664 2.91214V3.2246C10.4665 3.9708 10.2953 4.70706 9.96588 5.37664C9.63651 6.04622 9.15781 6.63124 8.56666 7.08661L8.40418 7.2116C7.76642 7.69717 7.01901 8.01841 6.22782 8.14701C5.43664 8.2756 4.62596 8.2076 3.86725 7.94901C3.81048 7.92995 3.74904 7.92995 3.69227 7.94901C3.62173 7.99186 3.56861 8.05826 3.54229 8.13648L2.50492 11.3986C2.46876 11.5097 2.47723 11.6305 2.52855 11.7355C2.57986 11.8404 2.67 11.9213 2.77988 11.961L3.00486 12.0235Z" />
                  </mask>
                  <path
                    d="M8.2667 24.9969C7.6568 24.9933 7.06461 24.7915 6.57941 24.4219L3.99223 22.4972C3.39519 22.0317 2.99905 21.3553 2.88516 20.6068C2.77126 19.8584 2.94826 19.0947 3.37981 18.4727C3.60814 18.1355 3.75325 17.749 3.80322 17.3449C3.85319 16.9408 3.8066 16.5306 3.66727 16.148L3.59228 15.948C3.49527 15.6017 3.31795 15.2831 3.07473 15.0182C2.83151 14.7533 2.52924 14.5494 2.19246 14.4232H1.99248C1.26241 14.1777 0.658661 13.6541 0.312329 12.9661C-0.0340037 12.2781 -0.0949539 11.4813 0.142714 10.7487L1.16759 7.49906C1.26193 7.12256 1.43562 6.77056 1.67704 6.46664C1.91846 6.16271 2.22202 5.91387 2.56741 5.73678C2.88906 5.57106 3.24099 5.47231 3.6019 5.44653C3.96282 5.42075 4.32521 5.46847 4.66715 5.5868C5.03946 5.7121 5.43673 5.74458 5.82445 5.68141C6.21216 5.61825 6.57859 5.46134 6.89187 5.22435L7.05435 5.09936C7.33793 4.87308 7.56712 4.58605 7.72503 4.25942C7.88294 3.93279 7.96554 3.57489 7.96674 3.2121V2.91214C7.96338 2.1474 8.26226 1.41229 8.79832 0.86687C9.33438 0.32145 10.0642 0.0098816 10.8289 0L14.016 0C14.388 0.00100261 14.7562 0.0754959 15.0994 0.219201C15.4426 0.362907 15.754 0.572994 16.0157 0.837395C16.566 1.39706 16.8717 2.15226 16.8656 2.93713V3.28709C16.8593 3.63174 16.934 3.97305 17.0838 4.2835C17.2336 4.59396 17.4543 4.86486 17.728 5.07437L17.8655 5.17435C18.146 5.3847 18.4732 5.52411 18.8193 5.58069C19.1653 5.63728 19.5198 5.60936 19.8528 5.49931L20.2777 5.36183C20.6377 5.24248 21.0181 5.19687 21.3962 5.22772C21.7742 5.25856 22.1422 5.36523 22.4781 5.54136C22.814 5.71749 23.111 5.95947 23.3514 6.25287C23.5918 6.54627 23.7706 6.88508 23.8772 7.24909L24.8646 10.3987C25.0931 11.1266 25.0306 11.9147 24.6904 12.5975C24.3501 13.2804 23.7586 13.8048 23.0399 14.0607L22.7899 14.1482C22.4222 14.2686 22.0898 14.4775 21.8217 14.7564C21.5537 15.0354 21.3582 15.3759 21.2526 15.748C21.1531 16.094 21.1295 16.4574 21.1834 16.8133C21.2374 17.1692 21.3675 17.5093 21.565 17.8103L21.89 18.2852C22.3209 18.9107 22.4963 19.6773 22.3801 20.4279C22.2639 21.1786 21.865 21.8563 21.2651 22.3222L18.7529 24.2595C18.4494 24.4916 18.1016 24.6591 17.7309 24.7517C17.3602 24.8444 16.9745 24.8601 16.5975 24.7981C16.2205 24.736 15.8601 24.5975 15.5387 24.3909C15.2173 24.1844 14.9415 23.9142 14.7284 23.597L14.5784 23.3846C14.3737 23.0769 14.0944 22.8262 13.7666 22.6557C13.4387 22.4852 13.073 22.4006 12.7036 22.4097C12.3512 22.4188 12.0058 22.5107 11.6953 22.6779C11.3848 22.845 11.118 23.0828 10.9164 23.3721L10.6289 23.7845C10.4157 24.1039 10.1394 24.3762 9.81699 24.5847C9.49456 24.7932 9.13284 24.9335 8.75414 24.9969C8.59205 25.0128 8.42879 25.0128 8.2667 24.9969ZM3.00486 12.0235C3.71063 12.2752 4.34747 12.689 4.86412 13.2317C5.38077 13.7744 5.76281 14.4308 5.97948 15.1481V15.2981C6.24937 16.0438 6.33799 16.843 6.23802 17.6297C6.13805 18.4164 5.85237 19.168 5.40456 19.8225C5.32551 19.9099 5.28174 20.0234 5.28174 20.1412C5.28174 20.259 5.32551 20.3726 5.40456 20.4599L8.09172 22.4972C8.12678 22.5247 8.16732 22.5444 8.21063 22.555C8.25394 22.5656 8.29901 22.5668 8.34281 22.5585C8.38662 22.5502 8.42814 22.5326 8.46459 22.507C8.50105 22.4813 8.53159 22.4481 8.55416 22.4097L8.84163 21.9973C9.27518 21.3708 9.85418 20.8588 10.529 20.5052C11.2038 20.1515 11.9543 19.9668 12.7161 19.9668C13.478 19.9668 14.2285 20.1515 14.9033 20.5052C15.5781 20.8588 16.1571 21.3708 16.5907 21.9973L16.7406 22.2222C16.7944 22.2985 16.8746 22.3519 16.9656 22.3722C17.0074 22.3784 17.0499 22.376 17.0907 22.3653C17.1316 22.3545 17.1698 22.3356 17.2031 22.3097L19.7778 20.36C19.8679 20.2884 19.9272 20.1851 19.9435 20.0712C19.9597 19.9573 19.9317 19.8414 19.8652 19.7475L19.5403 19.2726C19.1169 18.6552 18.8375 17.9505 18.7229 17.2107C18.6082 16.4709 18.6612 15.7147 18.8779 14.9981C19.0975 14.2449 19.4948 13.5555 20.0364 12.9878C20.578 12.4202 21.248 11.9909 21.99 11.736L22.24 11.6485C22.3441 11.6068 22.4276 11.5256 22.4721 11.4225C22.5166 11.3195 22.5185 11.2031 22.4774 11.0986L21.5025 7.9865C21.4791 7.93205 21.4449 7.88292 21.4019 7.8421C21.359 7.80128 21.3082 7.76962 21.2526 7.74903C21.2158 7.73037 21.1751 7.72064 21.1338 7.72064C21.0926 7.72064 21.0519 7.73037 21.0151 7.74903L20.5902 7.88652C19.8713 8.12376 19.1056 8.18288 18.3589 8.05879C17.6121 7.93469 16.9067 7.6311 16.3032 7.1741L16.2532 7.06162C15.6741 6.62307 15.2046 6.05626 14.8815 5.40568C14.5583 4.75511 14.3904 4.03848 14.3909 3.31209V2.92463C14.3932 2.80417 14.3484 2.68758 14.2659 2.59968C14.194 2.53469 14.1004 2.49902 14.0035 2.49969L10.8289 2.49969C10.778 2.50287 10.7282 2.51607 10.6824 2.53854C10.6366 2.56101 10.5957 2.5923 10.562 2.63062C10.5283 2.66895 10.5025 2.71354 10.4861 2.76185C10.4697 2.81016 10.463 2.86123 10.4664 2.91214V3.2246C10.4665 3.9708 10.2953 4.70706 9.96588 5.37664C9.63651 6.04622 9.15781 6.63124 8.56666 7.08661L8.40418 7.2116C7.76642 7.69717 7.01901 8.01841 6.22782 8.14701C5.43664 8.2756 4.62596 8.2076 3.86725 7.94901C3.81048 7.92995 3.74904 7.92995 3.69227 7.94901C3.62173 7.99186 3.56861 8.05826 3.54229 8.13648L2.50492 11.3986C2.46876 11.5097 2.47723 11.6305 2.52855 11.7355C2.57986 11.8404 2.67 11.9213 2.77988 11.961L3.00486 12.0235Z"
                    fill="white"
                    stroke="#00643B"
                    strokeWidth="0.8"
                    mask="url(#path-1-inside-1)"
                  />
                  <path
                    d="M12.5036 16.6729C11.678 16.6729 10.8709 16.4281 10.1844 15.9694C9.49792 15.5107 8.96287 14.8588 8.64691 14.096C8.33096 13.3332 8.24829 12.4938 8.40936 11.6841C8.57044 10.8743 8.96801 10.1305 9.55182 9.5467C10.1356 8.96289 10.8794 8.56531 11.6892 8.40424C12.499 8.24316 13.3383 8.32583 14.1011 8.64179C14.8639 8.95774 15.5158 9.49279 15.9745 10.1793C16.4332 10.8658 16.6781 11.6729 16.6781 12.4985C16.6781 13.6056 16.2383 14.6674 15.4554 15.4503C14.6725 16.2331 13.6107 16.6729 12.5036 16.6729ZM12.5036 10.4237C12.0933 10.4237 11.6921 10.5454 11.3509 10.7734C11.0097 11.0014 10.7438 11.3254 10.5868 11.7045C10.4297 12.0836 10.3887 12.5008 10.4687 12.9032C10.5488 13.3057 10.7464 13.6754 11.0365 13.9656C11.3267 14.2557 11.6964 14.4533 12.0988 14.5334C12.5013 14.6134 12.9185 14.5723 13.2976 14.4153C13.6767 14.2583 14.0007 13.9924 14.2287 13.6512C14.4567 13.31 14.5784 12.9088 14.5784 12.4985C14.5784 11.9482 14.3598 11.4205 13.9707 11.0314C13.5816 10.6423 13.0539 10.4237 12.5036 10.4237Z"
                    fill="white"
                    stroke="#00643B"
                    strokeWidth="0.4"
                  />
                </svg>
              </span>
            </NavLink>
          </li> */}

          {/* <li className="">
            <NavLink
              activeClassName="navbar__link--active_msg"
              className="navbar__link text-decoration-none"
              to="/allannouncement"
              onClick={addClass}
            >
              <span>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="white_svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.33301 18.6005L5.60051 17.333H21.6663V4.33301H4.33301V18.6005ZM16.2497 9.74967H18.4163V11.9163H16.2497V9.74967ZM11.9163 9.74967H14.083V11.9163H11.9163V9.74967ZM7.58301 9.74967H9.74967V11.9163H7.58301V9.74967Z"
                    fill="#00643B"
                  />
                  <path
                    className="green_svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.667 2.16699H4.33366C3.14199 2.16699 2.16699 3.14199 2.16699 4.33366V23.8337L6.50033 19.5003H21.667C22.8587 19.5003 23.8337 18.5253 23.8337 17.3337V4.33366C23.8337 3.14199 22.8587 2.16699 21.667 2.16699ZM21.667 17.3337H5.60116L4.33366 18.6012V4.33366H21.667V17.3337ZM7.58366 9.75033H9.75033V11.917H7.58366V9.75033ZM16.2503 9.75033H18.417V11.917H16.2503V9.75033ZM11.917 9.75033H14.0837V11.917H11.917V9.75033Z"
                    fill="white"
                  />
                </svg>
              </span>
            </NavLink>
          </li> */}
          {/* {(checkPermission('custom_learner_data_get'))
          ?
            <li className="mt_auto last_li">
              <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link text-decoration-none"
                to="/student"
                onClick={addClass}
              >
                <span>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2857 25.5714C20.0709 25.5714 25.5714 20.0709 25.5714 13.2857C25.5714 6.5005 20.0709 1 13.2857 1C6.5005 1 1 6.5005 1 13.2857C1 20.0709 6.5005 25.5714 13.2857 25.5714Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.2859 19.4285C16.6785 19.4285 19.4288 16.6783 19.4288 13.2857C19.4288 9.89307 16.6785 7.14282 13.2859 7.14282C9.89332 7.14282 7.14307 9.89307 7.14307 13.2857C7.14307 16.6783 9.89332 19.4285 13.2859 19.4285Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.8926 8.67864L21.7319 4.83936"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.8926 17.8928L21.7319 21.7321"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.67864 17.8928L4.83936 21.7321"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.67864 8.67864L4.83936 4.83936"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </NavLink>
            </li>
          :
            <></>
          } */}
        </ul>
      </div> :
      <StudentDashboardSidebar /> 
      }
      { location.pathname.includes("401") ?
        <></> :
        location.pathname.includes("practice-result") || location.pathname.includes("exam-result") || location.pathname === "/student/viewcourse" || location.pathname === "/student/assesment" ?
      <></> :
      <div className="right_sidebar h-100 overflow-auto" id="right__sidebar">
        {location.pathname.includes('users') || location.pathname.includes('roles') || location.pathname.includes('role') || location.pathname.includes('regions') || location.pathname.includes('woreda') || location.pathname.includes('federal') || location.pathname.includes('schools') ? (
          <Tabs
            defaultActiveKey={location.pathname.includes("roles") || location.pathname.includes("role")  ? "Roles" : "Users"}
            id="uncontrolled-tab-example"
            className="mb-0"
            onSelect={handleTab}
          >
            <Tab eventKey="Users" title="Users">
              <UserTab classRemove={removeClass} />
            </Tab>
            <Tab eventKey="Roles" title="Roles">
              <RoleTab classRemove={removeClass} />
            </Tab>
          </Tabs>
        ) : location.pathname.includes("form") ? 
        <AllFormSidebar classRemove={removeClass} /> 
       : location.pathname.includes("contents") ? 
       <>
       <Tabs
       defaultActiveKey = {location.pathname.includes("contents") ? "Categories": ""}
       id="uncontrolled-tab-example"
       className="mb-0 tab-Categories"
      //  onSelect={handleTab}
     >
       <Tab eventKey="Categories" title="Categories" className="h-100">
         <Categories classRemove={removeClass} />
       </Tab>
       {/* <Tab eventKey="Learning Paths" title="Learning Paths">
         <RoleTab classRemove={removeClass} />
       </Tab> */}
     </Tabs> 
 </> : location.pathname.includes("student") ?
    <Student classRemove={removeClass} />
     :  (
        <></>
          // <div className="UserSidebar h-100">
          //   <ul className="list-unstyled ul_100">
          //     <li>
          //       <Link
          //         to="/allannouncement"
          //         className={
          //           "Link_text" +
          //           (location.pathname === "/allannouncement"
          //             ? " users_box_active"
          //             : "")
          //         }
          //          onClick={() => removeClass()}
          //       >
          //         <div className="users_box d-flex align-items-center justify-content-between">
          //           <p className="mb-0 ml-2">All Announcements</p>
          //         </div>
          //       </Link>
          //     </li>

          //     <li>
          //       <Link
          //         to="/allannouncement/inbox"
          //         className={
          //           "Link_text" +
          //           (location.pathname === "/allannouncement/inbox" ? " users_box_active" : "")
          //         }
          //         onClick={() => removeClass()}
          //       >
          //         <div className="users_box d-flex align-items-center justify-content-between">
          //           <p className="mb-0 ml-2">Inbox</p>
          //         </div>
          //       </Link>
          //     </li>
          //     <li>
          //       <Link
          //         to="/allannouncement/sent"
          //         className={
          //           "Link_text" +
          //           (location.pathname === "/allannouncement/sent" ? " users_box_active" : "")
          //         }
          //           onClick={() => removeClass()}
          //       >
          //         <div className="users_box d-flex align-items-center justify-content-between">
          //           <p className="mb-0 ml-2">Sent</p>
          //         </div>
          //       </Link>
          //     </li>
          //     <li className="mt-auto end_li" onClick={() => {removeClass();handleShowBroadcast();}}>
          //       <p className="mb-0">Add New Announcement</p>
          //     </li>
          //   </ul>
          // </div>
        )  }
      </div>
    }
    </div>

    <BroadcastModal show={showBroadcast} closeShowBroadcast={closeShowBroadcast}/>
    </>
  );
};

export default Sidebar;
