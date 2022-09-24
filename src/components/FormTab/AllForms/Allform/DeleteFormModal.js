import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormData } from "../../../../actions/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {removeErrorData} from "../../../../actions/RemoveError";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { hideToaster, showToaster } from "../../../../actions/Auth";


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;


const DeleteFormModal = (props) => {
  const { name, id } = props;

  const [Loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");

  const dispatch = useDispatch();

  const deleteForm = useSelector((state) => state.formsData.deleteFormData);

  const error = useSelector(
    (state) => state.error.errorsData
  );

  const isToasterDispay = useSelector(
    (state) => state.authData.isToasterDisplay
  );


  // Toaster
  const notify = () => {
    toast.success("Deleted successfully");
  };

  // Toaster
  const notifyerror = () => {
    toast.error(" Not able to delete");
  };

  useEffect(() => {
    if (deleteForm.status === 204 && isToasterDispay) {
      notify();
      props.closeModal();
      setLoading(false)
      dispatch(hideToaster());
    }

  }, [
    deleteForm
  ]);

  useEffect(() => {
    if(error.status === 500 && isToasterDispay){
      props.closeModal();
      setLoading(false)
      notifyerror();
      dispatch(hideToaster());
    }

}, [
  error
]);

  // delete single data
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(removeErrorData)
    setLoading(true)
    dispatch(showToaster());
    dispatch(deleteFormData(id));
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.closeModal}
        className="delete-modal-wrapper"
      >
        <Modal.Body>
          <div className="confirm-modal-wrapper">
            <div className="cm-title">
              <div className="cm-title-text">CONFIRM</div>
              <div className="cm-title-close">
                {" "}
                <button onClick={props.closeModal} disabled={Loading ? true : false}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/modal-close-dark.svg"
                    }
                    alt="Close"
                  />
                </button>
              </div>
            </div>
            <p className="cm-content">
              Do you want to delete this form? All information about
              this form will be lost
            </p>
            <div className="confirm-cta">
              { Loading ?
                  <div class="spinner-border" role="status"></div>
                  :
                <Link
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  Yes
                </Link>
              }
              <button onClick={props.closeModal} disabled={Loading ? true : false}>
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className={Loading? "loader_div" : ""}>
        <ClipLoader color={color} className="loader" loading={Loading} css={override} size={50} />
      </div>
    </>
  );
};
export default DeleteFormModal;
