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
            <section>
                <thead className="flex flex-between">
                    <th>Name</th>
                    <th>Cases</th>
                </thead>
                <div className="y-scroll country-list">
                    <table>
                        <tbody>
                            {this.state.countryStats.map((country, id) => <Country key={id} name={country.country} cases={country.cases}/>)}
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

export default CountryList
