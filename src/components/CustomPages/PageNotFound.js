import React, { useContext, useEffect, useState} from "react";
import { Link,Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PageNotFound = () => {
    return (
        <>
            <main className="main_section">
                <div className="all_user">
                    <b>404</b>
                </div>
            </main>
        </>
    );
};
export default PageNotFound;
