import React, { Component } from 'react'
import SingleData from './SingleData'
import Chart from './Chart';
import CountryList from './CountryList';
import moment from "moment";
import { faGlobe, faDizzy, faHeart } from '@fortawesome/free-solid-svg-icons'

export class Main extends Component {
    constructor() {
        super();
        
        // this state will only be used for Main and SingleData components
        this.state = {
            updated: "",
            cases: "",
            deaths: "",
            recovered: "",
            cases_today: ""
        }
    }

    /*
    fetch wordly data for:
    - last time this data was updated
    - total cases globally
    - total amount of deaths
    - total recovered
    then update state with this info
    */
    componentDidMount() {
        fetch("https://corona.lmao.ninja/v3/covid-19/all")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    updated: data.updated,
                    cases: data.cases,
                    deaths: data.deaths,
                    recovered: data.recovered,
                    cases_today: data.todayCases
                });
            })
            .catch(error => console.log(error));
    }

    // converts unix time stamp to YYYYMMDD h:mm:ss a
    unixToDate(unix) {
        let formatted = moment(unix).format("YYYYMMDD, h:mm:ss a");
        return formatted; // ex: 20200824 11:59:00 pm
    }

    render() {
        let date = this.unixToDate(this.state.updated);
        let timeUpdated = moment(date, "YYYYMMDD, h:mm:ss a").fromNow(); // ex: 10 minutes ago
        return (
            <main>
                <div className="main-container flex direction-column">
                    <div className="last-updated w-100">
                        <span className="text block text-right">last updated: {timeUpdated}</span>
                    </div>
                    <div className="chart-layout">
                        <Chart/>
                        <div className="cases-today">
                            <SingleData value={this.state.cases_today} type="Cases Today"/>
                        </div>
                    </div>
                    <div className="single-data-section">
                        <SingleData value={this.state.cases} type="Total Cases" icon={faGlobe} color="#827af3" background="rgba(130, 122, 243, 0.2)"/>
                        <SingleData value={this.state.deaths} type="Deaths" icon={faDizzy} color="#f14336" background="rgba(241, 67, 54, 0.1)"/>
                        <SingleData value={this.state.recovered} type="Recovered" icon={faHeart} color="#ffd369" background="rgba(255, 211, 105, 0.125)"/>

                    </div>
                    <div className="country-list">
                        <CountryList/>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main

