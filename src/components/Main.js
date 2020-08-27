import React, { Component } from 'react'
import SingleData from './SingleData'
import Chart from './Chart';
import Countries from './Countries';
import moment from "moment";

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
                }, () => console.log(this.state));
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
                    <div className="last-updated">
                        <span>last updated: {timeUpdated}</span>
                    </div>
                    <div className="chart-layout">
                        <Chart/>
                    </div>
                    <div className="single-data-section">
                        <SingleData/>
                    </div>
                    <div className="country-list">
                        <Countries/>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main

