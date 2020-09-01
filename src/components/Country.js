import React from 'react'

const Country = (props) => {

    let { name, cases, deaths, recovered } = props;

    return (
        <tr className="flex flex-between">
            <td className="country-name">{name}</td>
            <td className="flex flex-end country-data"><span>{cases}</span></td>
            <td className="flex flex-end country-data"><span>{deaths}</span></td>
            <td className="flex flex-end country-data"><span>{recovered}</span></td>
        </tr>
    )
}

export default Country
