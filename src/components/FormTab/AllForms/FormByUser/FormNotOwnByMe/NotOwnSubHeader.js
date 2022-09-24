import React, { useState } from "react";
import SubHeader from "../../../../Layout/SubHeader";
import NotOwnByMe from "./NotOwnByMe";
import { Link, useParams } from "react-router-dom";
// import FormCreate from "./FormCreate";



const NotOwnSubHeader = () => {

  let param = useParams();

  return (
    <>
      <main className="main_section">
        <div className="all_user">
          <SubHeader
            name={window.location.href.split("/").pop()}
            time="Sent By"
            date=""
          />
          {/* <div className="bottom_section">
            <div className="search_box d-flex justify-content-between align-items-center">
              <input type="text" placeholder="Search" />
              <span className="d-flex">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.17647 1C5.95488 1 4.76073 1.36224 3.74501 2.04092C2.72929 2.7196 1.93764 3.68423 1.47016 4.81284C1.00268 5.94144 0.880361 7.18332 1.11868 8.38144C1.357 9.57956 1.94525 10.6801 2.80905 11.5439C3.67284 12.4077 4.77339 12.9959 5.9715 13.2343C7.16962 13.4726 8.4115 13.3503 9.54011 12.8828C10.6687 12.4153 11.6333 11.6236 12.312 10.6079C12.9907 9.59222 13.3529 8.39806 13.3529 7.17647C13.3528 5.5384 12.7021 3.96745 11.5438 2.80916C10.3855 1.65087 8.81454 1.0001 7.17647 1V1Z"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M11.5883 11.5881L16 15.9999"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div> */}
          <div className="data_table not_own_by_me mt-3">
            <NotOwnByMe />
            {/* <h2 className="no_record">Your response has been recorded Thank you for submitting</h2> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default NotOwnSubHeader;
