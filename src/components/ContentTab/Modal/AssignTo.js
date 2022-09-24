import React,{useState,useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ReactTags from 'react-tag-autocomplete'
import {searchUsersData} from "../../../actions/User";
import { useDispatch, useSelector } from "react-redux";
import {removeErrorData} from "../../../actions/RemoveError";
import {courseAssignTo} from "../../../actions/Content";
import { toast } from 'react-toastify';

const AssignTo = (props) => {
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [suggestions,setSuggestions] = useState([]);
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

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  const onSubmit = () => {
    dispatch(removeErrorData())
    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    if(tags.length > 0){
      setBtnClickFlag(true)
      setLoading(true);
      let data = {
        'shared_with' : tagIds,
        'shared_from' : user_data.profile_id,
        'course' : courseDetailsData.id,
        "is_compulsory" : true
      }
      setErrorFlag(false)
      dispatch(courseAssignTo(data))
    }
    else{
      if(!errorFlag){
        toast.error('Select Name')
        setErrorFlag(true)
      }
    }
  }

  const assignCourseRes = useSelector((state) => state.contentData.assignCourseDataRes);

  useEffect( () => {
    //if success then only execute
    if (assignCourseRes.course && props.show && btnClickFlag && error.errorsData === '') {
     
      props.closeModal();
      setBtnClickFlag(false)
      setLoading(false);
      setTags([])
      setErrorFlag(false)
      toast.success('Course Assigned');
    }
  },[assignCourseRes])

  useEffect(()=>{
    if(error && error.errorsData && btnClickFlag){
      setLoading(false);
      setBtnClickFlag(false)
      toast.error('Something went Wrong, pls try again!')
    }
  },[error])

  return (
    <Modal show={props.show} onHide={()=>{props.closeModal();setTags([]);setTagIds([]);setErrorFlag(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Assign To</h3>
          <p>Select Users to Assign this course to</p>
          <Link
            className="close-modal-header"
            onClick={()=>{props.closeModal();setTags([]);setTagIds([]);setErrorFlag(false)}}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/modal-close.svg"}
              alt="close"
            />
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form-wrapper broadcast-form-wrapper share_form send_remender">
          <div className="uf-single">
            <div className="uf-label">Send To</div>
            <div className="uf-field react__tag_div">
              {/* <input type="text" className="input-yazmi" /> */}
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
            <div className="uf-label">Assigned To</div>
          </div>
          <div className="uf-single">
            <div className="uf-label">Grade 2</div>

            <div className="uf-field">
              <span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                    fill="#666666"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="uf-single">
            <div className="uf-label">Grade 3</div>

            <div className="uf-field">
              <span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                    fill="#666666"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="uf-single">
            <div className="uf-label">Grade 4</div>

            <div className="uf-field">
              <span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z"
                    fill="#666666"
                  />
                </svg>
              </span>
            </div>
          </div> */}
          
          <div className="modal-form-cta">
            <button className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false} type="button" onClick={onSubmit}>Assign</button>
            <button type="button" className="btn-secondary-yazmi" onClick={()=>{props.closeModal();setTags([]);setTagIds([]);setErrorFlag(false)}} type="button">
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssignTo;
