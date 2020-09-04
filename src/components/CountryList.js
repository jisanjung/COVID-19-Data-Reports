import React, { Component } from 'react'
import Country from './Country';

export class CountryList extends Component {

    constructor() {
        super();
        this.state = {
            // sorted list high to low
            countryStats: []
        }
    }

    componentDidMount() {
        fetch("https://corona.lmao.ninja/v3/covid-19/countries")
            .then(res => res.json())
            .then(data => {
                // list of countries sorted high to low
                const sortedHiLo = data.sort((country1, country2) => country2.cases - country1.cases);
                this.setState({
                    countryStats: [...sortedHiLo]
                });
            });
    }

    render() {
        return (
            <section className="country-list component">
                <ul className="table-header flex">
                    <li className="country-name"><span className="text">Name</span></li>
                    <li className="country-data"><span className="text">Cases</span></li>
                    <li className="country-data"><span className="text">Deaths</span></li>
                    <li className="country-data"><span className="text">Recovered</span></li>
                </ul>
                <div className="y-scroll list-wrap">
                    <table>
                        <tbody>
                            {this.state.countryStats.map((country, id) => <Country key={id} name={country.country} cases={country.cases} deaths={country.deaths} recovered={country.recovered} flag={country.countryInfo.flag}/>)}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

export default CountryList
