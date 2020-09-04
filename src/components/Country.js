import React from 'react'

const Country = (props) => {

    let { name, cases, deaths, recovered, flag } = props;

    return (
        <tr className="flex flex-between">
            <td className="country-name text"><div className="flag inline-block"><img src={flag} alt={`${name} Flag`}/></div>{name}</td>
            <td className="flex flex-end country-data"><span className="text">{cases}</span></td>
            <td className="flex flex-end country-data"><span className="text">{deaths}</span></td>
            <td className="flex flex-end country-data"><span className="text">{recovered}</span></td>
        </tr>
    )
}

export default Country
