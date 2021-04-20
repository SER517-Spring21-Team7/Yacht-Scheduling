import React from 'react'
import { useState, useEffect } from "react";
import AddCheckList from './AddCheckList'
import ShowCheckList from './ShowCheckList'

const initialValues = {
    listOfCheckList:[]
};

const CheckListHomePage = () => {

    const [values, setValues] = useState(initialValues);

    const handleCallback = (currentChecklist) => {
        setValues({
            listOfCheckList: [...values.listOfCheckList, ...currentChecklist]
        });
    };

    return (
        <div>
            <AddCheckList data={values} parentCallBack={handleCallback}></AddCheckList>
            <ShowCheckList  data={values} parentCallBack={handleCallback}></ShowCheckList>
        </div>
    )
}

export default CheckListHomePage
