import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap'


const DeleteRoleModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.close} className="delete-modal-wrapper">
        <Modal.Body>
          <div className="confirm-modal-wrapper">
            <div className="cm-title">
              <div className="cm-title-text">Delete Role</div>
              <div className="cm-title-close">
                {" "}
                <Link to="#/"  onClick={props.close}>
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
            <div className="confirm-cta">
              <Link>
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

export default DeleteRoleModal
