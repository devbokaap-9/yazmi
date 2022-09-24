import React from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { ProgressBar } from "react-bootstrap";

import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

const ViewCourses = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 800,
        settings: "unslick",
      },
    ],
  };

  let history = useHistory();

  const handlePush = () => {
    history.push("/student");
  };
  return (
    <>
      <button className="back_to_my_courses btn" onClick={handlePush}>
        <span>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L1 6L6 11"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 6H12.4286"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Back to My Courses
      </button>
      <div className="student_dashboard view_courses">
        <div className="learning_path">
          <div className="progress_bar">
            <h5>Biology Part 1</h5>
            <div className="rows d-flex justify-content-between">
              <p className="green_clr">77%</p>
              <span>100%</span>
            </div>
            <ProgressBar now={60} className="green_clr" />
          </div>
        </div>
        <div className="my_courses">
          <div className="courses_details">
            <h3>Agriculture</h3>
            <Slider {...settings2}>
              <Link className="progress_bar" to="#">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">77%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={60} className="green_clr" />
                </div>
              </Link>

              <Link className="progress_bar" to="#">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="orange_clr">77%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={60} className="orange_clr" />
                </div>
              </Link>

              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="red_clr">77%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={60} className="red_clr" />
                </div>
              </div>

              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">77%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={60} className="green_clr" />
                </div>
              </div>
              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">77%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={60} className="green_clr" />
                </div>
              </div>
              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">77%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={60} className="green_clr" />
                </div>
              </div>
            </Slider>
          </div>

          <div className="completed_courses_details">
            <h3>AM</h3>
            <Slider {...settings2}>
              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">100%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={100} className="green_clr" />
                </div>
              </div>

              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">100%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={100} className="green_clr" />
                </div>
              </div>

              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">100%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={100} className="green_clr" />
                </div>
              </div>

              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">100%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={100} className="green_clr" />
                </div>
              </div>
              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">100%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={100} className="green_clr" />
                </div>
              </div>
              <div className="progress_bar">
                <img
                  src={process.env.PUBLIC_URL + "/images/student.png"}
                  alt=""
                  className="img-fluid"
                />
                <div className="content_box">
                  <h5>Biology Part 1</h5>
                  <div className="rows d-flex justify-content-between">
                    <p className="green_clr">100%</p>
                    <span>100%</span>
                  </div>
                  <ProgressBar now={100} className="green_clr" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourses;
