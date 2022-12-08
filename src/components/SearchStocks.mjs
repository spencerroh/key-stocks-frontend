import React, { useState } from 'react'
import axios from 'axios'
import $ from '../utils/directives.mjs'
import useAsync from '../hooks/useAsync.mjs'

// Component
import SearchView from './SearchView.mjs'
import Pagination from './Pagination.mjs'

// CSS
import './SearchStocks.css';
import Card from './Card.js'

async function queryKeywords(queryCriteria) {
    var response = await axios.post(
        '/api/key-stocks/v1/query/keywords', queryCriteria);

    return response.data;
}

export default function SearchStocks() {
    const ITEMS_PER_PAGE = 5;
    const [state, setState] = useState({
        keywords: [],
        limit: ITEMS_PER_PAGE,
        page: 1
    });

    const [ stocks ] = useAsync(
        () => {
            return queryKeywords({
                keywords: state.keywords,
                limit: state.limit,
                offset: (state.page - 1) * state.limit
            });
        },
        { loadingOnlyFirst: true },
        [state]);

    const { data } = stocks;

    const onKeywordTyped = (e) => {
        if (e.key !== 'Enter') return;

        const value = e.target.value.trim();
        if (value.length === 0)
            return;

        setState({
            ...state,
            keywords: value.split(' '),
            page: 1
        });
    }

    const onPageMoved = (i) => {
        setState({
            ...state,
            page: i
        });
    }

    return (
        <Card title="특징주 검색">
            <input 
                className='input-text' 
                type='input'
                placeholder='핵심 단어'
                onKeyPress={ onKeywordTyped }></input>
                
            { $.Assigned(data, () =>
                <div>
                    <div className='result-view'>
                        <SearchView items={ data.stocks } />
                    </div>
                    <div className='result-pagination text-center'>
                        <Pagination 
                            count={ data.count } 
                            itemsPerPage={ ITEMS_PER_PAGE } 
                            current={ state.page }
                            pageMoved={ onPageMoved }
                            />
                    </div>
                </div>)
            }
        </Card>
    );
};