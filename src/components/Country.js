import React from 'react';
import numeral from "numeral";

const Country = (props) => {

    let { name, cases, deaths, recovered, flag } = props;

    const redText = num => {
        if (num >= 1000000) {
            return "red"
        }
    }
    const greenText = num => {
        if (num >= 1000000) {
            return "green"
        }
    }

    return (
        <tr className="flex flex-between country">
            <td className="country-name text"><div className="flag inline-block"><img src={flag} alt={`${name} Flag`}/></div>{name}</td>
            <td className="flex flex-end country-data"><span className="text" style={{color: redText(cases)}}>{numeral(cases).format("0,0")}</span></td>
            <td className="flex flex-end country-data"><span className="text" style={{color: redText(deaths)}}>{numeral(deaths).format("0,0")}</span></td>
            <td className="flex flex-end country-data"><span className="text" style={{color: greenText(recovered)}}>{numeral(recovered).format("0,0")}</span></td>
        </tr>
    )
}

export default Country
