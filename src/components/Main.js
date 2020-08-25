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
            <div>
                Main
                <Box/>
                <Chart/>
                <Countries/>
            </div>
        )
    }
}

export default Main

