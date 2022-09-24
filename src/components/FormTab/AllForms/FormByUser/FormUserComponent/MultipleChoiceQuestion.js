import React, { useState } from "react";

const MultipleChoiceQuestion = () => {

  const [inputCount, setInputCount] = useState(0)

  // add row
  const handleAddRow = () => {
    let addDivRow = document.getElementById("multiChoice_question")
    let copyRow = addDivRow.firstElementChild.cloneNode(true);
    copyRow.childNodes[0].childNodes[1].value = ""
    copyRow.childNodes[0].childNodes[1].placeholder = "Options"


    addDivRow.appendChild(copyRow)
    setInputCount(inputCount + 1)

    // get remove button
    let removeButton = copyRow.childNodes[1].childNodes[0]

    // call remove function
    removeButton.addEventListener('click',function(e){
      handleRemove(e)
    })
  } 

  const handleRemove = (e) => {
    let getId = e.target.id || e.target.parentNode.id
    let getParentdiv = document.getElementById(getId).parentNode.parentNode

    // get lenght
    let getLenght = document.getElementById("multiChoice_question").childNodes.length
    if(getLenght > 1){
      getParentdiv.remove()
    }
  }


  return (
    <div className="multiple_choice_question">
      <div className="row_div">
        <h3>Options</h3>
        <div className="add-rows" id="multiChoice_question">
          <div className="circle_div" >
            <div className="option_name">
              <span className="circle_icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="7" stroke="#C4C4C4" />
                </svg>
              </span>
              {/* <p className="mb-0">All days</p> */}
              <input type="text" className="multichoiceoptions" placeholder="Options"/>
            </div>
            <div className="cross_icon">
              <span id={`cross_${inputCount}`} onClick={(e) => {handleRemove(e)}}>
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </div>
          </div>
          <div className="circle_div">
            <div className="option_name">
              <span className="circle_icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="7.5" r="7" stroke="#C4C4C4" />
                </svg>
              </span>
              <input type="text" className="multichoiceoptions" placeholder="Options"/>
            </div>
            <div className="cross_icon">
              <span id={`cross_${inputCount + 1}`} onClick={(e) => {handleRemove(e)}}>
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </div>
          </div>
        </div>
        <div className="add_row_icon" onClick={() => {handleAddRow()}}>
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
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
