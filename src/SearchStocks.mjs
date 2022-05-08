import React, { Component } from 'react'
import axios from 'axios';
import _ from 'lodash';

import SearchView from './SearchView.mjs'
import Pagination from './Pagination.mjs'

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
        this.onPageMoved = this.onPageMoved.bind(this);
    }
    componentDidMount() {
        const keywords = {
            'keywords': "화장품".split(' '),
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

    onKeywordTyped(e) {
        if (e.key !== 'Enter') return;

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

    onPageMoved(i) {
        console.log(i);

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
            result = (
                <div>
                    <div className='result-view'>
                        <SearchView items={ this.state.stocks } />
                    </div>
                    <div className='result-pagination text-center'>
                        <Pagination 
                            count={this.state.count} 
                            itemsPerPage="5" 
                            current={this.state.now}
                            pageMoved={this.onPageMoved}
                            />
                    </div>
                </div>
            );
        }

        return (
            <div className='panel col-start-2 col-span-10 rounded'>
                <div className='panel-title'>특징주 검색</div>
                <div className='panel-contents'>
                    <input 
                        className='input-text' 
                        type='input'
                        placeholder='핵심 단어'
                        onKeyPress={this.onKeywordTyped}></input>
                    
                    {result}
                </div>
            </div>
        );
    }
}