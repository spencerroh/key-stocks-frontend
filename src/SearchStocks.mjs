import React, { Component } from 'react'
import axios from 'axios';
import _ from 'lodash';

import Stocks from './Stocks.mjs'

// css
import './SearchStocks.css';

export default 
class SearchStocks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: [],
            count: 0,
            now: 0,
            stocks: null,
            isFilled: false,
        };

        this.onKeywordTyped = this.onKeywordTyped.bind(this);
    }
    componentDidMount() {

    }

    onKeywordTyped(e) {
        if (e.key !== "Enter") return;

        const value = e.target.value.trim();

        if (value.length === 0) {
            this.setState({
                keywords: [],
                count: 0,
                now: 0,
                stocks: null,
                isFilled: false
            });

            return;
        }
        
        
        const keywords = {
            'keywords': e.target.value.trim().split(' '),
            'limit': 5
        };
        
        axios
            .post('http://localhost:2000/query/keywords', keywords)
            .then(response => {
                this.setState({
                    keywords: keywords.keywords,
                    count: response.data.count,
                    now: 1,
                    stocks: response.data.stocks,
                    isFilled: true
                });
            });
    }

    onPaginationClicked(i) {
        const keywords = {
            'keywords': this.state.keywords,
            'limit': 5,
            'offset': (i - 1) * 5
        };

        axios
            .post('http://localhost:2000/query/keywords', keywords)
            .then(response => {
                this.setState({
                    keywords: this.state.keywords,
                    count: response.data.count,
                    now: i,
                    stocks: response.data.stocks,
                    isFilled: true
                });
            });
    }

    render() {
        let result = null;

        if (this.state.isFilled) {
            let pagination = _.range(1, _.ceil(this.state.count / 5)).map(i => (
                <button 
                    className={`pagination ${i === this.state.now ? 'pagination-now' : ''}`}
                    key={i} 
                    onClick={() => this.onPaginationClicked(i)}>{i}</button>
            ));

            result = (
                <div>
                    <div className="result-view">
                        <Stocks items={ this.state.stocks } />
                    </div>
                    <div className="result-pagination text-center">
                        {pagination}
                    </div>
                </div>
            );
        }

        return (
            <div className="panel col-start-2 col-span-10 rounded">
                <div className="panel-title">특징주 검색</div>
                <div className="panel-contents">
                    <input 
                        className="input-text" 
                        type="input"
                        defaultValue="테슬라 배터리"
                        onKeyPress={this.onKeywordTyped}></input>
                    
                    {result}
                </div>
            </div>
        );
    }
}