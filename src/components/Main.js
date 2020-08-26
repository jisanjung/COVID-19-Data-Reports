import React, { Component } from 'react'
import SingleData from './SingleData'
import Chart from './Chart';
import Countries from './Countries';

export class Main extends Component {
    constructor() {
        super();
        this.state = {
            updated: "",
            cases: "",
            deaths: "",
            recovered: "",
            cases_today: ""
        }
    }

    componentDidMount() {
        fetch("https://corona.lmao.ninja/v3/covid-19/all")
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <main>
                <div className="main-container flex direction-column">
                    <div className="last-updated">
                        <span>last updated: </span>
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

