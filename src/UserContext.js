import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [lUserId, setLUserId] = useState("");
    const [sQuestion, setSQuestion] = useState("");
    const [uName, setUName] = useState("");
    const [gByToggle, setGByToggle] = useState("");
    const [rLevel, setRLevel] = useState("");
    const [allBtn, setAllBtn] = useState("");
    const [crtFormBtn,setCrtFormBtn] = useState(false)
    const [formLdng,setFrmLdng] = useState(false)
    const [frmUpdating,setFrmUpdating] = useState("")
    const [notOnwId,setNotOnwId] = useState("")
    const [frmResponse,setFrmResponse] = useState(0)
    const [practiceExamQtnsCnt,setPracticeExamQtnsCnt] = useState(0)
    // const [practiceExamWrongAnsCnt,setPracticeExamWrongAnsCnt] = useState(0)
    const [RemoveIdForUser,setRemoveIdForUser] = useState(false)
    const [practiceExamAns,setPracticeExamAns] = useState([])
    const [wrongPracticeExamQtnIds,setWrongPracticeExamQtnIds] = useState([])
    const [courseFilterValue,setCourseFilterValue] = useState("")
    const [pUserId, setPUserId] = useState("");
    const [lUserPermissions,setLUserPermissions] = useState([])
    const [practiceExamPrevLoading,setPracticeExamPrevLoading] = useState(false)
    const [practiceExamSctnData,setPracticeExamSctnData] = useState([])

    return (
        <UserContext.Provider
            value={{
                token,
                setToken,
                lUserId,
                setLUserId,
                sQuestion,
                setSQuestion,
                uName,
                setUName,
                gByToggle,
                setGByToggle,
                rLevel,
                setRLevel,
                allBtn,
                setAllBtn,
                crtFormBtn,
                setCrtFormBtn,
                formLdng,
                setFrmLdng,
                frmUpdating,
                setFrmUpdating,
                notOnwId,
                setNotOnwId,
                frmResponse,
                setFrmResponse,
                practiceExamQtnsCnt,
                setPracticeExamQtnsCnt,
                // practiceExamWrongAnsCnt,
                // setPracticeExamWrongAnsCnt,
                RemoveIdForUser,
                setRemoveIdForUser,
                practiceExamAns,
                setPracticeExamAns,
                wrongPracticeExamQtnIds,
                setWrongPracticeExamQtnIds,
                courseFilterValue,
                setCourseFilterValue,
                pUserId,
                setPUserId,
                lUserPermissions,
                setLUserPermissions,
                practiceExamPrevLoading,
                setPracticeExamPrevLoading,
                practiceExamSctnData,
                setPracticeExamSctnData
            }}
            >
            {children}
        </UserContext.Provider>
    );
};