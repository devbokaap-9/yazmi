import React,{ useEffect, useContext} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRolesDataForSidebar, getRolesData } from "../../actions/Role";
import { UserContext } from '../../UserContext';
import checkPermission from "../../utils/CheckPermission"

const RoleTab = (props) => {

  const dispatch = useDispatch();

  const userContext = useContext(UserContext);

  useEffect(()=>{
    dispatch(getRolesDataForSidebar())
  },[])
  
  const fetchRolesData = useSelector((state) => state.rolesData.rolesDataForSidebar.results);

  const removeSideBar = () => {
    props.classRemove();
  };


  let location = useLocation();
  let history = useHistory();
  useEffect(()=>{
    if(location.pathname.includes("roles") || location.pathname.includes("role")){
      history.push('/roles')
    }
  },[])

  return (
    <>
      <div className="UserSidebar">
        {(checkPermission('custom_role_data_created')) || (checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_get')) || (checkPermission('custom_role_operation_share') || (checkPermission('custom_role_data_all')))
        ?
          <ul className="list-unstyled">
            <li>
              <Link
                to="/roles"
                className={
                  "Link_text" +
                  (location.pathname === "/roles" ? " users_box_active" : "")
                }
                onClick={()=>{removeSideBar();userContext.setRLevel(true)}}
              >
                <div className="users_box d-flex align-items-center justify-content-between">
                  <p className="mb-0 ml-2">All Roles</p>
                </div>
              </Link>
            </li>

            <li>
              <Link
                to="/role/federal"
                className={"Link_text" + (location.pathname === "/role/federal" ? " users_box_active" : "")}
                onClick={()=>{props.classRemove();userContext.setRLevel(true)}}
              >
                <div className="users_box d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">Federal</p>
                  </div>
                </div>
              </Link>
              <div className={location.pathname.includes("/role/federal") ? "dropdown d-block" : "dropdown d-none" }>
                <ul className="list-unstyled">
                  {fetchRolesData &&
                          fetchRolesData.map((data) => {
                    return(
                      (data.level === 1)
                      ?
                        <>
                          <li>
                            <Link
                              // to="/role/federals"
                              className="Link_text"
                              activeClassName="users_box_active"
                              onClick={ (event) => event.preventDefault() }
                            >
                              {data.title}
                            </Link>
                          </li>
                          {data.subroles &&
                            data.subroles.map((subdata) => {
                              return(
                                <li>
                                  <Link
                                    // to="/role/federals"
                                    className="Link_text"
                                    activeClassName="users_box_active"
                                    onClick={ (event) => event.preventDefault() }
                                  >
                                    {subdata.title}
                                  </Link>
                                </li>
                              )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </ul>
              </div>
            </li>


            <li>
              <Link
                to="/role/regional"
                className={"Link_text" + (location.pathname === "/role/regional" ? " users_box_active" : "")}
                onClick={()=>{props.classRemove();userContext.setRLevel(true)}}
              >
                <div className="users_box d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">Regional</p>
                  </div>
                </div>
              </Link>
              <div className="dropdown" className={location.pathname.includes("/role/regional") ? "dropdown d-block" : "dropdown d-none" }>
                <ul className="list-unstyled">
                  {fetchRolesData &&
                          fetchRolesData.map((data) => {
                    return(
                      (data.level === 2)
                      ?
                        <>
                          <li>
                            <Link
                              // to="/role/regional"
                              className="Link_text"
                              activeClassName="users_box_active"
                              onClick={ (event) => event.preventDefault() }
                            >
                              {data.title}
                            </Link>
                          </li>
                          {data.subroles &&
                            data.subroles.map((subdata) => {
                              return(
                                <li>
                                  <Link
                                    // to="/role/regional"
                                    className="Link_text"
                                    activeClassName="users_box_active"
                                    onClick={ (event) => event.preventDefault() }
                                  >
                                    {subdata.title}
                                  </Link>
                                </li>
                              )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </ul>
              </div>
            </li>


            <li>
              <Link
                to="/role/woreda"
                className={"Link_text" + (location.pathname === "/role/woreda" ? " users_box_active" : "")}
                onClick={()=>{props.classRemove();userContext.setRLevel(true)}}
              >
                <div className="users_box d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">Woreda</p>
                  </div>
                </div>
              </Link>
              <div className="dropdown" className={location.pathname.includes("/role/woreda") ? "dropdown d-block" : "dropdown d-none" }>
                <ul className="list-unstyled">
                  {fetchRolesData &&
                          fetchRolesData.map((data) => {
                    return(
                      (data.level === 3)
                      ?
                        <>
                          <li>
                            <Link
                              // to="/role/woreda"
                              className="Link_text"
                              activeClassName="users_box_active"
                              onClick={ (event) => event.preventDefault() }
                            >
                              {data.title}
                            </Link>
                          </li>
                          {data.subroles &&
                            data.subroles.map((subdata) => {
                              return(
                                <li>
                                  <Link
                                    // to="/role/woreda"
                                    className="Link_text"
                                    activeClassName="users_box_active"
                                    onClick={ (event) => event.preventDefault() }
                                  >
                                    {subdata.title}
                                  </Link>
                                </li>
                              )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </ul>
              </div>
            </li>

            <li>
              <Link
                to="/role/schools"
                className={"Link_text" + (location.pathname === "/role/schools" ? " users_box_active" : "")}
                onClick={()=>{props.classRemove();userContext.setRLevel(true)}}
              >
                <div className="users_box d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">School</p>
                  </div>
                </div>
              </Link>
              <div className="dropdown" className={location.pathname.includes("/role/schools") ? "dropdown d-block" : "dropdown d-none" }>
                <ul className="list-unstyled">
                  {fetchRolesData &&
                          fetchRolesData.map((data) => {
                    return(
                      (data.level === 4)
                      ?
                        <>
                          <li>
                            <Link
                              // to="/role/schools"
                              className="Link_text"
                              activeClassName="users_box_active"
                              onClick={ (event) => event.preventDefault() }
                            >
                              {data.title}
                            </Link>
                          </li>
                          {data.subroles &&
                            data.subroles.map((subdata) => {
                              return(
                                <li>
                                  <Link
                                    // to="/role/schools"
                                    className="Link_text"
                                    activeClassName="users_box_active"
                                    onClick={ (event) => event.preventDefault() }
                                  >
                                    {subdata.title}
                                  </Link>
                                </li>
                              )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </ul>
              </div>
            </li>
          </ul>
        :
          <></>
        }
      </div>

    </>
  );
};
export default RoleTab;
