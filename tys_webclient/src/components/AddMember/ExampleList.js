import React from 'react'
import Button from "@material-ui/core/Button";
import './ExampleList.css'

const ExampleList = (props) => {
    console.log(props);
    return (
        <>
            <div className="list-example" id="search">
                <div className="list-header">
                    <ul style={{ margin: 0, fontSize: '13px', width: '100%' }}>
                    {/* <li> Name </li>
                    <li> Email </li> */}
                </ul>
                </div>
                <div className="list-body" style={{display: 'flex', flexDirection: 'column'}}>
                {
                    props.list.map((item, index) => (
                        <ul key={index}>
                            <li> {item.firstname} </li>
                            <li> {item.email} </li>
                            <Button size="small" color="primary" variant="contained"
                                onClick={() => props.updateForm(item)}>Fill</Button>
                        </ul>
                    )
                    )
                }
                </div>
            </div>
        </>
    )
}

export default ExampleList
