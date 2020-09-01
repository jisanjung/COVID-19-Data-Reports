import React from 'react'

const Country = (props) => {

    let { name, cases } = props;

    return (
        <tr>
            <td>{name}</td>
            <td>{cases}</td>
        </tr>
    )
}

export default Country
