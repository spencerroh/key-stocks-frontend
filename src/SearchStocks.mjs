import React, { useState } from 'react'
import useAsync from './hooks/useAsync.mjs'
import axios from 'axios'
import $ from './utils/directives.mjs'

import SearchView from './SearchView.mjs'
import Pagination from './Pagination.mjs'

// css
import './SearchStocks.css';

async function queryKeywords(queryCriteria) {
    if (queryCriteria.keywords.length === 0)
        throw new Error('No keyword(s).');

    var response = await axios.post(
        '/query/keywords', queryCriteria);

    return response.data;
}

export default function SearchStocks() {
    const ITEMS_PER_PAGE = 5;
    const [now, setNow] = useState(1);
    const [queryCriteria, setQueryCriteria] = useState({
        keywords: [],
        limit: ITEMS_PER_PAGE,
        offset: 0
    });
    const [ stocks ] = useAsync(
        () => queryKeywords(queryCriteria), 
        { loadingOnlyFirst: true },
        [queryCriteria]);

    const { data } = stocks;

    const onKeywordTyped = (e) => {
        if (e.key !== 'Enter') return;

        const value = e.target.value.trim();
        if (value.length === 0)
            return;

        setNow(1);
        setQueryCriteria({
            ...queryCriteria,
            keywords: value.split(' '),
            limit: ITEMS_PER_PAGE,
            offset: 0
        });
    }

    const onPageMoved = (i) => {
        setNow(i);
        setQueryCriteria({
            ...queryCriteria,
            'offset': (i - 1) * ITEMS_PER_PAGE
        });
    }

    return (
        <div className='panel col-start-2 col-span-10 rounded'>
            <div className='panel-title'>특징주 검색</div>
            <div className='panel-contents'>
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
                            current={ now }
                            pageMoved={ onPageMoved }
                            />
                    </div>
                </div>)
            }
            </div>
        </div>
    );
};