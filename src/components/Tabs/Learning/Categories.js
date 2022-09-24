import React, { useState,useEffect, useContext } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import NewCategory from "../../ContentTab/Modal/NewCategory";
import DeleteCategory from "../../ContentTab/Modal/DeleteCategory";
import DeleteCourse from "../../ContentTab/Modal/DeleteCourse";
import NewCourse from "../../ContentTab/Modal/NewCourse";
import Publish from "../../ContentTab/Modal/Publish";
import { useDispatch, useSelector } from "react-redux";
import {getCategoryDetails, getAttachments, getCourseDetails} from "../../../actions/Content";
import FilterResults from 'react-filter-search';
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

const Categories = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const userContext = useContext(UserContext);

  const [UpdateChangeType, setChangeType] = useState("");
  const [newCategory, setNewCategory] = useState(false);
  const [newCourse, setNewCourse] = useState(false);
  const [publish, setPublish] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState(false);
  const [categoryId,setCategoryId] = useState("");
  const [courseDelete, setCourseDelete] = useState(false);
  const [courseId,setCourseId] = useState("");
  const [createEditFlag,setCreateEditFlag] = useState();
  const [loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");
  const [courseClick,setCourseClick] = useState(false)
  const [isPublish,setIsPublish] = useState(false)
  const [categoriesData,setCategoriesData] = useState([])
  const [coursesData,setCoursesData] = useState([])
  const [filterValue,setFilterValue] = useState("")

  const removeSideBar = () => {
    props.classRemove();
  };

  const categoryData = useSelector((state) => state.contentData.getCategoryData);

  const courseData = useSelector((state) => state.contentData.getCourses);

  let location = useLocation();
  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

  useEffect(() => {
    if(window.location.href.includes('contents') && (segmentCount === 3 || segmentCount === 2)){
      history.push('/contents')
    }
  },[])

  useEffect(() => {
    if(window.location.href.includes('contents') && (segmentCount === 3 || segmentCount === 2 || segmentCount === 1)){
      if(categoryData && courseData && categoryData.results.length != 0){
        setCoursesData(courseData.results)
        setCategoriesData(categoryData.results)
        let courseId = courseData.results.filter(obj => obj.category.id === categoryData.results[0].id)
        let id = ""
        if(courseId[0]){
          id = courseId[0].id
        }
        history.push(`/contents/${categoryData.results[0].id}/${id}`)
        if(id !== ""){
          getCourseData(id)
        }
        else{
          setLoading(false)
        }
      }
    }
  },[categoryData,courseData])

  const handleShowCategory = (flag,categoryId) => {
    if(flag === 1){
      setCreateEditFlag(1);
      setCategoryId(categoryId);
      setLoading(true);
      dispatch(getCategoryDetails(categoryId));
      dispatch(getAttachments());
      setChangeType("catedit")
    }
    else{
      setCreateEditFlag(0);
      setNewCategory(true);
      setChangeType("catcrreate")
    }
  };

  const categoryDetailsData = useSelector((state) => state.contentData.categoryDetailsData);

  useEffect(() => {
    if(categoryDetailsData && categoryDetailsData.id && createEditFlag === 1){
      setLoading(false);
      setNewCategory(true);
    }
  },[categoryDetailsData])

  const handleCloseCategory = () => {
    setNewCategory(false);
    setCreateEditFlag(0);
  };

  const handleShowCourse = (categoryId,flag,courseId) => {
    setCategoryId(categoryId)
    if(flag === 1){
      setCreateEditFlag(1);
      setLoading(true);
      setCourseId(courseId)
      dispatch(getCourseDetails(courseId));
      dispatch(getAttachments());
      setChangeType("corscreate")
    }
    else{
      setCreateEditFlag(0);
      setNewCourse(true);
      setChangeType("coursecreate")
    }
  };
  const handleCloseCourse = () => {
    setNewCourse(false);
    setCreateEditFlag(0);
  };

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  useEffect(() => {
    if(courseDetailsData && courseDetailsData.id && createEditFlag === 1){
      setLoading(false);
      setNewCourse(true);
    }
  },[courseDetailsData])

  const handleShowpublish = (publish) => {
    setPublish(true)
    setIsPublish(publish)
    document.querySelector('.learning_popup').classList.remove('show')
  }
  const handleClosepublish = () => {
    setPublish(false)
    setIsPublish(false)
  }

  const handleShowCategoryDelete = (id) => {
    setCategoryId(id)
    setCategoryDelete(true)
  }
  const handleCloseCategoryDelete = () => {
    setCategoryDelete(false)
  }

  const handleShowCourseDelete = (id) => {
    setCourseId(id)
    setCourseDelete(true)
  }
  const handleCloseCourseDelete = () => {
    setCourseDelete(false)
  }

  const getCourseData = (courseId) => {
    if(!courseClick){
      userContext.setFrmLdng(true)
    }
    dispatch(getCourseDetails(courseId))
  }

  const handleChange = (event) => {
    const filterValue = event.target.value;
    setFilterValue(filterValue);
  }

  const changeTypefun = () => {
    setChangeType("")
  }

  return (
    <>
      {(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish'))
      ?
        <>
          <div className="UserSidebar learningSidebar">
            <div className="search_box d-flex justify-content-between align-items-center">
              <input type="text" value={filterValue} onChange={(e) => {handleChange(e)}} 
                placeholder="Search for categories or courses"/>
            </div>
            <ul className="list-unstyled mb-0">
              <FilterResults
                value={filterValue}
                data={categoriesData}
                renderResults={categoryResults => (
                  categoryResults.map(category => (
                    <li>
                      <Link
                        className={
                          "Link_text" +
                          (location.pathname === "/role/schools"
                            ? " users_box_active"
                            : "")
                        }
                        onClick={props.classRemove}
                      >
                        <div className="users_box d-flex w-100 align-items-center justify-content-between">
                          <div className="nav_link_name d-flex">
                            <p className="mb-0 ml-2">{category.title}</p>
                          </div>
                          <div>
                          {checkPermission('custom_course_data_created')
                          ?
                            <span onClick={() => {handleShowCourse(category.id,0,'')}}>
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 9V5M5 5L5 1M5 5H9M5 5L1 5"
                                  stroke="#666666"
                                  stroke-width="1.2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </span>
                          :
                            <></>
                          }
                          {(checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit'))
                          ?
                            <>
                              <span className="three_dots ml_10" id={"add_user"+category.id}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-three-dots"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                              </span>
                              <UncontrolledPopover
                                className="add_user"
                                trigger="legacy"
                                placement="bottom"
                                target={"add_user"+category.id}
                              >
                                <div className="squar_box squar_box_hover"></div>
                                <PopoverBody>
                                  <ul className="list-unstyled mb-0">
                                    {checkPermission('custom_course_data_edit')
                                    ?
                                      <li className="first_li" onClick={()=>{handleShowCategory(1,category.id)}}>
                                        <Link className="text-decoration-none">
                                        Edit Category
                                        </Link>
                                      </li>
                                    :
                                      <></>
                                    }
                                    {checkPermission('custom_course_data_delete')
                                    ?
                                      <li onClick={() => {handleShowCategoryDelete(category.id)}}>
                                        <Link className="text-decoration-none">
                                        Delete Category
                                        </Link>
                                      </li>
                                    :
                                      <></>
                                    }
                                  </ul>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </>
                          :
                            <></>
                          }
                          </div>
                        </div>
                      </Link>
                      <div
                        className="dropdown"
                        className={
                          location.pathname.includes("/contents")
                            ? "dropdown d-block"
                            : "dropdown d-none"
                        }
                      >
                        <ul className="list-unstyled">
                        <FilterResults
                          value={filterValue}
                          data={coursesData}
                          renderResults={courseResults => (
                            courseResults.map(courses => (
                              (courses.category.id === category.id)
                              ?
                                <li>
                                  <NavLink
                                    to={"/contents/"+category.id+"/"+courses.id}
                                    className="Link_text"
                                    activeClassName="users_box_active"
                                    onClick={() => {removeSideBar();getCourseData(courses.id)}}
                                  >
                                    {courses.title}
                                    {(checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_operation_publish'))
                                    ?
                                      <>
                                        <span className="three_dots" id={"learning_popup"+courses.id}
                                        onClick={()=>{setCourseClick(true)}}>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-three-dots"
                                            viewBox="0 0 16 16"
                                            onClick={()=>{setCourseClick(true)}}
                                          >
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                          </svg>
                                        </span>
                                        <UncontrolledPopover
                                        className="learning_popup"
                                        trigger="legacy"
                                        placement="bottom"
                                        target={"learning_popup"+courses.id}
                                      >
                                        <div className="squar_box squar_box_hover"></div>
                                        <PopoverBody>
                                          <ul className="list-unstyled mb-0">
                                            {checkPermission('custom_course_data_edit')
                                            ?
                                              <li className="first_li" onClick={()=>{handleShowCourse(courses.category.id,1,courses.id)}}>
                                                <Link className="text-decoration-none">
                                                  Edit Course
                                                </Link>
                                              </li>
                                            :
                                              <></>
                                            }
                                            {checkPermission('custom_course_operation_publish')
                                            ?
                                              <li onClick={() => {handleShowpublish(!courses.is_published)}}>
                                                <Link className="text-decoration-none">
                                                  {(!courses.is_published) ? "Publish " : "Unpublish "} Course
                                                </Link>
                                              </li>
                                            :
                                              <></>
                                            }
                                            {checkPermission('custom_course_data_delete')
                                            ?
                                              <li onClick={() => {handleShowCourseDelete(courses.id)}}>
                                                <Link className="text-decoration-none">
                                                Delete Course
                                                </Link>
                                              </li>
                                            :
                                              <></>
                                            }
                                          </ul>
                                        </PopoverBody>
                                      </UncontrolledPopover>
                                    </>
                                  :
                                    <></>
                                  }
                                  </NavLink>
                                </li>
                              :
                              <></>
                            ))
                          )}
                        />
                        </ul>
                      </div>
                    </li>
                  ))
                )}
              />
              
            </ul>
          </div>
          {checkPermission('custom_course_data_created')
              ?
                // <li className="mt-auto end_li" onClick={()=>{handleShowCategory(0,'')}}>
                //   <p className="mb-0">
                //     <span className="plus_icon">
                //       <svg
                //         width="12"
                //         height="12"
                //         viewBox="0 0 12 12"
                //         fill="none"
                //         xmlns="http://www.w3.org/2000/svg"
                //       >
                //         <path
                //           d="M6 11L6 6M6 6L6 1M6 6L11 6M6 6L1 6"
                //           stroke="#252525"
                //           strokeWidth="2"
                //           strokeLinecap="round"
                //         />
                //       </svg>
                //     </span>
                //     Add New Category
                //   </p>
                // </li>
                <button className="mt-auto end_li btn create_new_form" onClick={()=>{handleShowCategory(0,'')}}>
                  <p className="mb-0 d-flex">
                    <span className="plus_icon d-flex align-items-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                          d="M6 11L6 6M6 6L6 1M6 6L11 6M6 6L1 6"
                          stroke="#252525"
                          strokeWidth="2"
                          strokeLinecap="round"
                          />
                      </svg>
                    </span>
                    Add New Category
                  </p>
                </button>
              :
                <></>
              }
          <NewCategory show={newCategory} typeFunction={changeTypefun} type="category" chnagetype={UpdateChangeType} closeModal={handleCloseCategory} flag={createEditFlag} id={categoryId}/>
          <NewCourse show={newCourse} typeFunction={changeTypefun} type="course" chnagetype={UpdateChangeType} closeModal={handleCloseCourse} id={categoryId} flag={createEditFlag} courseId={courseId}/>
          <Publish show={publish} closeModal={handleClosepublish} isPublish={isPublish}/>
          <DeleteCategory show={categoryDelete} closeModal={handleCloseCategoryDelete} id={categoryId}/> 
          <DeleteCourse show={courseDelete} closeModal={handleCloseCourseDelete} id={courseId}/> 
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
      :
        <></>
      }
    </>
  );
};

export default Categories;
