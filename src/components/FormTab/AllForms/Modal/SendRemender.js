import React from 'react'
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const SendRemender = (props) => {
    return (
        <Modal show={props.show} onHide={props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>Send Reminder</h3>
              <p>Send Reminder Notification to submit responses</p>
              <Link className="close-modal-header" onClick={props.closeModal}>
                <img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" />
              </Link>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <div className="modal-form-wrapper broadcast-form-wrapper share_form send_remender">
                  <div className="uf-single">
                    <div className="uf-label">Send to</div>
                    <div className="uf-field">
                      <button className="btn">{props.name}</button>
                    </div>
                  </div>
                  <div className="uf-single">
                    <div className="uf-label">Message</div>
                    <div className="uf-field">
                      <textarea
                        type="text"
                        className="input-yazmi"
                        placeholder="Type Your message here..."
                        rows="4"
                      />
                    </div>
                  </div>
                  <div className="modal-form-cta">
                    <button className="btn-primary-yazmi">Send</button>
                    <button
                      className="btn-secondary-yazmi"
                      onClick={props.closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
          </Modal.Body>
        </Modal>
    )
}

export default SendRemender
