import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const BroadcastModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.closeShowBroadcast}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Announcement</h3>
            <p>Send an announcement or an event invite to your users</p>
            <Link
              className="close-modal-header"
              onClick={props.closeShowBroadcast}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/modal-close.svg"}
                alt="close"
              />
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form-wrapper broadcast-form-wrapper">
            <div className="uf-single">
              <div className="uf-label">Select Role</div>
              <div className="uf-field radio-field">
                <div className="radio-field-wrapper">
                  <label className="container-radio">
                    Announcement
                    <input type="radio" defaultChecked="checked" name="radio" />
                    <span className="checkmark-radio"></span>
                  </label>
                </div>
                <div className="radio-field-wrapper">
                  <label className="container-radio">
                    Event Invite
                    <input type="radio" name="radio" />
                    <span className="checkmark-radio"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="uf-single">
              <div className="uf-label">Date of Birth</div>
              <div className="uf-field">
                <input
                  type="date"
                  className="input-yazmi"
                  placeholder="Enter birth date"
                />
              </div>
            </div>
            <div className="uf-single">
              <div className="uf-label">Send to</div>
              <div className="uf-field">
                <input
                  type="text"
                  className="input-yazmi"
                  placeholder="Send message to"
                />
              </div>
            </div>
            <div className="uf-single">
              <div className="uf-label">Your message</div>
              <div className="uf-field">
                <textarea
                  className="input-yazmi"
                  placeholder="Enter your message"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div className="uf-single">
              <div className="uf-label">Upload</div>
              <div className="uf-field upload_file">
                <input type="file" className="upload_input" />
                <button className="btn-grey display-block upload_btn">
                  Upload audio,image,video
                </button>
              </div>
            </div>
            <div className="modal-form-cta broadcast-cta">
              <button className="btn-primary-yazmi">Save</button>
              <button
                className="btn-secondary-yazmi"
                onClick={props.closeShowBroadcast}
              >
                Cancel
              </button>
            </div>
            {/* <h5 className="uf-section-title">Previous Announcements</h5>
            <div className="prev-broadcast-wrapper">
              <div className="pb-single">
                <div className="pbs-left">
                  <p className="prev-broadcast-topic">
                    Hello everyone, please bring your school journals to the
                    schools and we are seeing COVID
                  </p>
                </div>
                <div className="pbs-right">
                  <p className="text-bold">Announcement</p>
                </div>
              </div>
              <div className="pb-single">
                <div className="pbs-left">
                  <p className="text-bold">Attachment: 2</p>
                </div>
                <div className="pbs-right">
                  <p className="text-bold">Tuesday, 9:30 pm</p>
                </div>
              </div>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default BroadcastModal;
