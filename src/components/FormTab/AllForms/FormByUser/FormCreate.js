import React, { useState, useEffect, useContext, useRef } from "react";
import { Tab, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import MultichoiceGrid from "./FormUserComponent/MultichoiceGrid";
import MultipleChoiceQuestion from "./FormUserComponent/MultipleChoiceQuestion";
import MultiGridDetailedPage from "./FormUserComponent/MultiGridDetailedPage";
import Responses from "./FormUserTab/Responses";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { removeErrorData } from "../../../../actions/RemoveError";
import {
  addFormHeader,
  addFormSection,
  deleteHeaderSectionQuestion,
  editheadertitle,
  editsectiontitle,
  addFormQuestion,
  addFormSectionQuestion,
  deleteQuestionOfSection,
  editQualitativeQuestionaction,
  editqualitativeSectionAction,
} from "../../../../actions/Form";
import { UserContext } from "../../../../UserContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import checkPermission from "../../../../utils/CheckPermission";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const FormCreate = () => {
  const [key, setKey] = useState("title");
  const [qustionsType, setQustionsType] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disable1, setDisable1] = useState(true);
  const [btnClickFlag, setBtnClickFlag] = useState(false);
  const [duplicateFlag, setDuplicateFlag] = useState(false);
  const [name, setName] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [headerPopover, setHeaderPopover] = useState(false);
  let [disableBtn, setDisableBtn] = useState(true);

  const [FormId, setFormId] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [foucusId, setFoucusId] = useState();
  const [getIdheader, setGetIdheader] = useState("");
  const [headerOrder, setHeaderOrder] = useState("");
  const [updatedheaderTitle, setHeaderTitle] = useState("");
  const [updatedHeaderDescription, setHeaderDescription] = useState("");
  const [headerData, setHeaderData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const [inputCount, setInputCount] = useState(0);

  // edit section
  const [editSection, setEditSection] = useState("");
  const [editSectionId, setEditSectionId] = useState("");
  const [updatedsectionTitle, setSectionTitle] = useState("");
  const [updatedsectionDescription, setSectionDescription] = useState("");
  const [sectionOrder, setSectionOrder] = useState("");
  const [updateSectionLenght, setSectionLength] = useState("");

  // edit question section
  const [editQuestionSection, setEditQuestionSection] = useState("");

  //  Qualitative Question
  const [editQualitativeQuestion, setEditQualitativeQuestion] = useState("");
  const [updateQualitativeQuestionDescription,setQualitativeQuestionDescription,] = useState("");
  const [updateQualitativeQuestionTitle, setQualitativeQuestionTitle] =useState("");
  const [updateQualitativeOrder, setEditQualitativeOrder] = useState("");

  // Qualitative Sections in sections
  const [QualitativeSectionId, setQualitativeSectionId] = useState("");
  const [updateQualitativeTtile, setQualitativeTtile] = useState("");
  const [updateQualitativeDescription, setQualitativeDescription] = useState("");
  const [qualitativeSectionOrder, setQualitativeSectionOrder] = useState("");
  const [SectionQId, setSectionQId] = useState("");
  const [QuestionQuesId, setQuestionId] = useState("");

  //  Multiple Choice Question in Section
  const [EditMultiChoiceInSectionId, setEditMultiChoiceInSectionId] = useState("");
  const [MultipleQuestionSectionTitle, setMultipleQuestionSectionTitle] = useState("");
  const [MultipleQuestionSectionDescription,setMultipleQuestionSectionDescription] = useState("");
  const [EditmultiChoiceIdInSection,setEditmultiChoiceIdInSection] = useState("");
  const [EditmultiChoiceOrderInSection,setEditmultiChoiceOrderInSection] = useState("");
  const [EditQuestionId_Section,setEditQuestionId_Section] = useState("");
  // const [setMultiChoiceLength,setMultiChoiceLength] = useState("");

  const [ContentType, setContentType] = useState("");

  //  Multiple Choice Question
  const [editMultipleChoiceQuestionId, setEditMultipleChoiceQuestionId] = useState("");
  const [updateMultipleQuestionTitle, setMultipleQuestionTitle] = useState("");
  const [updateMultipleChoiceOrder, setMultipleChoiceOrder] = useState("");
  const [AddOptionsMultiChoice, setaddOptionsMultiChoice] = useState(false);

  //  multi grid Question
  const [EditMultiGridQuestionId, setEditMultiGridQuestionId] = useState("");
  const [updateSectionName, setSectionName] = useState("");
  const [updateMultiGrideTitleInSection, setMultiGrideTitleInSection] = useState("");
  
  //  multi grid Question
  const [ContentId, setContentId] = useState("");
  const [Section_Id, setSection_Id] = useState("");
  const [updateRemoveId, setRemoveId] = useState(false);


  let dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const formRef = useRef();
  const questionformRef = useRef();
  const sectionformRef = useRef();
  
  const gridCallback = () =>{
    
    setEditTitle("")
    setEditQualitativeQuestion("")
    setEditMultipleChoiceQuestionId("")
    setEditQuestionSection("")
    setEditMultiChoiceInSectionId("")
    setQualitativeSectionId("")
  }

  const handleQuestions = (e) => {
    setQustionsType(e.target.value);
  };

  //header validation
  const validationSchema = yup.object({
    title: yup.string().required("Cannot be blank"),
  });

  //section validation
  const sectionValidationSchema = yup.object({
    title: yup.string().required("Cannot be blank"),
  });

  //question validation
  const questionValidationSchema = yup.object({
    title: yup.string().required("Cannot be blank"),
  });

  const singleFormData = useSelector((state) => state.formsData.singleFormData);

  let getSectionsDataLength =
    singleFormData &&
    singleFormData.items.filter((data) => data.content_type_name === "section");

  // useEffect(() => {
  //   setSectionLength(getSectionsDataLength.length)
  // }, [getSectionsDataLength.length])

  useEffect(() => {
    setFormId(singleFormData.id);
    setHeaderData([]);
    setSectionData([]);
    setQuestionData([]);
    setEditTitle("");
    setGetIdheader("");
    setHeaderOrder("");
    
    
    setSectionLength(getSectionsDataLength.length);
    userContext.setRemoveIdForUser(false)
    //when changing form
    if (!userContext.frmUpdating) {
      setQustionsType("");
    }
    if (
      singleFormData &&
      singleFormData.items &&
      singleFormData.items.length > 0
    ) {
      userContext.setFrmUpdating(true);
      let headersData = singleFormData.items.filter(
        (data) => data.content_type_name === "header"
      );
      setHeaderData(headersData);
      let sectionsData = singleFormData.items.filter(
        (data) => data.content_type_name === "section"
      );
      setSectionData(sectionsData);
      let questionsData = singleFormData.items.filter(
        (data) => data.content_type_name === "question"
      );
      setQuestionData(questionsData);
    }
    if (!btnClickFlag) {
      if (userContext.formLdng) {
        setKey("title");
      }
      if (
        singleFormData &&
        singleFormData.items &&
        singleFormData.items.length > 0
      ) {
        if (headerData) {
          setDisable(false);
          setDisable1(false);
        }
      } else {
        setDisable(true);
        setDisable1(true);
      }
    } else {
      if (
        (formHeaderData.id ||
          formSectionData.id ||
          deleteHeaderData.status === 204 ||
          deleteSectionData.status === 204) &&
        error.errorsData === ""
      ) {
        setBtnClickFlag(false);
      }
    }
  }, [singleFormData]);

  //calling add form header API
  const headerSubmit = (values) => {
    if (key === "title") {
      setLoading(true);
      setBtnClickFlag(true);
      userContext.setFrmUpdating(false);
      dispatch(removeErrorData());
      setDeleteLoading(true);
      let order =
        singleFormData && singleFormData.items && singleFormData.items[0]
          ? singleFormData.items[singleFormData.items.length - 1].order
          : 0;
      let data = {
        content_object: {
          title: values.title,
          description: values.description,
        },
        order: order + 1,
        form: singleFormData.id,
        content_type: "header",
      };
      let editdata = {
        content_object: {},
        order: headerOrder,
      };
      if (updatedheaderTitle !== "") {
        editdata.content_object.title = updatedheaderTitle;
      }
      if (updatedHeaderDescription !== "") {
        editdata.content_object.description = updatedHeaderDescription;
      }
      if (getIdheader === "") {
        dispatch(addFormHeader(data));
      } else {
        dispatch(editheadertitle(editdata, singleFormData.id, getIdheader));
      }
    }
  };

  const titleChange = (e) => {
    setHeaderTitle(e.target.value);
    if(e.target.value === ""){
      setLoading(true)
    }else{
      setLoading(false)
    }
  };

  const descriptionChange = (e) => {
    setHeaderDescription(e.target.value);
  };

  const formHeaderData = useSelector(
    (state) => state.formsData.saveFormHeaderData
  );

  useEffect(() => {
    //if success then only execute
    if (
      formHeaderData.id &&
      (btnClickFlag || duplicateFlag) &&
      error.errorsData === "" &&
      key === "title"
    ) {
      setLoading(false);
      setDisable(false);
      setDisable1(false);
      setDeleteLoading(false);
      if (btnClickFlag) {
        setBtnClickFlag(false);
        formRef.current.values.title = "";
        formRef.current.values.description = "";
        setKey('section')
        toast.success("Form Header Added");
      } else if (duplicateFlag) {
        setDuplicateFlag(false);
        toast.success("Dupication of Form Header");
      }
    }
  }, [formHeaderData]);

  const editHeaderData = useSelector(
    (state) => state.formsData.updatetitlefromheader
  );

  useEffect(() => {
    //if success then only execute
    if (
      editHeaderData.id &&
      btnClickFlag &&
      error.errorsData === "" &&
      key === "title"
    ) {
      setBtnClickFlag(false);
      setLoading(false);
      setGetIdheader("");
      setHeaderOrder("");
      setEditTitle("");
      setHeaderTitle("");
      setHeaderDescription("");
      setDeleteLoading(false);
      setKey('section')
      toast.success("Form Header Updated");
    }
  }, [editHeaderData]);

  const removeHeaderPopover = () => {
    const element = document.querySelector(".header-part");
    element.classList.remove("show");
    // element.parentNode.empty()
    document.querySelector(".header-part").parentNode.style.display = "none";
  };

  //delete header/section
  const deleteHeaderSectionQuestionFunction = (
    id,
    formId,
    elementName,
    sectionId
  ) => {
    setBtnClickFlag(true);
    setDeleteLoading(true);
    const element = document.querySelector(".header" + id);
    if(element){
      element.classList.remove("show");
    }
    if (elementName === "headers") {
      setHeaderData([]);
    } else if (elementName === "sections") {
      setSectionData([]);
    } else if (
      elementName === "questions" ||
      elementName === "sectionquestions"
    ) {
      setQuestionData([]);
    }
    if (
      elementName === "headers" ||
      elementName === "sections" ||
      elementName === "questions"
    ) {
      dispatch(deleteHeaderSectionQuestion(id, formId, elementName));
    } else if (elementName === "sectionquestions") {
      dispatch(deleteQuestionOfSection(id, formId, sectionId));
    }
  };

  const deleteGridQuestion = (id,sectionId) => {
    let elementName = "questions"
    if(sectionId !== ""){
      elementName = "sectionquestions"
    }
    deleteHeaderSectionQuestionFunction(id,singleFormData.id,elementName,sectionId)
  }

  const addHeaderClass = (headerId) => {
    // const element = document.querySelector(".header"+headerId);
    // if(element !== null){
    // }
  };

  if (foucusId !== null) {
    let getId = document.getElementById(foucusId);
  }

  const deleteHeaderData = useSelector(
    (state) => state.formsData.deleteHeaderFormData
  );

  useEffect(() => {
    if (deleteHeaderData.status === 204) {
      setDeleteLoading(false);
      toast.success("Header Deleted");
    }
  }, [deleteHeaderData]);

  const deleteSectionData = useSelector(
    (state) => state.formsData.deleteFormSectionData
  );

  useEffect(() => {
    if (deleteSectionData.status === 204) {
      setSectionLength(getSectionsDataLength.length);
      setDeleteLoading(false);
      toast.success("Section Deleted");
    }
  }, [deleteSectionData]);

  const deleteQuestionData = useSelector(
    (state) => state.formsData.deleteFormQuestionData
  );

  useEffect(() => {
    if (deleteQuestionData.status === 204) {
      setDeleteLoading(false);
      toast.success("Question Deleted");
    }
  }, [deleteQuestionData]);

  const deleteSectionQuestionData = useSelector(
    (state) => state.formsData.deleteFormSectionQuestionData
  );

  useEffect(() => {
    if (deleteSectionQuestionData.status === 204) {
      setDeleteLoading(false);
      toast.success("Question Deleted");
    }
  }, [deleteSectionQuestionData]);

  //calling add section API
  const sectionSubmit = (values) => {
    setLoading(true);
    setBtnClickFlag(true);
    dispatch(removeErrorData());
    // setQustionsType("");
    userContext.setFrmUpdating(false);
    setDeleteLoading(true);
    let order =
      singleFormData && singleFormData.items && singleFormData.items[0]
        ? singleFormData.items[singleFormData.items.length - 1].order
        : 0;
    if (values !== undefined) {
      var sectionData = {
        content_object: {
          title: values.title,
          description: values.description,
        },
        order: order + 1,
        form: singleFormData.id,
        content_type: "section",
      };
    }
    let editData = {
      content_object: {},
      order: sectionOrder,
    };
    if (updatedsectionTitle !== "") {
      editData.content_object.title = updatedsectionTitle;
    }
    if (updatedsectionDescription !== "") {
      editData.content_object.description = updatedsectionDescription;
    }
    if (editSectionId === "") {
      dispatch(addFormSection(sectionData));
    } else {
      dispatch(editsectiontitle(editData, singleFormData.id, editSectionId));
    }
  };

  const formSectionData = useSelector(
    (state) => state.formsData.saveFormSectionData
  );

  useEffect(() => {
    //if success then only execute
    if (
      formSectionData.id &&
      (btnClickFlag || duplicateFlag) &&
      error.errorsData === "" &&
      key === "section"
    ) {
      // setBtnClickFlag(false)
      setLoading(false);
      setDeleteLoading(false);
      setKey("question");
      if (btnClickFlag) {
        setBtnClickFlag(false);
        sectionformRef.current.values.title = "";
        sectionformRef.current.values.description = "";
        toast.success("Form Section Added");
      } else if (duplicateFlag) {
        setDuplicateFlag(false);
        toast.success("Dupication of Form Section");
      }
    }
  }, [formSectionData]);

  const { error } = useSelector((state) => state);
  useEffect(() => {
    if (error && error.errorsData && btnClickFlag) {
      setLoading(false);
      if (error.errorsData.title || error.errorsData.description) {
        setBtnClickFlag(false);
        setDisable(true);
        setDisable1(true);
        setKey("title");
      }
    }
  }, [error]);

  const removeQuestionPoover = () => {
    const element = document.querySelector(".question");
    element.classList.remove("show");
  };

  // Edit title
  const handleEitTitle = (id) => {
    setEditTitle(id[0]);
    setGetIdheader(id[1]);
    setFoucusId(id[0]);
    setHeaderOrder(id[2]);
  };

  const handleDuplicateHeader = (title, description) => {
    // let From_title = document.getElementById("formTitle")
    // let copyRow = From_title.firstElementChild.cloneNode(true);
    // From_title.appendChild(copyRow)
    setLoading(true);
    setDuplicateFlag(true);
    userContext.setFrmUpdating(false);
    dispatch(removeErrorData());
    setDeleteLoading(true);
    let order =
      singleFormData && singleFormData.items && singleFormData.items[0]
        ? singleFormData.items[singleFormData.items.length - 1].order
        : 0;
    let data = {
      content_object: {
        title: title,
        description: description,
      },
      order: order + 1,
      form: singleFormData.id,
      content_type: "header",
    };
    dispatch(addFormHeader(data));
  };

  const handleinput = (e) => {};

  // edit section
  const handleEditSection = (id) => {
    setEditSection(id[0]);
    setEditSectionId(id[1]);
    setSectionOrder(id[2]);
  };

  const handleEditSectionQuestion = (id) => {
    setEditQuestionSection(id[0]);
    setEditSectionId(id[1]);
    setSectionOrder(id[2]);
    setQualitativeSectionId("")
    setEditMultiChoiceInSectionId("")
    setEditQualitativeQuestion("")
    setEditMultiGridQuestionId("")
    setEditMultiGridQuestionId("")
  };

  const sectionChange = (e) => {
    setSectionTitle(e.target.value);
    if(e.target.value === ""){
      setLoading(true)
    }else{
      setLoading(false)
    }
  };

  const sectiondescriptionChange = (e) => {
    setSectionDescription(e.target.value);
  };

  const editSectionData = useSelector(
    (state) => state.formsData.updatesectionfromheader
  );

  useEffect(() => {
    if (
      editSectionData.id &&
      btnClickFlag &&
      error.errorsData === "" &&
      (key === "section" || key === "question")
    ) {
      setBtnClickFlag(false);
      setLoading(false);
      setEditSectionId("");
      setSectionTitle("");
      setSectionDescription("");
      setSectionOrder("");
      setDeleteLoading(false);
      setKey("question")
      toast.success("Form Section Updated");
    }
  }, [editSectionData]);

  // section duplicate
  const handleSectionDuplicate = (title, description) => {
    setLoading(true);
    setDuplicateFlag(true);
    userContext.setFrmUpdating(false);
    dispatch(removeErrorData());
    setDeleteLoading(true);
    let order =
      singleFormData && singleFormData.items && singleFormData.items[0]
        ? singleFormData.items[singleFormData.items.length - 1].order
        : 0;
    let data = {
      content_object: {
        title: title,
        description: description,
      },
      order: order + 1,
      form: singleFormData.id,
      content_type: "section",
    };
    dispatch(addFormSection(data));
  };

  const handleRemove = (e) => {
    setBtnClickFlag(true);
    setLoading(true);
    let getId = e.target.id || e.target.parentNode.id;

    if (getId) {
      let getParentdiv = document.getElementById(getId).parentNode.parentNode;

      if (getParentdiv.childNodes[0].childNodes[1] !== null) {
        setBtnClickFlag(false);
        setLoading(false);
      }

      // get lenght
      if (getParentdiv) {
        var getLenght = document.getElementById("multichoice_div").childNodes.length;
        if (getLenght > 1) {
          // setaddOptionsMultiChoice(true)
          getParentdiv.remove();
        }
      }
    }
  };
  // add row
  const handleAddRow = () => {
    let getTotalLength = document.getElementsByClassName(
      "editmultichoiceQuestion"
    ).length;
    var addDivRow = document.getElementById("multichoice_div");
    if (addDivRow.childNodes[0]) {
      var copyRow = addDivRow.childNodes[0].cloneNode(true);
      
      copyRow.childNodes[0].childNodes[1].value = "";
      copyRow.childNodes[0].childNodes[1].placeholder = "Options";
      copyRow.childNodes[1].childNodes[0].id = getTotalLength + 1;
      setaddOptionsMultiChoice(true);
    }

    addDivRow.appendChild(copyRow);
    setInputCount(inputCount );


    // get remove button
    let removeButton = copyRow.childNodes[1].childNodes[0];

    // call remove function
    removeButton.addEventListener("click", function (e) {
      handleRemove(e);
    });
  };

  const handleAddRowInSection = (e) => {
    let getId = e.target.parentNode.parentNode.childNodes[1].id
    var addDiRow = document.getElementById(getId);
    var copyRow = addDiRow.childNodes[0].cloneNode(true);
    
      copyRow.childNodes[0].childNodes[1].value = "";
      copyRow.childNodes[0].childNodes[1].placeholder = "Options";
      copyRow.childNodes[1].childNodes[0].id = inputCount;
    //   setaddOptionsMultiChoice(true);

    addDiRow.appendChild(copyRow);
    setInputCount(inputCount + 1);

    // get remove button
    let removeButton = copyRow.childNodes[1].childNodes[0];

    // call remove function
    removeButton.addEventListener("click", function (e) {
      handleRemoveInSection(e);
    });
  }


  const handleRemoveInSection = (e) => {
    let GetId = e.target.id || e.target.parentNode.id;
    
    if (GetId) {
      let getParentDiv = document.getElementById(GetId).parentNode.parentNode
      // setMultiChoiceLength(getParentDiv.childNodes.length)

      if (getParentDiv.childNodes[0].childNodes[1] !== null) {
        setBtnClickFlag(false);
        setLoading(false);
      }

      // get lenght
      // if (getParentDiv) {
        var getLenght = document.getElementById(EditMultiChoiceInSectionId).childNodes.length;
        if (getLenght > 1) {
          getParentDiv.remove();
        }
      // }
    }


  }
    
  //question part

  const questionSubmit = (values) => {
    // userContext.setFrmUpdating(false);
    setBtnClickFlag(true)
    if (editQuestionSection !== "") {
      sectionSubmit();
    } else if (
      editQualitativeQuestion ||
      editMultipleChoiceQuestionId ||
      AddOptionsMultiChoice
    ) {
      setLoading(true);
      dispatch(removeErrorData());
      setDeleteLoading(true);
      if (ContentType === "QUALITATIVE" && QualitativeSectionId === "") {
        let editData = {
          content_object: {},
          order: updateQualitativeOrder,
        };
        if (updateQualitativeQuestionTitle !== "") {
          editData.content_object.title = updateQualitativeQuestionTitle;
        }
        if (updateQualitativeQuestionDescription !== "") {
          editData.content_object.description =
            updateQualitativeQuestionDescription;
        }
        dispatch(editQualitativeQuestionaction(editData,FormId,editQualitativeQuestion));
      }
      else if (ContentType === "MULTIPLECHOICE") {
        let multiChoiceQuestionInput = document.getElementsByClassName(
          "editmultichoiceQuestion"
        );
        let multiChoiceQuestionOptions = [];
        for (let i = 0; i < multiChoiceQuestionInput.length; i++) {
          if (multiChoiceQuestionInput[i].value) {
            multiChoiceQuestionOptions.push(multiChoiceQuestionInput[i].value);
          }
        }

        let editData = {
          content_object: {},
          order: updateMultipleChoiceOrder,
        };
        if (updateMultipleQuestionTitle !== "") {
          editData.content_object.title = updateMultipleQuestionTitle;
        }
        editData.content_object.options = Object.assign(
          {},
          multiChoiceQuestionOptions
        );
        editData.content_object.type = "MULTIPLECHOICE";
        dispatch(editQualitativeQuestionaction(editData,FormId,editMultipleChoiceQuestionId));
      }
    } else if (QualitativeSectionId || ContentType === "edit_section_in_question"
    ) {
      setLoading(true);
      dispatch(removeErrorData());

      let editData = {
        content_object: {},
        order: qualitativeSectionOrder,
      };
      if (updateQualitativeTtile !== "") {
        editData.content_object.title = updateQualitativeTtile;
      }
      if (updateQualitativeDescription !== "") {
        editData.content_object.description = updateQualitativeDescription;
      }
      // if (
      //   updateQualitativeTtile !== "" &&
      //   updateQualitativeDescription !== ""
      // ) {
        dispatch(editqualitativeSectionAction(editData,FormId,SectionQId,QuestionQuesId)
        );
      // }
    }else if(EditMultiChoiceInSectionId || ContentType === "edit_question_in_multiChoice_section"){
      
      setLoading(true);
      dispatch(removeErrorData());

      let multiChoiceQuestionInput = document.getElementsByClassName(
        "edit_Option_in_multiChoice_Question"
      );
      let multiChoiceQuestionOptions = [];
      for (let i = 0; i < multiChoiceQuestionInput.length; i++) {
        if (multiChoiceQuestionInput[i].value) {
          multiChoiceQuestionOptions.push(multiChoiceQuestionInput[i].value);
        }
      }

      let editData = {
        content_object: {},
        order: EditmultiChoiceOrderInSection,
      };
      if (MultipleQuestionSectionTitle !== "") {
        editData.content_object.title = MultipleQuestionSectionTitle;
      }
        editData.content_object.options = Object.assign({},multiChoiceQuestionOptions);
        dispatch(editqualitativeSectionAction(editData,FormId,EditQuestionId_Section,EditmultiChoiceIdInSection))
    }else if(EditMultiGridQuestionId){
      
      setLoading(true);
      dispatch(removeErrorData());
      // get row
      let multiChoiceQuestionInput = document.getElementsByClassName("Multi_grid_row");
      let multiChoiceQuestionOptions = [];
      
      for (let i = 0; i < multiChoiceQuestionInput.length; i++) {
        if (multiChoiceQuestionInput[i].value) {
          multiChoiceQuestionOptions.push(multiChoiceQuestionInput[i].value);
        }
      }


      // get column
      let multiGridColumnInput =document.getElementsByClassName("Multi_Grid_Column");
      let multiGridColumnOptions = [];
      for (let i = 0; i < multiGridColumnInput.length; i++) {
        if (multiGridColumnInput[i].value !== "") {
          multiGridColumnOptions.push(multiGridColumnInput[i].value);
        }
      }

      
      let row = Object.assign({}, multiChoiceQuestionOptions);
      let column = Object.assign({}, multiGridColumnOptions);

      if(updateSectionName === "Edit_Questions_tab"){

        var editData = {
          content_object: {},
        };
        
        editData.content_object.options = {
          rows: row,
          columns: column,
        };
        if (updateMultiGrideTitleInSection !== "") {
          editData.content_object.title = updateMultiGrideTitleInSection;
        } 
        dispatch(editQualitativeQuestionaction(editData,FormId,EditMultiGridQuestionId))
      }
      if(updateSectionName === "Edit_Questions_in_Section_Tab"){

        var editData = {
          content_object: {},
        };

        editData.content_object.options = {
          rows: row,
          columns: column,
        };
        if (updateMultiGrideTitleInSection !== "") {
          editData.content_object.title = updateMultiGrideTitleInSection;
        } 
        dispatch(editqualitativeSectionAction(editData,FormId,Section_Id,ContentId))
      }
    }
    
    else {
      
      let multiChoiceQuestionInput =
        document.getElementsByClassName("multichoiceoptions");
      let multiChoiceQuestionOptions = [];
      for (let i = 0; i < multiChoiceQuestionInput.length; i++) {
        if (multiChoiceQuestionInput[i].value !== "") {
          multiChoiceQuestionOptions.push(multiChoiceQuestionInput[i].value);
        }
      }
      let multiGridRowInput = document.getElementsByClassName("multigridrow");
      let multiGridRowOptions = [];
      for (let i = 0; i < multiGridRowInput.length; i++) {
        if (multiGridRowInput[i].value !== "") {
          multiGridRowOptions.push(multiGridRowInput[i].value);
        }
      }
      let multiGridColumnInput =
        document.getElementsByClassName("multigridcolumn");
      let multiGridColumnOptions = [];
      for (let i = 0; i < multiGridColumnInput.length; i++) {
        if (multiGridColumnInput[i].value !== "") {
          multiGridColumnOptions.push(multiGridColumnInput[i].value);
        }
      }
      if (
        (qustionsType === "Multiple Choice Question" &&
          multiChoiceQuestionOptions.length > 0) ||
        qustionsType === "Qualitative Question" ||
        (qustionsType === "Multichoice Grid" &&
          multiGridRowOptions.length > 0 &&
          multiGridColumnOptions.length > 0)
      ) {
        setLoading(true);
        setBtnClickFlag(true);
        setDeleteLoading(true);
        userContext.setFrmUpdating(false);
        dispatch(removeErrorData());
        let order =
          singleFormData && singleFormData.items && singleFormData.items[0]
            ? singleFormData.items[singleFormData.items.length - 1].order
            : 0;
        if (sectionData.length > 0) {
          order =
            sectionData &&
            sectionData[sectionData.length - 1].content_object &&
            sectionData[sectionData.length - 1].content_object.items &&
            sectionData[sectionData.length - 1].content_object.items[0]
              ? sectionData[sectionData.length - 1].content_object.items[
                  sectionData[sectionData.length - 1].content_object.items
                    .length - 1
                ].order
              : 0;
        }
        let data = {
          content_object: {
            title: values.title,
            description: values.description,
          },
          order: order + 1,
          content_type: "question",
        };
        if (qustionsType === "Qualitative Question") {
          data.content_object.type = "QUALITATIVE";
        } else if (qustionsType === "Multiple Choice Question") {
          data.content_object.type = "MULTIPLECHOICE";
          data.content_object.options = Object.assign(
            {},
            multiChoiceQuestionOptions
          );
        } else if (qustionsType === "Multichoice Grid") {
          data.content_object.type = "MULTIGRID";
          let row = Object.assign({}, multiGridRowOptions);
          let column = Object.assign({}, multiGridColumnOptions);
          data.content_object.options = {
            rows: row,
            columns: column,
          };
        }
        if (sectionData.length === 0) {
          data.form = singleFormData.id;
          dispatch(addFormQuestion(data));
        } else {
          data.section = sectionData[sectionData.length - 1].id;
          dispatch(addFormSectionQuestion(data, singleFormData.id));
        }
      } else {
        toast.error("Enter Any One Option");
      }
    }
  };

  const formQuestionData = useSelector(
    (state) => state.formsData.saveFormQuestionData
  );

  const formSectionQuestionData = useSelector(
    (state) => state.formsData.saveFormSectionQuestionData
  );

  useEffect(() => {
    //if success then only execute
    if (
      (formQuestionData.id || formSectionQuestionData.id) &&
      (btnClickFlag || duplicateFlag) &&
      error.errorsData === ""
    ) {
      setLoading(false);
      setDeleteLoading(false);
      if (btnClickFlag) {
        setEditMultipleChoiceQuestionId("");
        setBtnClickFlag(false);
        questionformRef.current.values.title = "";
        questionformRef.current.values.description = "";
        toast.success("Form Question Added");
      } else if (duplicateFlag) {
        // setDuplicateFlag(false);
        // toast.success("Dupication of Form Header");
      }
    }
  }, [formQuestionData, formSectionQuestionData]);

  // **************************** Qualitative Question ************************

  const editQualitativeQuestionData = useSelector(
    (state) => state.formsData.editQualitativeQuestionData
  );

  useEffect(() => {
    if(btnClickFlag){
      if (
        editQualitativeQuestionData.id &&
        editQualitativeQuestionData.content_object.type === "QUALITATIVE"
      ) {
        setBtnClickFlag(false);
        setLoading(false);
        setDeleteLoading(false);
        questionformRef.current.values.title = "";
        questionformRef.current.values.description = "";
        setQualitativeSectionId("")
        setEditQualitativeQuestion("");
        setEditQuestionSection('')
        setContentType("")
        setaddOptionsMultiChoice(false)
      } else if (
        editQualitativeQuestionData.id &&
        editQualitativeQuestionData.content_object.type === "MULTIPLECHOICE"
      ) {
        setBtnClickFlag(false);
        setLoading(false);
        setDeleteLoading(false);
        setEditMultipleChoiceQuestionId("");
        setEditQuestionSection("")
        setaddOptionsMultiChoice(false)
        setContentType("")
        setKey("title");
      } else if (
        editQualitativeQuestionData.id &&
        editQualitativeQuestionData.content_object.type === "MULTIGRID"
      ) {
        setBtnClickFlag(false);
        setLoading(false);
        setDeleteLoading(false);
        setEditMultiGridQuestionId("")
        setEditQuestionSection("")
        setaddOptionsMultiChoice(false)
        setContentType("")
        // setKey("title");
      }
      toast.success("Form Question Updated")
    }
  }, [editQualitativeQuestionData]);

  const handleEditQualitative = (value) => {
    setEditQualitativeQuestion(value[1]);
    setEditQualitativeOrder(value[2]);
    setContentType(value[3]);
    setEditMultipleChoiceQuestionId("")
    setEditQuestionSection("")
  };

  // **************************** Multiplechoice Question ************************

  const handleEditMultipleChoice = (value) => {
   
    setEditMultipleChoiceQuestionId(value[1]);
    setMultipleChoiceOrder(value[2]);
    setContentType(value[3]);
    setRemoveId(false)
    setEditMultiGridQuestionId("")
  };

  const handleEditQualitativeInSection = (value) => {
    setQualitativeSectionId(value[0]);
    setSectionQId(value[3].id);
    setQualitativeSectionOrder(value[2]);
    setContentType(value[4]);
    setQuestionId(value[5]);
    setEditMultiGridQuestionId("")
    setEditTitle("")
    setEditQualitativeQuestion("")
    setEditMultipleChoiceQuestionId("")
    setEditQuestionSection("")
    setEditMultiChoiceInSectionId("")
  };

  // **************************** Qualitative Question in section ************************

  const editqualitativeQuestionInSection = useSelector(
    (state) => state.formsData.editqualitativeQuestionInSection
  );

  useEffect(() => {
    if (editqualitativeQuestionInSection.id) {
      setBtnClickFlag(false);
      setLoading(false);
      setDeleteLoading(false);
      questionformRef.current.values.title = "";
      questionformRef.current.values.description = "";
      setEditQualitativeQuestion("")
      setQualitativeSectionId("");
      setEditMultiChoiceInSectionId("")
      setSectionQId("");
      setEditQuestionSection("")
      setaddOptionsMultiChoice(false)
      setEditMultipleChoiceQuestionId("")
      setContentType("")
      setEditMultiGridQuestionId("")
      setKey("title");
      toast.success("Form Question Updated");
    }
  }, [editqualitativeQuestionInSection]);


  // **************************  MultiChoice Questions in Section *****************************

  const handleEditMultiChoiceInSection = (value) => {
    setEditMultiChoiceInSectionId(value[0])
    setEditmultiChoiceIdInSection(value[1])
    setEditmultiChoiceOrderInSection(value[2])
    setContentType(value[3])
    setEditQuestionId_Section(value[4])
    setEditQuestionSection("")
    setEditMultiGridQuestionId("")
  }

  // ************************** multi grid Questions in Section *****************************
  const editMultiGridFunction = () => {
   
  }

  return (
    <>
      <Tab.Container id="noanim-tab-example" defaultActiveKey="first">
        {/* <Row> */}
        <Col sm={12}>
          <Nav variant="pills" className="flex-row">
            <Nav.Item>
              <Nav.Link eventKey="first">Questions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Responses</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content className="tab_content">
            <Tab.Pane eventKey="first">
              {key === "title" ? (
                <>
                  <Formik
                    initialValues={{ title: "", description: "" }}
                    validationSchema={
                      (getIdheader === "")
                        ? validationSchema
                        : ""
                    }
                    onSubmit={headerSubmit}
                    innerRef={formRef}
                  >
                    <Form>
                    {(checkPermission('custom_form_data_created') && !checkPermission('custom_form_data_edit'))
                    ?
                      <div className="modal-form-cta">
                        <button
                          type="submit"
                          className={
                            loading
                              ? "btn-primary-yazmi button_disable"
                              : "btn-primary-yazmi "
                          }
                          disabled={loading ? true : false}
                        >
                          Save
                        </button>
                      </div>
                    :
                      <></>
                    }
                    {(checkPermission('custom_form_data_edit'))
                    ?
                      <div className="modal-form-cta">
                        <button
                          type="submit"
                          className={
                            loading
                              ? "btn-primary-yazmi button_disable"
                              : "btn-primary-yazmi "
                          }
                          disabled={loading ? true : false}
                        >
                          Save
                        </button>
                      </div>
                    :
                      <></>
                    }
                      <div className="form_div" id="formTitle">
                        {userContext.frmUpdating &&
                          headerData &&
                          headerData.map((data) => {
                            return (
                              <div className="added_title_div">
                                <div
                                  className="add_title"
                                  // id={data.id}
                                  onClick={() => {
                                    setHeaderPopover(!headerPopover);
                                  }}
                                >
                                  {/* <h3>{data.content_object.title}</h3> */}
                                  <Field
                                    type="text"
                                    onBlur={(e) => {
                                      handleinput(e);
                                    }}
                                    name={"edit_title" + data.content_object.id}
                                    className={
                                      editTitle === data.content_object.id
                                        ? "edit_title"
                                        : ""
                                    }
                                    defaultValue={data.content_object.title}
                                    readOnly={
                                      editTitle === data.content_object.id
                                        ? false
                                        : true
                                    }
                                    onChange={(e) => {
                                      titleChange(e);
                                    }}
                                  />

                                  {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                  ?
                                    <>
                                      <span
                                        id={"addtitle" + data.id}
                                        onClick={() => {
                                          addHeaderClass(data.content_object.id);
                                        }}
                                      >
                                        <svg
                                          width="4"
                                          height="13"
                                          viewBox="0 0 4 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                            ErrorMessage
                                            fill="#666666"
                                          />
                                        </svg>
                                      </span>
                                    <UncontrolledPopover
                                      className={
                                        "addtitle header-part header" + data.id
                                      }
                                      trigger="legacy"
                                      placement="bottom"
                                      target={"addtitle" + data.id}
                                    >
                                      <div className="squar_box squar_box_hover"></div>
                                      <PopoverBody>
                                        <ul className="list-unstyled mb-0">
                                          {(checkPermission('custom_form_data_edit'))
                                          ?
                                            <>
                                              <li
                                                className="first_li"
                                                onClick={() => {
                                                  handleDuplicateHeader(
                                                    data.content_object.title,
                                                    data.content_object.description
                                                  );
                                                  removeHeaderPopover();
                                                }}
                                              >
                                                <Link className="text-decoration-none">
                                                  Duplicate Title & Desc
                                                </Link>
                                              </li>
                                              <li
                                                onClick={() => {
                                                  handleEitTitle([
                                                    data.content_object.id,
                                                    data.id,
                                                    data.order,
                                                  ]);
                                                  removeHeaderPopover();
                                                }}
                                              >
                                                <Link className="text-decoration-none">
                                                  Edit Title & Desc
                                                </Link>
                                              </li>
                                            </>
                                          :
                                            <></>
                                          }
                                          {(checkPermission('custom_form_data_delete'))
                                          ?
                                            <li
                                              onClick={() => {
                                                deleteHeaderSectionQuestionFunction(
                                                  data.id,
                                                  singleFormData.id,
                                                  "headers",
                                                  ""
                                                );
                                                removeHeaderPopover();
                                              }}
                                            >
                                              <Link className="text-decoration-none">
                                                Delete Title & Desc
                                              </Link>
                                            </li>
                                          :
                                            <></>
                                          }
                                        </ul>
                                      </PopoverBody>
                                    </UncontrolledPopover>
                                  </>
                                :
                                  <></>
                                }
                                </div>
                                {error.errorsData && error.errorsData.title ? (
                                  <span className="text-danger error_msg">
                                    {error.errorsData.title[0]}
                                  </span>
                                ) : (
                                  <></>
                                )}
                                {/* <span className="read_title">
                                  {data.content_object.description}
                                </span> */}
                                {data.content_object.description !== "" || editTitle === data.content_object.id ?
                                  <Field
                                    type="text"
                                    name="edit_description"
                                    className={
                                      editTitle === data.content_object.id
                                        ? "read_title read_edit_title"
                                        : "read_title"
                                    }
                                    defaultValue={data.content_object.description}
                                    readOnly={
                                      editTitle === data.content_object.id
                                        ? false
                                        : true
                                    }
                                    onChange={(e) => {
                                      descriptionChange(e);
                                    }}
                                  />
                                  :
                                  <></>
                                }
                              </div>
                            );
                          })}
                        <div className="after_add_title">
                          <div className="add_title">
                            {/* <h3>Add Title</h3> */}
                            <Field
                              type="text"
                              className="title_input"
                              placeholder="Add Title of the Form"
                              name="title"
                              maxlength="150"
                            />
                          </div>
                          {error.errorsData && error.errorsData.title ? (
                            <span className="text-danger error_msg">
                              {error.errorsData.title[0]}
                            </span>
                          ) : (
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-danger error_msg"
                            />
                          )}
                          <Field
                            type="text"
                            className="title_input"
                            placeholder="Additional Information for the title"
                            name="description"
                            maxlength="500"
                          />
                          {error.errorsData && error.errorsData.description ? (
                            <span className="text-danger error_msg">
                              {error.errorsData.description[0]}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </>
              ) : (
                <></>
              )}
              {key === "section" ? (
                <>
                  <Formik
                    initialValues={{
                      title: `section${updateSectionLenght + 1}`,
                      description: "",
                    }}
                    validationSchema={
                      editSectionId === ""
                        ? sectionValidationSchema
                        : ""
                    }
                    onSubmit={sectionSubmit}
                    innerRef={sectionformRef}
                  >
                    <Form>
                    {(checkPermission('custom_form_data_created') && !checkPermission('custom_form_data_edit'))
                    ?
                      <div className="modal-form-cta">
                        <button
                          className={
                            loading
                              ? "btn-primary-yazmi button_disable"
                              : "btn-primary-yazmi "
                          }
                          disabled={loading ? true : false}
                        >
                          Save
                        </button>
                      </div>
                    :
                      <></>
                    }
                    {(checkPermission('custom_form_data_edit'))
                    ?
                      <div className="modal-form-cta">
                        <button
                          className={
                            loading
                              ? "btn-primary-yazmi button_disable"
                              : "btn-primary-yazmi "
                          }
                          disabled={loading ? true : false}
                        >
                          Save
                        </button>
                      </div>
                    :
                      <></>
                    }
                      <div className="form_div">
                        {userContext.frmUpdating &&
                          sectionData &&
                          sectionData.map((data) => {
                            return (
                              <div className="added_title_div">
                                <div className="add_title">
                                  {/* <h3>{data.content_object.title}</h3> */}

                                  <Field
                                    type="text"
                                    name={"edit_title" + data.content_object.id}
                                    className={
                                      editSection === data.content_object.id
                                        ? "edit_title"
                                        : ""
                                    }
                                    defaultValue={data.content_object.title}
                                    readOnly={
                                      editSection === data.content_object.id
                                        ? false
                                        : true
                                    }
                                    onChange={(e) => {
                                      sectionChange(e);
                                    }}
                                  />
                                  {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                  ?
                                    <>
                                      <span id={"addsection" + data.id}>
                                        <svg
                                          width="4"
                                          height="13"
                                          viewBox="0 0 4 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                            fill="#666666"
                                          />
                                        </svg>
                                      </span>

                                      <UncontrolledPopover
                                        className={
                                          "addsection header-part header" + data.id
                                        }
                                        trigger="legacy"
                                        placement="auto-start"
                                        target={"addsection" + data.id}
                                      >
                                        <div className="squar_box squar_box_hover"></div>
                                        <PopoverBody>
                                          <ul className="list-unstyled mb-0">
                                            {(checkPermission('custom_form_data_edit'))
                                            ?
                                              <>
                                                <li className="first_li">
                                                  <Link
                                                    className="text-decoration-none"
                                                    onClick={() => {
                                                      handleSectionDuplicate(
                                                        data.content_object.title,
                                                        data.content_object.description
                                                      );
                                                    }}
                                                  >
                                                    Duplicate Section
                                                  </Link>
                                                </li>
                                                <li
                                                  onClick={() => {
                                                    handleEditSection([
                                                      data.content_object.id,
                                                      data.id,
                                                      data.order,
                                                    ]);
                                                    removeHeaderPopover();
                                                  }}
                                                >
                                                  <Link className="text-decoration-none">
                                                    Edit Section
                                                  </Link>
                                                </li>
                                              </>
                                            :
                                              <></>
                                            }
                                            {checkPermission('custom_form_data_delete')
                                            ?
                                              <li
                                                onClick={() => {
                                                  deleteHeaderSectionQuestionFunction(
                                                    data.id,
                                                    singleFormData.id,
                                                    "sections",
                                                    ""
                                                  );
                                                  removeHeaderPopover();
                                                }}
                                              >
                                                <Link className="text-decoration-none">
                                                  Delete Section
                                                </Link>
                                              </li>
                                            :
                                              <></>
                                            }
                                          </ul>
                                        </PopoverBody>
                                      </UncontrolledPopover>
                                    </>
                                  :
                                    <></>
                                  }
                                </div>
                                {/* <span className="read_title">
                                  {data.content_object.description}
                                </span> */}

                                <Field
                                  type="text"
                                  name="edit_description"
                                  className={
                                    editSection === data.content_object.id
                                      ? "read_title read_edit_title"
                                      : "read_title"
                                  }
                                  defaultValue={data.content_object.description}
                                  readOnly={
                                    editSection === data.content_object.id
                                      ? false
                                      : true
                                  }
                                  onChange={(e) => {
                                    sectiondescriptionChange(e);
                                  }}
                                />

                                {/* <input type="text" className="title_input" readOnly placeholder="Additional Information for the title" /> */}
                              </div>
                            );
                          })}

                        <div className="after_add_title">
                          <div className="add_title">
                            <Field
                              type="text"
                              className="title_input"
                              placeholder="Section 1"
                              name="title"
                              maxlength="150"
                            />
                          </div>
                          {error.errorsData && error.errorsData.title ? (
                            <span className="text-danger error_msg">
                              {error.errorsData.title[0]}
                            </span>
                          ) : (
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-danger error_msg"
                            />
                          )}
                          <Field
                            type="text"
                            className="title_input"
                            placeholder="Untitled Section"
                            name="description"
                            maxlength="500"
                          />
                          {error.errorsData && error.errorsData.description ? (
                            <span className="text-danger error_msg">
                              {error.errorsData.description[0]}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </>
              ) : (
                <></>
              )}
              {/* <div className="box_shadow_question" > */}
              {key === "question" ? (
                <>
                  <Formik
                    initialValues={{ title: "", description: "" }}
                    validationSchema={
                      editQualitativeQuestion === "" &&
                      QualitativeSectionId === "" &&
                      AddOptionsMultiChoice === false  && editMultipleChoiceQuestionId === "" && EditMultiChoiceInSectionId === "" && EditMultiGridQuestionId === "" && editQuestionSection === ""
                        ? questionValidationSchema
                        : ""
                    }
                    onSubmit={questionSubmit}
                    innerRef={questionformRef}
                  >
                    <Form>
                    {(checkPermission('custom_form_data_created') && !checkPermission('custom_form_data_edit'))
                    ?
                      <div className="modal-form-cta">
                        <button
                          type="submit"
                          className={
                            loading
                              ? "btn-primary-yazmi button_disable"
                              : "btn-primary-yazmi "
                          }
                          disabled={loading ? true : false}
                        >
                          Save
                        </button>
                      </div>
                    :
                      <></>
                    }
                    {(checkPermission('custom_form_data_edit'))
                    ?
                      <div className="modal-form-cta">
                        <button
                          type="submit"
                          className={
                            loading
                              ? "btn-primary-yazmi button_disable"
                              : "btn-primary-yazmi "
                          }
                          disabled={loading ? true : false}
                        >
                          Save
                        </button>
                      </div>
                    :
                      <></>
                    }
                      {/* <div className="form_div"> */}
                      {/* {(questionData && questionData.length > 0 && userContext.frmUpdating)
                      ? */}
                      <div className="only_question ">
                        {(qustionsType === "Qualitative Question" ||
                          qustionsType === "Multiple Choice Question" ||
                          qustionsType === "Multichoice Grid") &&
                        sectionData.length === 0 ? (
                          <div className="qualitative_uestion without_section">
                            <div className="d-flex justify-content-between">
                              <div className="add_question">
                                <Field
                                  type="text"
                                  placeholder="Add Question"
                                  name="title"
                                />
                              </div>
                              <div className="drop_down_div">
                                <span>
                                  {qustionsType === "Qualitative Question" ? (
                                    <svg
                                      width="14"
                                      height="10"
                                      viewBox="0 0 14 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1.00195 1H13.002"
                                        stroke="black"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M1 5H6.997"
                                        stroke="black"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M1.00195 9H10.997"
                                        stroke="black"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  ) : qustionsType === "Multichoice Grid" ? (
                                    <svg
                                      width="13"
                                      height="13"
                                      viewBox="0 0 13 13"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0 0.498913V12.5011C0 12.6334 0.0525639 12.7603 0.146128 12.8539C0.239693 12.9474 0.366593 13 0.498913 13H12.5011C12.6334 13 12.7603 12.9474 12.8539 12.8539C12.9474 12.7603 13 12.6334 13 12.5011V0.498913C13 0.366593 12.9474 0.239693 12.8539 0.146128C12.7603 0.0525639 12.6334 0 12.5011 0H0.498913C0.366593 0 0.239693 0.0525639 0.146128 0.146128C0.0525639 0.239693 0 0.366593 0 0.498913ZM8.99915 0.997827H12.002V4.00066H8.99915V0.997827ZM8.99915 4.99849H12.002V8.00132H8.99915V4.99849ZM8.99915 8.99915H12.002V12.002H8.99915V8.99915ZM4.99849 0.997827H8.00132V4.00066H4.99849V0.997827ZM4.99849 4.99849H8.00132V8.00132H4.99849V4.99849ZM4.99849 8.99915H8.00132V12.002H4.99849V8.99915ZM0.997827 0.997827H4.00066V4.00066H0.997827V0.997827ZM0.997827 4.99849H4.00066V8.00132H0.997827V4.99849ZM0.997827 8.99915H4.00066V12.002H0.997827V8.99915Z"
                                        fill="black"
                                      />
                                    </svg>
                                  ) : qustionsType ===
                                    "Multiple Choice Question" ? (
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7"
                                        stroke="black"
                                      />
                                      <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="4.5"
                                        fill="black"
                                      />
                                    </svg>
                                  ) : (
                                    <></>
                                  )}
                                </span>
                                <select
                                  onChange={handleQuestions}
                                  value={qustionsType}
                                >
                                  <option value="Qualitative Question">
                                    Qualitative Question
                                  </option>
                                  <option value="Multichoice Grid">
                                    Multichoice Grid
                                  </option>
                                  <option value="Multiple Choice Question">
                                    Multiple Choice Question
                                  </option>
                                </select>
                              </div>
                            </div>
                            {error.errorsData && error.errorsData.title ? (
                              <span className="text-danger error_msg">
                                {error.errorsData.title[0]}
                              </span>
                            ) : (
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="text-danger error_msg"
                              />
                            )}
                            {qustionsType === "Qualitative Question" ? (
                              <Field
                                type="text"
                                placeholder="Enter Response Here"
                                name="description"
                              />
                            ) : qustionsType === "Multichoice Grid" ? (
                              <MultichoiceGrid />
                            ) : qustionsType === "Multiple Choice Question" ? (
                              <MultipleChoiceQuestion />
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}

                        {/* detailed view  */}
                        {questionData &&
                        questionData.length > 0 &&
                        userContext.frmUpdating ? (
                          questionData &&
                          questionData.map((qtnData) => {
                            return qtnData.content_object.type ===
                              "QUALITATIVE" ? (
                              <div className="duplicate_question">
                                <div className="add_title">
                                  {/* <h3>{qtnData.content_object.title}</h3> */}
                                  <Field
                                    type="text"
                                    name={"edit_title" + qtnData.id}
                                    className={
                                      editQualitativeQuestion === qtnData.id
                                        ? "edit_title"
                                        : ""
                                    }
                                    defaultValue={qtnData.content_object.title}
                                    readOnly={
                                      editQualitativeQuestion === qtnData.id
                                        ? false
                                        : true
                                    }
                                    onChange={(e) => {
                                      setQualitativeQuestionTitle(
                                        e.target.value
                                      );
                                      if(e.target.value === ""){
                                        setLoading(true)
                                      }else{
                                        setLoading(false)
                                      }
                                    }}
                                  />
                                  {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                  ?
                                    <>
                                      <span id={"duplicate" + qtnData.id}>
                                        <svg
                                          width="4"
                                          height="13"
                                          viewBox="0 0 4 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                            fill="#666666"
                                          />
                                        </svg>
                                      </span>
                                      <UncontrolledPopover
                                        className={
                                          "duplicate header-part header" +
                                          qtnData.id
                                        }
                                        trigger="legacy"
                                        placement="bottom"
                                        target={"duplicate" + qtnData.id}
                                      >
                                        <div className="squar_box squar_box_hover"></div>
                                        <PopoverBody>
                                          <ul className="list-unstyled mb-0">
                                          {checkPermission('custom_form_data_edit')
                                          ?
                                            <li
                                              onClick={() => {
                                                handleEditQualitative([
                                                  singleFormData.id,
                                                  qtnData.id,
                                                  qtnData.order,
                                                  qtnData.content_object.type,
                                                ]);
                                                removeHeaderPopover();
                                              }}
                                            >
                                              <Link
                                                to="#"
                                                className="text-decoration-none"
                                              >
                                                Edit Question
                                              </Link>
                                            </li>
                                          :
                                            <></>
                                          }
                                          {checkPermission('custom_form_data_delete')
                                          ?
                                            <li>
                                              <Link
                                                onClick={() => {
                                                  deleteHeaderSectionQuestionFunction(
                                                    qtnData.id,
                                                    singleFormData.id,
                                                    "questions",
                                                    ""
                                                  );
                                                  removeHeaderPopover();
                                                }}
                                                className="text-decoration-none"
                                              >
                                                Delete Question
                                              </Link>
                                            </li>
                                          :
                                            <></>
                                          }
                                          </ul>
                                        </PopoverBody>
                                      </UncontrolledPopover>
                                    </>
                                  :
                                    <></>
                                  }
                                </div>
                                {/* <span className="read_title">
                                      {qtnData.content_object.description}
                                    </span>  */}
                                <Field
                                  type="text"
                                  name={"edit_title" + qtnData.id}
                                  className={
                                    editQualitativeQuestion === qtnData.id
                                      ? "read_title read_edit_title"
                                      : "read_title"
                                  }
                                  defaultValue={
                                    qtnData.content_object.description
                                  }
                                  readOnly={
                                    editQualitativeQuestion === qtnData.id
                                      ? false
                                      : true
                                  }
                                  onChange={(e) => {
                                    setQualitativeQuestionDescription(
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            ) : qtnData.content_object.type ===
                              "MULTIPLECHOICE" ? (
                              <>
                                <div className="after_added_questions qualitative_uestion_empty">
                                  <div className="add_title">
                                    <Field
                                      type="text"
                                      name={"edit_title" + qtnData.id}
                                      className={
                                        editMultipleChoiceQuestionId === qtnData.id ? "edit_title" : ""
                                      }
                                      defaultValue={
                                        qtnData.content_object.title
                                      }
                                      readOnly={
                                        editMultipleChoiceQuestionId === qtnData.id ? false: true
                                      }
                                      onChange={(e) => {
                                        setMultipleQuestionTitle(
                                          e.target.value
                                        );
                                        if(e.target.value === ""){
                                          setLoading(true)
                                        }else{
                                          setLoading(false)
                                        }
                                      }}
                                    />
                                    {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                      ?
                                      <span id={"duplicate" + qtnData.id}>
                                        <svg
                                          width="4"
                                          height="13"
                                          viewBox="0 0 4 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                            fill="#666666"
                                          />
                                        </svg>
                                      </span>
                                    :
                                      <></>
                                    }
                                  </div>
                                  {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                  ?
                                    <UncontrolledPopover
                                      className={
                                        "duplicate header-part header" +
                                        qtnData.id
                                      }
                                      trigger="legacy"
                                      placement="bottom"
                                      target={"duplicate" + qtnData.id}
                                    >
                                      <div className="squar_box squar_box_hover"></div>
                                      <PopoverBody>
                                        <ul className="list-unstyled mb-0">
                                          {checkPermission('custom_form_data_edit')
                                          ?
                                            <li
                                              onClick={() => {
                                                handleEditMultipleChoice([
                                                  singleFormData.id,
                                                  qtnData.id,
                                                  qtnData.order,
                                                  qtnData.content_object.type,
                                                ]);
                                                removeHeaderPopover();
                                              }}
                                            >
                                              <Link
                                                to="#"
                                                className="text-decoration-none"
                                              >
                                                Edit Question
                                              </Link>
                                            </li>
                                          :
                                            <></>
                                          }
                                          {checkPermission('custom_form_data_delete')
                                          ?
                                            <li>
                                              <Link
                                                onClick={() => {
                                                  deleteHeaderSectionQuestionFunction(
                                                    qtnData.id,
                                                    singleFormData.id,
                                                    "questions",
                                                    ""
                                                  );
                                                  removeHeaderPopover();
                                                }}
                                                className="text-decoration-none"
                                              >
                                                Delete Question
                                              </Link>
                                            </li>
                                          :
                                            <></>
                                          }
                                        </ul>
                                      </PopoverBody>
                                    </UncontrolledPopover>
                                  :
                                    <></>
                                  }
                                    

                                  <div id="multichoice_div">
                                    {userContext.frmUpdating &&
                                      Object.values(
                                        qtnData.content_object.options
                                      ).map((optionData, count) => {
                                        return (
                                          <>
                                            <div
                                              className="added_question"
                                              id="add_question_miltichoice"
                                            >
                                              <div className="option_name">
                                                <span className="circle_icon">
                                                  <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <circle
                                                      cx="7.5"
                                                      cy="7.5"
                                                      r="7"
                                                      stroke="#C4C4C4"
                                                    />
                                                  </svg>
                                                </span>
                                                {/* <p className="mb-0">{optionData}</p> */}
                                                <Field
                                                  type="text"
                                                  name={
                                                    "addOption" + qtnData.id
                                                  }
                                                  className={
                                                    editMultipleChoiceQuestionId ===
                                                    qtnData.id
                                                      ? "edit_title multichoiceQuestion editmultichoiceQuestion"
                                                      : "editmultichoiceQuestion"
                                                  }
                                                  defaultValue={optionData}
                                                  readOnly={
                                                    editMultipleChoiceQuestionId ===
                                                    qtnData.id
                                                      ? false
                                                      : true
                                                  }
                                                  onChange={(e) => {
                                                    setMultipleQuestionTitle(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              </div>
                                              {editMultipleChoiceQuestionId === qtnData.id ? (
                                                <div className="cross_icon">
                                                  <span
                                                    id={`cross_${inputCount}_${
                                                      count + "_" + inputCount
                                                    }_${qtnData.id}`}
                                                    onClick={(e) => {
                                                      handleRemove(e);
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        process.env.PUBLIC_URL +
                                                        "/images/Vector.png"
                                                      }
                                                      alt=""
                                                    />
                                                  </span>
                                                </div>
                                              ) : (
                                                <></>
                                              )}
                                            </div>
                                          </>
                                        );
                                      })}
                                  </div>
                                  {editMultipleChoiceQuestionId === qtnData.id ? (
                                    <div
                                      className="add_row_icon"
                                      onClick={() => {
                                        handleAddRow();
                                      }}
                                    >
                                      <span>
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M6 0C6.19891 0 6.38968 0.0790176 6.53033 0.21967C6.67098 0.360322 6.75 0.551088 6.75 0.75L6.75 5.25L11.25 5.25C11.4489 5.25 11.6397 5.32902 11.7803 5.46967C11.921 5.61032 12 5.80109 12 6C12 6.19891 11.921 6.38968 11.7803 6.53033C11.6397 6.67098 11.4489 6.75 11.25 6.75L6.75 6.75L6.75 11.25C6.75 11.4489 6.67098 11.6397 6.53033 11.7803C6.38968 11.921 6.19891 12 6 12C5.80109 12 5.61032 11.921 5.46967 11.7803C5.32902 11.6397 5.25 11.4489 5.25 11.25L5.25 6.75L0.75 6.75C0.551088 6.75 0.360322 6.67098 0.21967 6.53033C0.0790176 6.38968 0 6.19891 0 6C0 5.80109 0.0790176 5.61032 0.21967 5.46967C0.360322 5.32902 0.551088 5.25 0.75 5.25L5.25 5.25L5.25 0.75C5.25 0.551088 5.32902 0.360322 5.46967 0.21967C5.61032 0.0790176 5.80109 0 6 0V0Z"
                                            fill="#00A7E7"
                                          />
                                        </svg>
                                      </span>
                                      <p className="mb-0">Add Option</p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            ) : qtnData.content_object.type === "MULTIGRID" ? (
                              <MultiGridDetailedPage
                                subdata={qtnData}
                                Qtnid={qtnData.id}
                                title={qtnData.content_object.title}
                                id={qtnData.id}
                                rows={qtnData.content_object.options.rows}
                                columns={qtnData.content_object.options.columns}
                                getSectionName="Edit_Questions_tab"
                                passFunction={editMultiGridFunction}
                                sectionName={setSectionName}
                                setId={setEditMultiGridQuestionId}
                                getId={EditMultiGridQuestionId}
                                setTitle={setMultiGrideTitleInSection}
                                RemoveId={setEditMultipleChoiceQuestionId}
                                getupdateRemoveId={updateRemoveId}
                                deleteQuestion={deleteGridQuestion}
                                removePopOver={removeHeaderPopover}
                                SaveLoading={loading}
                                SaveSetLoading={setLoading}
                                lineRemoveCallback={gridCallback}
                              />
                            ) : (
                              <></>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* :
                        <></>
                      } */}
                      {sectionData &&
                        sectionData.map((data, key) => {
                          return (
                            <div className="form_div">
                              {data.content_object ? (
                                <div className="added_section_div">
                                  <div className="add_title">
                                    {/* <h3 >{data.content_object.title}</h3> */}
                                    <Field
                                      type="text"
                                      name={
                                        "edit_title" + data.content_object.id
                                      }
                                      className={
                                        editQuestionSection ===
                                        data.content_object.id
                                          ? "edit_title"
                                          : ""
                                      }
                                      defaultValue={data.content_object.title}
                                      readOnly={
                                        editQuestionSection ===
                                        data.content_object.id
                                          ? false
                                          : true
                                      }
                                      onChange={(e) => {
                                        sectionChange(e);
                                        if(e.target.value === ""){
                                          setLoading(true)
                                        }else{
                                          setLoading(false)
                                        }
                                      }}
                                    />
                                    {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                    ?
                                      <>
                                        <span id={"addsection" + data.id}>
                                          <svg
                                            width="4"
                                            height="13"
                                            viewBox="0 0 4 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                              fill="#666666"
                                            />
                                          </svg>
                                        </span>

                                        <UncontrolledPopover
                                          className={
                                            "addsection header-part header" +
                                            data.id
                                          }
                                          trigger="legacy"
                                          placement="auto-start"
                                          target={"addsection" + data.id}
                                        >
                                          <div className="squar_box squar_box_hover"></div>
                                          <PopoverBody>
                                            <ul className="list-unstyled mb-0">
                                            {checkPermission('custom_form_data_edit')
                                            ?
                                              <li
                                                onClick={() => {
                                                  handleEditSectionQuestion([
                                                    data.content_object.id,
                                                    data.id,
                                                    data.order,
                                                  ]);
                                                  removeHeaderPopover();
                                                }}
                                              >
                                                <Link className="text-decoration-none">
                                                  Edit Section
                                                </Link>
                                              </li>
                                            :
                                              <></>
                                            }
                                            {checkPermission('custom_form_data_delete')
                                            ?
                                              <li
                                                onClick={() => {
                                                  deleteHeaderSectionQuestionFunction(
                                                    data.id,
                                                    singleFormData.id,
                                                    "sections",
                                                    ""
                                                  );
                                                }}
                                              >
                                                <Link className="text-decoration-none">
                                                  Delete Section
                                                </Link>
                                              </li>
                                            :
                                              <></>
                                            }
                                            </ul>
                                          </PopoverBody>
                                        </UncontrolledPopover>
                                      </>
                                    :
                                      <></>
                                    }
                                  </div>
                                  {/* <span className="read_title">
                                  {data.content_object.description}
                                </span> */}
                                  <Field
                                    type="text"
                                    name="edit_description"
                                    className={
                                      editQuestionSection ===
                                      data.content_object.id
                                        ? "read_title read_edit_title"
                                        : "read_title"
                                    }
                                    defaultValue={
                                      data.content_object.description
                                    }
                                    readOnly={
                                      editQuestionSection ===
                                      data.content_object.id
                                        ? false
                                        : true
                                    }
                                    onChange={(e) => {
                                      sectiondescriptionChange(e);
                                    }}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}

                              {(qustionsType === "Qualitative Question" ||
                                qustionsType === "Multiple Choice Question" ||
                                qustionsType === "Multichoice Grid") &&
                              key === sectionData.length - 1 ? (
                                <div className="qualitative_uestion">
                                  <div className="d-flex justify-content-between">
                                    <div className="add_question">
                                      <Field
                                        type="text"
                                        placeholder="Add Question"
                                        name="title"
                                      />
                                    </div>
                                    <div className="drop_down_div">
                                      <span>
                                        {qustionsType ===
                                        "Qualitative Question" ? (
                                          <svg
                                            width="14"
                                            height="10"
                                            viewBox="0 0 14 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1.00195 1H13.002"
                                              stroke="black"
                                              strokeWidth="1.3"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M1 5H6.997"
                                              stroke="black"
                                              strokeWidth="1.3"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M1.00195 9H10.997"
                                              stroke="black"
                                              strokeWidth="1.3"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        ) : qustionsType ===
                                          "Multichoice Grid" ? (
                                          <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M0 0.498913V12.5011C0 12.6334 0.0525639 12.7603 0.146128 12.8539C0.239693 12.9474 0.366593 13 0.498913 13H12.5011C12.6334 13 12.7603 12.9474 12.8539 12.8539C12.9474 12.7603 13 12.6334 13 12.5011V0.498913C13 0.366593 12.9474 0.239693 12.8539 0.146128C12.7603 0.0525639 12.6334 0 12.5011 0H0.498913C0.366593 0 0.239693 0.0525639 0.146128 0.146128C0.0525639 0.239693 0 0.366593 0 0.498913ZM8.99915 0.997827H12.002V4.00066H8.99915V0.997827ZM8.99915 4.99849H12.002V8.00132H8.99915V4.99849ZM8.99915 8.99915H12.002V12.002H8.99915V8.99915ZM4.99849 0.997827H8.00132V4.00066H4.99849V0.997827ZM4.99849 4.99849H8.00132V8.00132H4.99849V4.99849ZM4.99849 8.99915H8.00132V12.002H4.99849V8.99915ZM0.997827 0.997827H4.00066V4.00066H0.997827V0.997827ZM0.997827 4.99849H4.00066V8.00132H0.997827V4.99849ZM0.997827 8.99915H4.00066V12.002H0.997827V8.99915Z"
                                              fill="black"
                                            />
                                          </svg>
                                        ) : qustionsType ===
                                          "Multiple Choice Question" ? (
                                          <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <circle
                                              cx="7.5"
                                              cy="7.5"
                                              r="7"
                                              stroke="black"
                                            />
                                            <circle
                                              cx="7.5"
                                              cy="7.5"
                                              r="4.5"
                                              fill="black"
                                            />
                                          </svg>
                                        ) : (
                                          <></>
                                        )}
                                      </span>
                                      <select
                                        onChange={handleQuestions}
                                        value={qustionsType}
                                      >
                                        <option value="Qualitative Question">
                                          Qualitative Question
                                        </option>
                                        <option value="Multichoice Grid">
                                          Multichoice Grid
                                        </option>
                                        <option value="Multiple Choice Question">
                                          Multiple Choice Question
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {error.errorsData &&
                                  error.errorsData.title ? (
                                    <span className="text-danger error_msg">
                                      {error.errorsData.title[0]}
                                    </span>
                                  ) : (
                                    <ErrorMessage
                                      name="title"
                                      component="div"
                                      className="text-danger error_msg"
                                    />
                                  )}
                                  {qustionsType === "Qualitative Question" ? (
                                    <Field
                                      type="text"
                                      placeholder="Enter Response Here"
                                      name="description"
                                    />
                                  ) : qustionsType === "Multichoice Grid" ? (
                                    <MultichoiceGrid />
                                  ) : qustionsType ===
                                    "Multiple Choice Question" ? (
                                    <MultipleChoiceQuestion />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}

                              {/* detailed view  */}
                              {data.content_object &&
                                data.content_object.items.map((subdata) => {
                                  return subdata.content_object.type ===
                                    "QUALITATIVE" ? (
                                    <>
                                      <div className="duplicate_question">
                                        <div className="add_title">
                                          {/* <h3>{subdata.content_object.title} QualitativeSectionId </h3> */}

                                          <Field
                                            type="text"
                                            name={
                                              "edit_title" +
                                              subdata.content_object.id
                                            }
                                            className={
                                              QualitativeSectionId ===
                                              subdata.content_object.id
                                                ? "edit_title"
                                                : ""
                                            }
                                            defaultValue={
                                              subdata.content_object.title
                                            }
                                            readOnly={
                                              QualitativeSectionId ===
                                              subdata.content_object.id
                                                ? false
                                                : true
                                            }
                                            onChange={(e) => {
                                              setQualitativeTtile(
                                                e.target.value
                                              );
                                              if(e.target.value === ""){
                                                setLoading(true)
                                              }else{
                                                setLoading(false)
                                              }
                                            }}
                                          />
                                          {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                          ?
                                            <>
                                              <span id={"duplicate" + subdata.id}>
                                                <svg
                                                  width="4"
                                                  height="13"
                                                  viewBox="0 0 4 13"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                                    fill="#666666"
                                                  />
                                                </svg>
                                              </span>
                                              <UncontrolledPopover
                                                className={
                                                  "duplicate header-part header" +
                                                  subdata.id
                                                }
                                                trigger="legacy"
                                                placement="bottom"
                                                target={"duplicate" + subdata.id}
                                              >
                                                <div className="squar_box squar_box_hover"></div>
                                                <PopoverBody>
                                                  <ul className="list-unstyled mb-0">
                                                    {checkPermission('custom_form_data_edit')
                                                    ?
                                                      <li
                                                        onClick={() => {
                                                          handleEditQualitativeInSection(
                                                            [
                                                              subdata.content_object
                                                                .id,
                                                              subdata.id,
                                                              subdata.order,
                                                              data,
                                                              "edit_section_in_question",
                                                              subdata.id,
                                                            ]
                                                          );
                                                          removeHeaderPopover();
                                                        }}
                                                      >
                                                        <Link
                                                          to="#"
                                                          className="text-decoration-none"
                                                        >
                                                          Edit Question
                                                        </Link>
                                                      </li>
                                                    :
                                                      <></>
                                                    }
                                                    {checkPermission('custom_form_data_delete')
                                                    ?
                                                      <li>
                                                        <Link
                                                          onClick={() => {
                                                            deleteHeaderSectionQuestionFunction(
                                                              subdata.id,
                                                              singleFormData.id,
                                                              "sectionquestions",
                                                              data.id
                                                            );
                                                            removeHeaderPopover();
                                                          }}
                                                          className="text-decoration-none"
                                                        >
                                                          Delete Question
                                                        </Link>
                                                      </li>
                                                    :
                                                      <></>
                                                    }
                                                  </ul>
                                                </PopoverBody>
                                              </UncontrolledPopover>
                                            </>
                                          :
                                            <></>
                                          }
                                        </div>
                                        {/* <span className="read_title">
                                          {subdata.content_object.description}
                                        </span>  */}
                                        <Field
                                          type="text"
                                          name={
                                            "edit_title" +
                                            subdata.content_object.id
                                          }
                                          className={
                                            QualitativeSectionId ===
                                            subdata.content_object.id
                                              ? "read_title read_edit_title"
                                              : "read_title"
                                          }
                                          defaultValue={
                                            subdata.content_object.description
                                          }
                                          readOnly={
                                            QualitativeSectionId ===
                                            subdata.content_object.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setQualitativeDescription(
                                              e.target.value
                                            );
                                          }}
                                        />
                                      </div>
                                    </>
                                  ) : subdata.content_object.type ===
                                    "MULTIPLECHOICE" ? (
                                      <>
                                    <div className="after_added_questions">
                                      {/* <h3>
                                      {subdata.content_object.title} 
                                    </h3> */}
                                      <div className="add_title">
                                        <Field
                                          type="text"
                                          name={"edit_title" + subdata.content_object.id}
                                          className={
                                            EditMultiChoiceInSectionId ===
                                            subdata.content_object.id
                                              ? "edit_title"
                                              : ""
                                          }
                                          defaultValue={
                                            subdata.content_object.title
                                          }
                                          readOnly={
                                            EditMultiChoiceInSectionId ===
                                            subdata.content_object.id
                                              ? false
                                              : true
                                          }
                                          onChange={(e) => {
                                            setMultipleQuestionSectionTitle(
                                              e.target.value
                                            );
                                            if(e.target.value === ""){
                                              setLoading(true)
                                            }else{
                                              setLoading(false)
                                            }
                                          }}
                                        />
                                        {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
                                        ?
                                          <>
                                            <span id={"duplicate" + subdata.id}>
                                              <svg
                                                width="4"
                                                height="13"
                                                viewBox="0 0 4 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                                                  fill="#666666"
                                                />
                                              </svg>
                                            </span>
                                            <UncontrolledPopover
                                              className={
                                                "duplicate header-part header" +
                                                subdata.id
                                              }
                                              trigger="legacy"
                                              placement="bottom"
                                              target={"duplicate" + subdata.id}
                                            >
                                              <div className="squar_box squar_box_hover"></div>
                                              <PopoverBody>
                                                <ul className="list-unstyled mb-0">
                                                  {checkPermission('custom_form_data_edit')
                                                  ?
                                                    <li
                                                      onClick={() => {
                                                        handleEditMultiChoiceInSection(
                                                          [
                                                            subdata.content_object.id,
                                                            subdata.id,
                                                            subdata.order,
                                                            "edit_question_in_multiChoice_section",
                                                            data.id
                                                          ]
                                                        )
                                                        removeHeaderPopover();
                                                      }}
                                                    >
                                                      <Link
                                                        to="#"
                                                        className="text-decoration-none"
                                                      >
                                                        Edit Question
                                                      </Link>
                                                    </li>
                                                  :
                                                    <></>
                                                  }
                                                  {checkPermission('custom_form_data_delete')
                                                  ?
                                                    <li>
                                                      <Link
                                                        onClick={() => {
                                                          deleteHeaderSectionQuestionFunction(
                                                            subdata.id,
                                                            singleFormData.id,
                                                            "sectionquestions",
                                                            data.id
                                                          );
                                                          removeHeaderPopover();
                                                        }}
                                                        className="text-decoration-none"
                                                      >
                                                        Delete Question
                                                      </Link>
                                                    </li>
                                                  :
                                                    <></>
                                                  }
                                                </ul>
                                              </PopoverBody>
                                            </UncontrolledPopover>
                                          </>
                                        :
                                          <></>
                                        }
                                      </div>
                                      <div id={subdata.content_object.id}>
                                      {Object.values(
                                        subdata.content_object.options
                                      ).map((optionData, count_key) => {
                                        return (
                                          <div className="added_question">
                                            <div className="option_name">
                                              <span className="circle_icon">
                                                <svg
                                                  width="15"
                                                  height="15"
                                                  viewBox="0 0 15 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <circle
                                                    cx="7.5"
                                                    cy="7.5"
                                                    r="7"
                                                    stroke="#C4C4C4"
                                                  />
                                                </svg>
                                              </span>
                                              <Field
                                                type="text"
                                                name={"edit_title" + subdata.id}
                                                className={
                                                  EditMultiChoiceInSectionId ===
                                                  subdata.content_object.id
                                                    ? "edit_title edit_Option_in_multiChoice_Question"
                                                    : ""
                                                }
                                                defaultValue={optionData}
                                                readOnly={
                                                  EditMultiChoiceInSectionId ===
                                                  subdata.content_object.id
                                                    ? false
                                                    : true
                                                }
                                                onChange={(e) => {
                                                  setMultipleQuestionSectionDescription(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                            {EditMultiChoiceInSectionId ===
                                                  subdata.content_object.id? (
                                                <div className="cross_icon">
                                                  <span
                                                    id={`cross_${count_key+"_"}${subdata.content_object.id}`}
                                                    onClick={(e) => {
                                                      handleRemoveInSection(e);
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        process.env.PUBLIC_URL +
                                                        "/images/Vector.png"
                                                      }
                                                      alt=""
                                                    />
                                                  </span>
                                                </div>
                                              ) : (
                                                <></>
                                              )}
                                          </div>
                                        );
                                      })}
                                      </div>
                                      {EditMultiChoiceInSectionId === subdata.content_object.id ? (
                                    <div
                                      className="add_row_icon"
                                      onClick={(e) => {
                                        handleAddRowInSection(e);
                                      }}
                                    >
                                      <span>
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M6 0C6.19891 0 6.38968 0.0790176 6.53033 0.21967C6.67098 0.360322 6.75 0.551088 6.75 0.75L6.75 5.25L11.25 5.25C11.4489 5.25 11.6397 5.32902 11.7803 5.46967C11.921 5.61032 12 5.80109 12 6C12 6.19891 11.921 6.38968 11.7803 6.53033C11.6397 6.67098 11.4489 6.75 11.25 6.75L6.75 6.75L6.75 11.25C6.75 11.4489 6.67098 11.6397 6.53033 11.7803C6.38968 11.921 6.19891 12 6 12C5.80109 12 5.61032 11.921 5.46967 11.7803C5.32902 11.6397 5.25 11.4489 5.25 11.25L5.25 6.75L0.75 6.75C0.551088 6.75 0.360322 6.67098 0.21967 6.53033C0.0790176 6.38968 0 6.19891 0 6C0 5.80109 0.0790176 5.61032 0.21967 5.46967C0.360322 5.32902 0.551088 5.25 0.75 5.25L5.25 5.25L5.25 0.75C5.25 0.551088 5.32902 0.360322 5.46967 0.21967C5.61032 0.0790176 5.80109 0 6 0V0Z"
                                            fill="#00A7E7"
                                          />
                                        </svg>
                                      </span>
                                      <p className="mb-0">Add Option</p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                    </div>
                                    
                                    
                                    </>
                                  ) : subdata.content_object.type ===
                                    "MULTIGRID" ? (
                                    <MultiGridDetailedPage
                                      subdata={subdata}
                                      sectionQtnid={subdata.id}
                                      title={subdata.content_object.title}
                                      rows={subdata.content_object.options.rows}
                                      columns={subdata.content_object.options.columns}
                                      getSectionName="Edit_Questions_in_Section_Tab"
                                      sectionName={setSectionName}
                                      passFunction={editMultiGridFunction}
                                      setId={setEditMultiGridQuestionId}
                                      getId={EditMultiGridQuestionId}
                                      setTitle={setMultiGrideTitleInSection}
                                      setContentId={setContentId}
                                      setSection_Id={setSection_Id}
                                      data={data.id}
                                      RemoveId={setEditMultipleChoiceQuestionId}
                                      getupdateRemoveId={updateRemoveId}
                                      deleteQuestion={deleteGridQuestion}
                                      removePopOver={removeHeaderPopover}
                                      Saveloading={[loading,setLoading]}
                                      lineRemoveCallback={gridCallback}
                                    />
                                  ) : (
                                    <></>
                                  );
                                })}
                            </div>
                          );
                        })}

                      {/* </div> */}
                    </Form>
                  </Formik>
                </>
              ) : (
                <></>
              )}
              {/* </div> */}

              <div className="questions">
                <Tab.Container
                  id="noanim-tab-example"
                  onSelect={(k) => {
                  setKey(k);
                  setEditTitle("")
                  setEditSection("")
                  setEditQualitativeQuestion("")
                  setEditMultipleChoiceQuestionId("")
                  setEditQuestionSection("")
                  setEditMultiChoiceInSectionId("")
                  setQualitativeSectionId("")
                }}
                  activeKey={key}
                >
                  {/* <Row> */}
                  <Col sm={12}>
                    <Nav variant="pills" className="flex-row">
                      <Nav.Item>
                        <Nav.Link eventKey="title">
                          <div className="title_div">
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 0L1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1L0 19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20L19 20C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19L20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM6 18H2L2 2L6 2L6 18ZM18 18L8 18L8 2L18 2L18 18Z"
                                  fill="#00643B"
                                />
                              </svg>
                            </span>
                          </div>
                        </Nav.Link>
                        <p className="mb-0">Add Title and Desc</p>
                      </Nav.Item>
                      <Nav.Item className="medium_nav_item">
                        <Nav.Link eventKey="section" disabled={disable}>
                          <div className="title_div">
                            <span>
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2 1C2 1.26522 1.89464 1.51957 1.70711 1.70711C1.51957 1.89464 1.26522 2 1 2C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1ZM2 8V18H24V8H2ZM2 6C1.46957 6 0.960859 6.21071 0.585786 6.58579C0.210714 6.96086 0 7.46957 0 8V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H24C24.5304 20 25.0391 19.7893 25.4142 19.4142C25.7893 19.0391 26 18.5304 26 18V8C26 7.46957 25.7893 6.96086 25.4142 6.58579C25.0391 6.21071 24.5304 6 24 6H2ZM1 26C1.26522 26 1.51957 25.8946 1.70711 25.7071C1.89464 25.5196 2 25.2652 2 25C2 24.7348 1.89464 24.4804 1.70711 24.2929C1.51957 24.1054 1.26522 24 1 24C0.734784 24 0.48043 24.1054 0.292893 24.2929C0.105357 24.4804 0 24.7348 0 25C0 25.2652 0.105357 25.5196 0.292893 25.7071C0.48043 25.8946 0.734784 26 1 26ZM6 1C6 1.26522 5.89464 1.51957 5.70711 1.70711C5.51957 1.89464 5.26522 2 5 2C4.73478 2 4.48043 1.89464 4.29289 1.70711C4.10536 1.51957 4 1.26522 4 1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1ZM5 26C5.26522 26 5.51957 25.8946 5.70711 25.7071C5.89464 25.5196 6 25.2652 6 25C6 24.7348 5.89464 24.4804 5.70711 24.2929C5.51957 24.1054 5.26522 24 5 24C4.73478 24 4.48043 24.1054 4.29289 24.2929C4.10536 24.4804 4 24.7348 4 25C4 25.2652 4.10536 25.5196 4.29289 25.7071C4.48043 25.8946 4.73478 26 5 26ZM10 1C10 1.26522 9.89464 1.51957 9.70711 1.70711C9.51957 1.89464 9.26522 2 9 2C8.73478 2 8.48043 1.89464 8.29289 1.70711C8.10536 1.51957 8 1.26522 8 1C8 0.734784 8.10536 0.48043 8.29289 0.292893C8.48043 0.105357 8.73478 0 9 0C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1ZM9 26C9.26522 26 9.51957 25.8946 9.70711 25.7071C9.89464 25.5196 10 25.2652 10 25C10 24.7348 9.89464 24.4804 9.70711 24.2929C9.51957 24.1054 9.26522 24 9 24C8.73478 24 8.48043 24.1054 8.29289 24.2929C8.10536 24.4804 8 24.7348 8 25C8 25.2652 8.10536 25.5196 8.29289 25.7071C8.48043 25.8946 8.73478 26 9 26ZM14 1C14 1.26522 13.8946 1.51957 13.7071 1.70711C13.5196 1.89464 13.2652 2 13 2C12.7348 2 12.4804 1.89464 12.2929 1.70711C12.1054 1.51957 12 1.26522 12 1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1ZM13 26C13.2652 26 13.5196 25.8946 13.7071 25.7071C13.8946 25.5196 14 25.2652 14 25C14 24.7348 13.8946 24.4804 13.7071 24.2929C13.5196 24.1054 13.2652 24 13 24C12.7348 24 12.4804 24.1054 12.2929 24.2929C12.1054 24.4804 12 24.7348 12 25C12 25.2652 12.1054 25.5196 12.2929 25.7071C12.4804 25.8946 12.7348 26 13 26ZM18 1C18 1.26522 17.8946 1.51957 17.7071 1.70711C17.5196 1.89464 17.2652 2 17 2C16.7348 2 16.4804 1.89464 16.2929 1.70711C16.1054 1.51957 16 1.26522 16 1C16 0.734784 16.1054 0.48043 16.2929 0.292893C16.4804 0.105357 16.7348 0 17 0C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1ZM17 26C17.2652 26 17.5196 25.8946 17.7071 25.7071C17.8946 25.5196 18 25.2652 18 25C18 24.7348 17.8946 24.4804 17.7071 24.2929C17.5196 24.1054 17.2652 24 17 24C16.7348 24 16.4804 24.1054 16.2929 24.2929C16.1054 24.4804 16 24.7348 16 25C16 25.2652 16.1054 25.5196 16.2929 25.7071C16.4804 25.8946 16.7348 26 17 26ZM22 1C22 1.26522 21.8946 1.51957 21.7071 1.70711C21.5196 1.89464 21.2652 2 21 2C20.7348 2 20.4804 1.89464 20.2929 1.70711C20.1054 1.51957 20 1.26522 20 1C20 0.734784 20.1054 0.48043 20.2929 0.292893C20.4804 0.105357 20.7348 0 21 0C21.2652 0 21.5196 0.105357 21.7071 0.292893C21.8946 0.48043 22 0.734784 22 1ZM21 26C21.2652 26 21.5196 25.8946 21.7071 25.7071C21.8946 25.5196 22 25.2652 22 25C22 24.7348 21.8946 24.4804 21.7071 24.2929C21.5196 24.1054 21.2652 24 21 24C20.7348 24 20.4804 24.1054 20.2929 24.2929C20.1054 24.4804 20 24.7348 20 25C20 25.2652 20.1054 25.5196 20.2929 25.7071C20.4804 25.8946 20.7348 26 21 26ZM26 1C26 1.26522 25.8946 1.51957 25.7071 1.70711C25.5196 1.89464 25.2652 2 25 2C24.7348 2 24.4804 1.89464 24.2929 1.70711C24.1054 1.51957 24 1.26522 24 1C24 0.734784 24.1054 0.48043 24.2929 0.292893C24.4804 0.105357 24.7348 0 25 0C25.2652 0 25.5196 0.105357 25.7071 0.292893C25.8946 0.48043 26 0.734784 26 1ZM25 26C25.2652 26 25.5196 25.8946 25.7071 25.7071C25.8946 25.5196 26 25.2652 26 25C26 24.7348 25.8946 24.4804 25.7071 24.2929C25.5196 24.1054 25.2652 24 25 24C24.7348 24 24.4804 24.1054 24.2929 24.2929C24.1054 24.4804 24 24.7348 24 25C24 25.2652 24.1054 25.5196 24.2929 25.7071C24.4804 25.8946 24.7348 26 25 26Z"
                                  fill="#00643B"
                                />
                              </svg>
                            </span>
                          </div>
                        </Nav.Link>
                        <p className="mb-0">Add Section</p>
                      </Nav.Item>
                      <Nav.Item id="question">
                        <Nav.Link eventKey="question" disabled={disable1}>
                          <div className="title_div">
                            <span>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14 1.75C7.23516 1.75 1.75 7.23516 1.75 14C1.75 20.7648 7.23516 26.25 14 26.25C20.7648 26.25 26.25 20.7648 26.25 14C26.25 7.23516 20.7648 1.75 14 1.75ZM14 24.1719C8.38359 24.1719 3.82812 19.6164 3.82812 14C3.82812 8.38359 8.38359 3.82813 14 3.82813C19.6164 3.82813 24.1719 8.38359 24.1719 14C24.1719 19.6164 19.6164 24.1719 14 24.1719Z"
                                  fill="#00643B"
                                />
                                <path
                                  d="M17.0516 8.65977C16.2312 7.94063 15.1484 7.54688 14 7.54688C12.8516 7.54688 11.7687 7.94336 10.9484 8.65977C10.0953 9.40625 9.625 10.4098 9.625 11.4844V11.6922C9.625 11.8125 9.72344 11.9109 9.84375 11.9109H11.1562C11.2766 11.9109 11.375 11.8125 11.375 11.6922V11.4844C11.375 10.2785 12.5535 9.29688 14 9.29688C15.4465 9.29688 16.625 10.2785 16.625 11.4844C16.625 12.3348 16.0234 13.1141 15.091 13.4723C14.5113 13.6938 14.0191 14.082 13.6664 14.5906C13.3082 15.1102 13.1223 15.7336 13.1223 16.3652V16.9531C13.1223 17.0734 13.2207 17.1719 13.341 17.1719H14.6535C14.7738 17.1719 14.8723 17.0734 14.8723 16.9531V16.3324C14.8737 16.067 14.9551 15.8081 15.1058 15.5896C15.2565 15.3711 15.4696 15.203 15.7172 15.1074C17.3305 14.4867 18.3723 13.0648 18.3723 11.4844C18.375 10.4098 17.9047 9.40625 17.0516 8.65977ZM12.9062 20.0156C12.9062 20.3057 13.0215 20.5839 13.2266 20.789C13.4317 20.9941 13.7099 21.1094 14 21.1094C14.2901 21.1094 14.5683 20.9941 14.7734 20.789C14.9785 20.5839 15.0937 20.3057 15.0937 20.0156C15.0937 19.7255 14.9785 19.4473 14.7734 19.2422C14.5683 19.0371 14.2901 18.9219 14 18.9219C13.7099 18.9219 13.4317 19.0371 13.2266 19.2422C13.0215 19.4473 12.9062 19.7255 12.9062 20.0156Z"
                                  fill="#00643B"
                                />
                              </svg>
                            </span>
                          </div>
                        </Nav.Link>
                        <p className="mb-0">Add Question</p>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="title"></Tab.Pane>
                      <Tab.Pane eventKey="section"></Tab.Pane>
                      <Tab.Pane eventKey="question">
                        {!disable1 && qustionsType === "" ? (
                          <UncontrolledPopover
                            className="question"
                            trigger="legacy"
                            placement="auto-start"
                            target="question"
                          >
                            <div className="squar_box squar_box_hover"></div>
                            <PopoverBody>
                              <ul className="list-unstyled mb-0">
                                <li
                                  className="first_li"
                                  onClick={() => {
                                    setQustionsType("Qualitative Question");
                                    removeQuestionPoover();
                                  }}
                                >
                                  <span>
                                    <svg
                                      width="14"
                                      height="10"
                                      viewBox="0 0 14 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1.00195 1H13.002"
                                        stroke="black"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M1 5H6.997"
                                        stroke="black"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M1.00195 9H10.997"
                                        stroke="black"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                  <Link to="#" className="text-decoration-none">
                                    Qualitative Question
                                  </Link>
                                </li>
                                <li
                                  onClick={() => {
                                    setQustionsType("Multichoice Grid");
                                    removeQuestionPoover();
                                  }}
                                >
                                  <span>
                                    <svg
                                      width="13"
                                      height="13"
                                      viewBox="0 0 13 13"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0 0.498913V12.5011C0 12.6334 0.0525639 12.7603 0.146128 12.8539C0.239693 12.9474 0.366593 13 0.498913 13H12.5011C12.6334 13 12.7603 12.9474 12.8539 12.8539C12.9474 12.7603 13 12.6334 13 12.5011V0.498913C13 0.366593 12.9474 0.239693 12.8539 0.146128C12.7603 0.0525639 12.6334 0 12.5011 0H0.498913C0.366593 0 0.239693 0.0525639 0.146128 0.146128C0.0525639 0.239693 0 0.366593 0 0.498913ZM8.99915 0.997827H12.002V4.00066H8.99915V0.997827ZM8.99915 4.99849H12.002V8.00132H8.99915V4.99849ZM8.99915 8.99915H12.002V12.002H8.99915V8.99915ZM4.99849 0.997827H8.00132V4.00066H4.99849V0.997827ZM4.99849 4.99849H8.00132V8.00132H4.99849V4.99849ZM4.99849 8.99915H8.00132V12.002H4.99849V8.99915ZM0.997827 0.997827H4.00066V4.00066H0.997827V0.997827ZM0.997827 4.99849H4.00066V8.00132H0.997827V4.99849ZM0.997827 8.99915H4.00066V12.002H0.997827V8.99915Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </span>
                                  <Link to="#" className="text-decoration-none">
                                    Multiple Choice Grid
                                  </Link>
                                </li>
                                <li
                                  onClick={() => {
                                    setQustionsType("Multiple Choice Question");
                                    removeQuestionPoover();
                                  }}
                                >
                                  <span>
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="7"
                                        stroke="black"
                                      />
                                      <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="4.5"
                                        fill="black"
                                      />
                                    </svg>
                                  </span>
                                  <Link to="#" className="text-decoration-none">
                                    Multiple Choice
                                  </Link>
                                </li>
                              </ul>
                            </PopoverBody>
                          </UncontrolledPopover>
                        ) : (
                          <></>
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                  {/* </Row> */}
                </Tab.Container>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Responses />
            </Tab.Pane>
          </Tab.Content>
        </Col>
        {/* </Row> */}
      </Tab.Container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={deleteLoading ? "loader_div" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={deleteLoading}
          css={override}
          size={50}
        />
      </div>
    </>
  );
};

export default FormCreate;
