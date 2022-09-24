import React, { useContext, useEffect, useState} from "react";
import { Link,Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UnAuthorizedPage = () => {
    return (
        <>
            <main className="main_section">
                <div className="all_user">
                    <div className="unauthorize_page">
                        <h2>401</h2>
                        <p>Dont have access to view this page</p>
                    </div>
                </div>
            </main>
        </>
    );
};
export default UnAuthorizedPage;
