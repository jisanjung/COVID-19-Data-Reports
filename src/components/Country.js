import React from 'react'

const Country = (props) => {

    let { name, cases, deaths, recovered, flag } = props;

    return (
        <tr className="flex flex-between">
            <td className="country-name"><div className="flag inline-block"><img src={flag} alt={`${name} Flag`}/></div>{name}</td>
            <td className="flex flex-end country-data"><span>{cases}</span></td>
            <td className="flex flex-end country-data"><span>{deaths}</span></td>
            <td className="flex flex-end country-data"><span>{recovered}</span></td>
        </tr>
    )
}

export default Country
