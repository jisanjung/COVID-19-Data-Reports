import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMehBlank, faSignal } from '@fortawesome/free-solid-svg-icons';
import numeral from "numeral";

const SingleData = (props) => {
    const value = props.value; // recorded numerical value
    const type = props.type; // what kind of data it was, ex: "deaths"
    const icon = props.icon; // icon associated with type of data
    const background = props.background; // color surrounding icon
    const color = props.color; // color of icon

    return (
        <section className="single-data component">
            <span className="text type-of-data block">{type}</span>
            <div className="flex align-center relative">
                <div className="icon-wrap" style={{background: background}}>
                    <FontAwesomeIcon icon={icon == null ? faMehBlank : icon} style={{color: color}} className="icon"/>
                </div>
                <span className="text">{numeral(value).format("0,0")}</span>
                <div className="icon stats-icon absolute">
                    <FontAwesomeIcon icon={faSignal} style={{color: color}}/>
                </div>
            </div>
        </section>
    )
}

export default SingleData
