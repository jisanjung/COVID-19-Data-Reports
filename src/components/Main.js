import React, { Component } from 'react'
import Box from './SingleData'
import Chart from './Chart';
import Countries from './Countries';

export class Main extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <main>
                Main
                <div className="main-container flex direction-column">
                    <div className="chart-layout">
                        <Chart/>
                    </div>
                    <div className="single-data-section">
                        <Box/>
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

