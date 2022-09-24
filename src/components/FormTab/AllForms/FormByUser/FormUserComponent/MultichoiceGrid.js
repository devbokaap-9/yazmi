import React, { useState } from "react";

const MultichoiceGrid = () => {

  const [rowCount, setRowCount] = useState(0)
  const [columnCount, setColumnCount] = useState(0)

  // add row
  const handleAddRow = () => {
    let addDivRow = document.getElementById("append_div_row")
    let copyRow = addDivRow.firstElementChild.cloneNode(true);
    copyRow.childNodes[0].value = ""
    copyRow.childNodes[0].placeholder = "defaultValue"
    // let addclass = copyRow.classList.add("mystyle")
    addDivRow.appendChild(copyRow)
    setRowCount(rowCount + 1)

    // get remove button
    let removeButton = copyRow.childNodes[1]
    removeButton.addEventListener('click',function(e){
      handleRemoveRow(e)
    })
  } 

  // remove column
  const handleRemoveRow = (e) => {
    let element = e.target.id || e.target.parentNode.id
    let elementDiv = document.getElementById(element).parentNode


    let getUlLenght = document.getElementById("append_div_row").childNodes.length
    
    if(getUlLenght > 1){
      elementDiv.remove()
    }
  }

  //  add column
  const handleAddColumn = () => {
    let addDivColumn = document.getElementById("append_div_column")
    let copyColumn = addDivColumn.firstElementChild.cloneNode(true);
    copyColumn.childNodes[0].childNodes[1].value = ""
    copyColumn.childNodes[0].childNodes[1].placeholder = "defaultValue"


    addDivColumn.appendChild(copyColumn)
    setColumnCount(columnCount + 1)

    // get remove button
    let removeButtonColumn = copyColumn.childNodes[1]

    removeButtonColumn.addEventListener('click',function(e){
      handleRemoveColumn(e)
    })

  } 

  const handleRemoveColumn = (e) => {
    let getelementColumnid = e.target.id || e.target.parentNode.id
    let elementDivColumnLi = document.getElementById(getelementColumnid).parentNode


    let getUlLenghtColumn = document.getElementById("append_div_column").childNodes.length

    if(getUlLenghtColumn > 1){
      elementDivColumnLi.remove()
    }
  }

  

  return (
    <div className="multichoice_grid_div">
      <div className="row_div">
        <h3>Rows</h3>
        <div className="add-rows">
          <ol className="mb-0" id="append_div_row">
            <li className="" >
              <input type="text" className="multigridrow" placeholder="defaultValue" />
              <span id={`li_id_${rowCount}`} onClick={(e)=>{handleRemoveRow(e)}} >
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li>
            <li className="">
              <input type="text" className="multigridrow" placeholder="defaultValue" />
              <span  id={`li_id_${rowCount + 1}`} onClick={(e)=>{handleRemoveRow(e)}} >
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li>
          </ol>
          <div className="add_row_icon" onClick={()=> {handleAddRow()}}>
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
            <p className="mb-0">Add Row</p>
          </div>
        </div>
      </div>
      <div className="column_div">
        <h3> Columns</h3>
        <div className="add-rows">
          <ul className="mb-0" id="append_div_column">
            <li className="">
              <div className="circle_div">
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
                <input type="text" className="multigridcolumn" placeholder="defaultValue" />
              </div>
              <span id={`li_id_${columnCount}_cloumn`} onClick={(e)=>{handleRemoveColumn(e)}} >
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li>
            <li className="">
              <div className="circle_div">
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
                <input type="text" className="multigridcolumn" placeholder="defaultValue" />
              </div>
              <span id={`li_id_${columnCount + 1}_cloumn`} onClick={(e)=>{handleRemoveColumn(e)}}>
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li>
          </ul>
          <div className="add_row_icon" onClick={()=> {handleAddColumn()}}>
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
            <p className="mb-0">Add Column</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultichoiceGrid;
