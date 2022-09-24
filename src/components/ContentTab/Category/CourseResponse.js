import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCoursesResponse } from '../../../actions/Content';

const CourseResponse = () => {
    let dispatch = useDispatch();

    const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);


    const courseData = useSelector((state) => state.contentData.getCoursesResponse);


    useEffect(() => {
        dispatch(getCoursesResponse(courseDetailsData.id))
    },[courseDetailsData.id])

    
  return (
    <>
        <div className="responses_tab">
      <ul>
        <li>
          <h5>Name</h5>
          <h5 className="text-center">Start Date</h5>
          <h5 className="text-end">End Date</h5>
          <h5 className="text-end">Score</h5>
        </li>
        

        {
            courseData && courseData.length < 1 ?
            <>
                <p className='text-center'>NA</p>
            </>
            :
            courseData && courseData.map((data) =>
                <li>
                    <h5 className="cursor_pointer">{data.submitted_by}</h5>
                    <h5 className="text-center">{new Date(data.start_date).toISOString().split('T')[0]}</h5>
                    <h5 className="text-end">{new Date(data.end_date).toISOString().split('T')[0]}</h5>
                    <h5 className="text-end d-flex justify_end"><div className='score_div justify_end'>{data.score.map((value) => <p className="text-right w-100">{value}%,</p>)}</div></h5>
                </li>
            )
        }
      </ul>
    </div>
    </>
  )
}

export default CourseResponse