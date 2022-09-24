import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoleData } from '../../../actions/Role';
import { toast } from 'react-toastify';

const DeleteRoleTeacherModal = (props) => {
  const { id,name } = props
  const [roleBtn,setRoleBtn] = useState(false)

  const dispatch = useDispatch();
  
  const roleDeleteData = useSelector((state) => state.rolesData.roleDeleteData);
  useEffect(() => {
    if(roleDeleteData && roleDeleteData.status === 204 && roleBtn && name === "deleteRole"){
      setRoleBtn(false)
      toast.success('Role Deleted');
      props.close()
    }
  },[roleDeleteData])

  const handleYes = (e) => {
    e.preventDefault()
    if(name === "deleteRole"){
      setRoleBtn(true)
      dispatch(deleteRoleData(id,!props.groupByLevel))
    }
  }

  

    return (
        <Modal show={props.show} onHide={props.close} className="delete-modal-wrapper">
        <Modal.Body>
          <div className="confirm-modal-wrapper">
            <div className="cm-title">
              <div className="cm-title-text">Delete Role : Teacher</div>
              <div className="cm-title-close">
                {" "}
                <Link to="#/" onClick={props.close}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/modal-close-dark.svg"
                    }
                    alt="Close"
                  />
                </Link>
              </div>
            </div>
            <p className="cm-content delete-role">Do you want to delete this role?</p>
            <p className="cm-content user-in-role"><strong>You have 0 users in this role</strong></p>
            <div className="reassign-role-wrapper">
              <div className="rr-left">
                Reassign New Role
              </div>
              <div className="rr-right">
                <select className="search-yazmi">
                  <option value="">Select New Role</option>
                  <option value="">Role 1</option>
                  <option value="">Role 2</option>
                  <option value="">Role 3</option>
                </select>
              </div>
            </div>
            <p className="cm-content reassign-roles-note">You can reassign new roles to everyone individually via the User Section</p>
            <div className="confirm-cta">
              <Link onClick={(e)=>{handleYes(e)}}>
                Yes
              </Link>
              <Link onClick={props.close}>
                No
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default DeleteRoleTeacherModal
