import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";

export class Chart extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                labels: [],
                datasets: [],
            }
        }
    }

    // fetch data from past 30 days
    // push into state
    componentDidMount() {
        fetch("https://corona.lmao.ninja/v3/covid-19/historical/all")
            .then(res => res.json())
            .then(data => {
                const keys = Object.keys(data.cases);
                const cases = Object.values(data.cases);
                const recovered = Object.values(data.recovered);
                this.setState({ 
                    // must be structured like this for chart.js
                    data: {
                        labels: [...keys],
                        datasets: [{
                            label: "Cases",
                            data: [...cases],
                            backgroundColor: "transparent",
                            borderColor: "rgb(130, 122, 243)"
                        },
                        {
                            label: "Recovered",
                            data: [...recovered],
                            backgroundColor: "transparent",
                            borderColor: "rgb(108, 230, 244)"
                        }]
                    },
                 });
            });
    }

    render() {
        return (
            <section className="chart-container">
                <Line 
                    data={this.state.data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function(value) {
                                        return numeral(value).format("0a").toUpperCase();
                                    }
                                }
                            }]
                        }
                    }}
                />
            </section>
        )
    }
}

export default Chart
