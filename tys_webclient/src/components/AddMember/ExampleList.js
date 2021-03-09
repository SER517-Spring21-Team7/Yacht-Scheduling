import React from 'react'
import './ExampleList.css'

const ExampleList = (props) => {
    return (
        <>
            <div className="list-example" id="search">
                <div className="list-header">
                    <ul style={{ margin: 0, fontSize: '13px', width: '100%' }}>
                    <li> Name </li>
                    <li> Email </li>
                </ul>
                </div>
                <div className="list-body" style={{display: 'flex', flexDirection: 'column'}}>
                {
                    props.list.map((item, index) => (
                    <ul key={index}>
                        <li> {item.name} </li>
                        <li> {item.email} </li>
                    </ul>))
                }
                </div>
            </div>
        </>
    )
}

export default ExampleList
