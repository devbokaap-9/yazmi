import React, {useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {removeErrorData} from "../../../../actions/RemoveError";
import {editFormTitle} from "../../../../actions/Form";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";

//validation
const validationSchema = yup.object({
  title: yup.string().required("Cannot be blank"),
});

const EditFormName = (props) => {
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [updateTitle,setUpdateTitle] = useState(false)

  const dispatch = useDispatch();
  const history = useHistory();

  const { error } = useSelector((state) => state);

  const singleFormData  = useSelector((state) => state.formsData.singleFormData);

  const saveFormTitle = (values) => {
    setBtnClickFlag(true)
    setLoading(true);
    setUpdateTitle(true)
    dispatch(removeErrorData())
    dispatch(editFormTitle(values,singleFormData.id))
  }

  const updatedFormTitleData  = useSelector((state) => state.formsData.updatedFormTitleData);

  useEffect( () => {
    //if success then only execute
    if (updatedFormTitleData.id && btnClickFlag && error.errorsData === '' && updateTitle) {
      props.closeModal();
      setBtnClickFlag(false)
      setLoading(false);
      setUpdateTitle(false)
      toast.success('Form Title Updated');
      history.push('/form/'+updatedFormTitleData.title)
    }
  },[updatedFormTitleData])
  
  useEffect( () => {
    if(error && error.errorsData && btnClickFlag){
      setLoading(false);
      if(error.errorsData.title){
        setBtnClickFlag(false)
      }
    }
  },[error])

  return (
    <Modal show={props.show} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{props.name}</h3>
          <Link className="close-modal-header" onClick={props.closeModal}>
            <img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" />
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ title: singleFormData ? singleFormData.title : ""}}
          validationSchema={validationSchema}
          onSubmit={saveFormTitle}
        >
          {({ values }) => {
          return(
            <Form>
              <div className="modal-form-wrapper broadcast-form-wrapper share_form">
                <div className="uf-single">
                  <div className="uf-label">Edit Name</div>
                  <div className="uf-field">
                    <Field
                      type="text"
                      className="input-yazmi"
                      name="title"
                      value={values.title}
                    />
                    {(!error.errorsData)
                      ?
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-danger error_msg"
                        />
                      :
                        <span className="text-danger error_msg">
                          {error.errorsData && error.errorsData.title
                            ? error.errorsData.title
                            : ""}
                        </span>
                      }
                  </div>
                </div>
                <div className="modal-form-cta">
                  <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Save</button>
                  <button type="button"
                    className="btn-secondary-yazmi"
                    onClick={props.closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default EditFormName
