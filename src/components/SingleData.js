import React from 'react'

const SingleData = (props) => {
    const value = props.value; // recorded numerical value
    const type = props.type; // what kind of data it was, ex: "deaths"

    return (
        <section>
            <span>{`${value} ${type}`}</span>
        </section>
    )
}

export default SingleData
