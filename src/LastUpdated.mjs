import React, { Component } from 'react'
import axios from 'axios';

import Stocks from './Stocks.mjs'
// css
import './LastUpdated.css';

export default 
class LastUpdated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            isFilled: false
        };
    }
    componentDidMount() {
        axios({
            url: 'http://localhost:2000/today',
            method: 'get'
        })
        .then(res => {
            console.log(res);
            this.setState({
                result: res.data,
                isFilled: true
            });
        });
    }

    render() {
        if (this.state.isFilled)
        {
            return (
                <div className="panel col-start-2 col-span-10 rounded">
                    <div className="panel-title">오늘의 특징주 ({this.state.result.date})</div>
                    <div className="panel-contents">
                        <Stocks items={this.state.result.stocks} />
                    </div>
                </div>
            )
        }
        else
            return (<div>empty</div>);
    }
}