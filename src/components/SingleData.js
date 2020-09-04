import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMehBlank, faSignal } from '@fortawesome/free-solid-svg-icons'

const SingleData = (props) => {
    const value = props.value; // recorded numerical value
    const type = props.type; // what kind of data it was, ex: "deaths"
    const icon = props.icon; // icon associated with type of data

    return (
        <section className="single-data component">
            <span className="text type-of-data">{type}</span>
            <div className="flex">
                <div className="icon">
                    <FontAwesomeIcon icon={icon == null ? faMehBlank : icon} />
                </div>
                <span className="text">{value}</span>
                <div className="icon">
                    <FontAwesomeIcon icon={faSignal} />
                </div>
            </div>
        </section>
    )
}

export default SingleData
