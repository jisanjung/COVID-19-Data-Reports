import React, { Component } from 'react';
import { Line } from "react-chartjs-2";

export class Chart extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    // fetch data from past 30 days
    // push into state
    componentDidMount() {
        fetch("https://corona.lmao.ninja/v3/covid-19/historical/all")
            .then(res => res.json())
            .then(data => {
                const keys = Object.keys(data.cases);
                const values = Object.values(data.cases);
                console.log(keys, values);
            });
    }

    render() {
        return (
            <section>
                <Line 
                    width={100}
                    height={50}
                />
            </section>
        )
    }
}

export default Chart
