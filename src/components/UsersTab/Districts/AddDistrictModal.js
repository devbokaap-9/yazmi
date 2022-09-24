import React, { useRef,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { postWoredasData ,getWoredasData} from "../../../actions/Woreda";
import { getRegionsData } from "../../../actions/Region";
import {removeErrorData} from "../../../actions/RemoveError";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {  toast } from 'react-toastify';

//validation
const validationSchema = yup.object({
  name: yup.string().required("Cannot be blank"),
  identification_number: yup.string().required("Cannot be blank"),
  region: yup.string().required("Please select one option"),
});

const validationSchemaForLocationTab = yup.object({
  is_located: yup.string().required("Please select one option"),
});

const AddDistrictModal = (props) => {
  const [addClass, setAddClass] = useState(false);
  const [key, setKey] = useState('Basic');
  const [disable,setDisable] = useState(true)
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)


  const dispatch = useDispatch();
  const formRef = useRef();
  const form1Ref = useRef();

  const { error } = useSelector((state) => state);

  const saveFirstData = (e) => {
   setBtnClickFlag(false)
   dispatch(removeErrorData())
    if(!formRef.current.values.name == "" || !formRef.current.values.identification_number == "" ||  !formRef.current.values.region == "" ){
      setAddClass(true);
      setDisable(false);
      setKey('Location')
    }
  };

  const woredaResData = useSelector(
    (state) =>state.woredaData.addWoredasData
    );
  const handleSave = () => {
    let geolocation = ''
    setBtnClickFlag(true)
    setLoading(true);
    if(formRef.current.values.latitude && formRef.current.values.longitude){
      geolocation = formRef.current.values.latitude +","+formRef.current.values.longitude
    }
    else{
      if(formRef.current.values.latitude){
        geolocation = formRef.current.values.latitude
      }
      else if(formRef.current.values.longitude){
        geolocation = formRef.current.values.longitude
      }
    }

    let save_woreda = {
      name:formRef.current.values.name,
      region:formRef.current.values.region,
      identification_number: formRef.current.values.identification_number,
      zone: formRef.current.values.zone,
      geolocation: geolocation,
      distance_from_addis_abba: form1Ref.current.values.addisababa,
      distance_from_central_region: form1Ref.current.values.centerrigion,
      distance_from_central_zone: form1Ref.current.values.centerzone,
      distance_from_regional_capital: form1Ref.current.values.regionalcapital,
      where_it_is_located:form1Ref.current.values.is_located,
      // group:form1Ref.current.values.group,
    };
    dispatch(postWoredasData(save_woreda));
  };

  useEffect(()=>{
    dispatch(getRegionsData());
  },[])

  const { regionData } = useSelector((state) => state.regionData);
  var { results } = regionData;


  useEffect( () => {
    //if success then only execute
    if (woredaResData.id && props.show && btnClickFlag && error.errorsData === '') {
      props.closeModal();
      setBtnClickFlag(false)
      setLoading(false);
      setAddClass(false);
      setDisable(true);
      setKey('Basic')
      toast.success('Woreda Added');
      dispatch(getWoredasData());
    }
    else{
      if(error && error.errorsData && btnClickFlag){
        setLoading(false);
        if(error.errorsData.identification_number || error.errorsData.geolocation || error.errorsData.name || error.errorsData.region || error.errorsData.zone){
          setBtnClickFlag(false)
          setAddClass(false);
          setDisable(true);
          setKey('Basic')
        }
      }
    }
  },[woredaResData , error])



  return (
    <>
      <Modal show={props.show} onHide={() => {props.closeModal();dispatch(removeErrorData())}} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Add Woreda</h3>
            <p>Add Woreda invidually</p>
            <Link className="close-modal-header" onClick={() => {props.closeModal();dispatch(removeErrorData())}}>
              <img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" />
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            className="mb-0 nav_tab_width"
            onSelect={(k) => setKey(k)}
            activeKey={key}
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="Basic" title="Basic Data">
              <Formik
                initialValues={{ name: "", identification_number: "",region:"","latitude":"","longitude":"","zone":""}}
                validationSchema={validationSchema}
                onSubmit={saveFirstData}
                innerRef={formRef}
              >
              {({ values, handleChange }) => {
              return(
              <Form className="modal-form-wrapper">
              <div className="modal-form-wrapper broadcast-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">Name</div>
                  <div className="uf-field">
                    <Field
                      type="text"
                      name="name"
                      className="input-yazmi"
                      placeholder="Enter name"
                      onChange={handleChange}
                      value={values.name}
                      maxlength="50"
                    />
                    {(!error.errorsData)
                      ?
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger error_msg"
                        />
                      :
                        <span className="text-danger error_msg">
                          {error.errorsData && error.errorsData.name
                            ? error.errorsData.name
                            : ""}
                        </span>
                      }
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">ID Number</div>
                  <div className="uf-field">
                     <Field
                          type="text"
                          className="input-yazmi"
                          placeholder="Enter ID number"
                          name="identification_number"
                          onChange={handleChange}
                          value={values.identification_number}
                        />
                         {(!error.errorsData)
                        ?
                          <ErrorMessage
                            name="identification_number"
                            component="div"
                            className="text-danger error_msg"
                          />
                        :
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.identification_number
                              ? error.errorsData.identification_number
                              : ""}
                          </span>
                        }

                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Geolocation </div>
                  <div className="uf-field uf-field-two">
                    <Field
                      type="number"
                      className="input-yazmi appearance_none"
                      placeholder="Latitude"
                      name="latitude"
                      onChange={handleChange}
                      value={values.latitude}
                    />
                    <Field
                      type="number"
                      className="input-yazmi appearance_none"
                      placeholder="Longitude"
                      name="longitude"
                      onChange={handleChange}
                      value={values.longitude}
                    />
                    <span className="text-danger error_msg">
                      {error.errorsData &&
                      error.errorsData.geolocation
                        ? error.errorsData.geolocation
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Region</div>
                  <div className="uf-field">
                    <select className="search-yazmi" onChange={handleChange} name="region" value={values.region}>
                      <option value="">Select Region</option>
                     {
                          results && results.map((data,key) => 
                            <option value={data.id}>{data.name}</option>
                              
                          )

                        }
                    </select>
                     {(!error.errorsData)
                        ?
                          <ErrorMessage
                            name="region"
                            component="div"
                            className="text-danger error_msg"
                          />
                        :
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.region
                              ? error.errorsData.region
                              : ""}
                          </span>
                        }
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Zone</div>
                  <div className="uf-field">
                    <Field
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter Zone"
                      name="zone"
                      onChange={handleChange}
                      value={values.zone}
                      maxlength="50"
                    />
                    <span className="text-danger error_msg">
                      {error.errorsData &&
                      error.errorsData.zone
                        ? error.errorsData.zone
                        : ""}
                    </span>

                  </div>
                </div>
                <div className="modal-form-cta">
                  <button className="btn-primary-yazmi">Save</button>
                  <button type="button"
                    className="btn-secondary-yazmi"
                    onClick={() => {props.closeModal();dispatch(removeErrorData())}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              </Form>
                )
                }}
              </Formik>
            </Tab>
            <Tab eventKey="Location" title="Location information" disabled={disable}>
              <Formik
                initialValues={{regionalcapital:"", addisababa: "",centerrigion:"",centerzone:"", is_located:"",group:"" }}
                innerRef={form1Ref}
                onSubmit={handleSave}
                validationSchema={validationSchemaForLocationTab}
              >
              {({ values, handleChange  }) => {
              return(
              <Form className="modal-form-wrapper">
              <div className="modal-form-wrapper broadcast-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">
                    Distance From The Regional Capital{" "}
                  </div>
                  <div className="uf-field">
                    <input
                      type="number"
                      className="input-yazmi appearance_none"
                      placeholder="Enter Distance"
                      name="regionalcapital"
                      onChange={handleChange}
                      value={values.regionalcapital}
                    />
                    <span className="text-danger error_msg">
                      {error.errorsData &&
                      error.errorsData.distance_from_regional_capital
                        ? error.errorsData.distance_from_regional_capital
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Distance From Addis Ababa</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter Distance"
                      name="addisababa"
                      onChange={handleChange}
                      value={values.addisababa}
                    />
                    <span className="text-danger error_msg">
                      {error.errorsData &&
                      error.errorsData.distance_from_addis_abba
                        ? error.errorsData.distance_from_addis_abba
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Distance From Central Woreda</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter Distance"
                      name="centerrigion"
                      onChange={handleChange}
                      value={values.centerrigion}
                    />
                    <span className="text-danger error_msg">
                      {error.errorsData &&
                      error.errorsData.distance_from_central_region
                        ? error.errorsData.distance_from_central_region
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Distance From Central Zone</div>
                  <div className="uf-field">
                    <input
                      type="number"
                      className="input-yazmi appearance_none"
                      placeholder="Enter Distance"
                      name="centerzone"
                      onChange={handleChange}
                      value={values.centerzone}
                    />
                    <span className="text-danger error_msg">
                      {error.errorsData &&
                      error.errorsData.distance_from_central_zone
                        ? error.errorsData.distance_from_central_zone
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Where it is Located </div>
                  <div className="uf-field">
                    <select className="search-yazmi" name="is_located" onChange={handleChange} value={values.is_located}>
                      <option value="">Select</option>
                      <option value="CITY">City</option>
                      <option value="RURAL">Rural</option>
                    </select>
                    {(!error.errorsData)
                    ?
                      <ErrorMessage
                        name="is_located"
                        component="div"
                        className="text-danger error_msg"
                      />
                    :
                      <span className="text-danger error_msg">
                        {error.errorsData && error.errorsData.is_located
                          ? error.errorsData.is_located
                          : ""}
                      </span>
                    }
                  </div>
                </div>
                <div className="modal-form-cta">
                  <button className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                  <button type="button"
                    className="btn-secondary-yazmi"
                    onClick={() => {props.closeModal();dispatch(removeErrorData())}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
               </Form>
                  )
                }}
              </Formik>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddDistrictModal;
