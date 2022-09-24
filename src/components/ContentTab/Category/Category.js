import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../Layout/SubHeader";
import CategoryDashboard from "./CategoryDashboard";
import { useSelector } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../../../UserContext";
import checkPermission from "../../../utils/CheckPermission";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const Category = (props) => {
  const [check1, setCheck] = useState(false)
  const [count,setCount] = useState(0);
  const [courseName,setCourseName] = useState("");
  let [color, setColor] = useState("#ffffff");
  const userContext = useContext(UserContext);

  const setUserCount = (length) => {
    setCount(length)
  }
  let url = window.location.href.split("/");
  let param = url[url.length-1];
  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  useEffect(() => {
    if(courseDetailsData && courseDetailsData.id){
      userContext.setFrmLdng(false);
      setCourseName(courseDetailsData.title);
    }
  },[courseDetailsData])

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      <main className="main_section">
        <div className="all_user">
          <SubHeader
            checkedAll={check1}
            name={courseName}
            count=""
            countname={((checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')) && courseDetailsData) ? "Created By "+courseDetailsData.creator.username+" on "+(new Date(courseDetailsData.created.replace('IST', '')).getDate()) +" "+(monthNames[new Date(courseDetailsData.created.replace('IST', '')).getMonth()]) + " "+(new Date(courseDetailsData.created.replace('IST', '')).getFullYear()) : ""}
            addName="User"
          />
          <div className="data_table learning_dashboard ">
            <CategoryDashboard loader={userContext.formLdng} />
          </div>
        </div>
      </main>
      {(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish'))
      ?
        <div className={userContext.formLdng ? "loader_div" : ""}>
          <ClipLoader
            color={color}
            className="loader"
            loading={userContext.formLdng}
            css={override}
            size={50}
          />
        </div>
      :
        <></>
      }
    </>
  );
};

export default Category;
