import React, {useState,useRef, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ReactTags from 'react-tag-autocomplete'
import {searchUsersData} from "../../../../actions/User";
import { useDispatch, useSelector } from "react-redux";
import {removeErrorData} from "../../../../actions/RemoveError";
import {shareForm, editFormTitle, formSubmission} from "../../../../actions/Form";
import { toast } from 'react-toastify';

const ShareForm = (props) => {
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [suggestions,setSuggestions] = useState([]);
  const [note,setNote] = useState('')
  const [startBtn,setStartBtn] = useState(false)
  const [errorFlag,setErrorFlag] = useState(false)

  const reactTags = useRef();
  let dispatch = useDispatch();

  const handleDelete = (index) => {
    const newTags = tags.slice(0);
    newTags.splice(index, 1);
    setTags(newTags);
    const newTagsIds = tagIds.slice(0);
    newTagsIds.splice(index, 1);
    setTagIds(newTagsIds);
    setErrorFlag(false)
  };

  const handleAddition = (tag) => {
    if(tag['id'] !== undefined){
      const newTags = [].concat(tags, tag);
      setTags(newTags);
      const newTagsIds = [].concat(tagIds, tag['id']);
      setTagIds(newTagsIds);
    }
  };

  const handleInput = (tag) => {
    if(tag.length >= 1){
      dispatch(searchUsersData(tag))
    }
  }
  // validation error
  const { error } = useSelector((state) => state);

  const searchedUsersData  = useSelector((state) => state.usersData.searchedUserData.results);
  useEffect(()=>{
    let suggestionArray = [];
    if(searchedUsersData){
      searchedUsersData.map(function(value,key){
        suggestionArray.push({'id':value['id'],'name':value['first_name']+' ('+value['username']+')'})
      })
      setSuggestions(suggestionArray)
    }
  },[searchedUsersData])

  const singleFormData = useSelector((state) => state.formsData.singleFormData);

  const sharedFormRes = useSelector((state) => state.formsData.sharedFormData);

  const onSubmit = () => {
    dispatch(removeErrorData())
    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    if(tags.length > 0){
      setBtnClickFlag(true)
      setLoading(true);
      setStartBtn(true);
      let data = {
        'shared_with' : tagIds,
        'note' : note,
        'shared_from' : user_data.profile_id,
        'form' : singleFormData.id
      }
      let formData = {
        "accept_responses" : false
      }
      setErrorFlag(false)
      dispatch(shareForm(data))
      dispatch(editFormTitle(formData,singleFormData.id))
    }
    else{
      if(!errorFlag){
        toast.error('Select Name')
        setErrorFlag(true)
      }
    }
  }

  useEffect( () => {
    //if success then only execute
    if (sharedFormRes.form && props.show && btnClickFlag && error.errorsData === '' && startBtn) {
     
      props.closeModal();
      setBtnClickFlag(false)
      setLoading(false);
      setStartBtn(false)
      setNote("")
      setTags([])
      setErrorFlag(false)
      toast.success('Accepting Response Started');
    }
  },[sharedFormRes])

  useEffect(()=>{
    if(error && error.errorsData && btnClickFlag){
      setLoading(false);
      setBtnClickFlag(false)
      toast.error('Something went Wrong, pls try again!')
    }
  },[error])

  return (
      <Modal show={props.show} onHide={()=>{props.closeModal();setTags([]);setTagIds([]);
        setErrorFlag(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Share Form</h3>
            <p>Share form with Users or User Groups to receive responses</p>
            <Link className="close-modal-header" onClick={()=>{props.closeModal();setTags([]);setTagIds([]);setErrorFlag(false)}}>
              <img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" />
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form-wrapper broadcast-form-wrapper share_form">
            <form>
              <div className="uf-single">
                <div className="uf-label">Send to</div>
                <div className="uf-field react__tag_div">
                  {/* <input
                    type="text"
                    className="input-yazmi"
                    placeholder="Enter name"
                  /> */}
                  <ReactTags
                    ref={reactTags}
                    tags={tags}
                    suggestions={suggestions}
                    allowNew
                    onDelete={handleDelete}
                    onAddition={handleAddition}
                    onInput={handleInput}
                    placeholderText="Enter name"
                  />
                </div>
              </div>
              {/* <div className="uf-single">
                <div className="uf-label">Message</div>
                <div className="uf-field">
                  <textarea
                    type="text"
                    className="input-yazmi"
                    placeholder="Upload Your message here..."
                    rows="4"
                    name="note"
                    maxlength="500"
                    onChange={(e)=>{setNote(e.target.value)}}
                  />
                </div>
              </div> */}
              <div className="modal-form-cta">
                <button className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false} type="button" onClick={onSubmit}>Start Accepting Responses</button>
                <button
                  className="btn-secondary-yazmi"
                  onClick={()=>{props.closeModal();setTags([]);setTagIds([]);setErrorFlag(false)}}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default ShareForm
