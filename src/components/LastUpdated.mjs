import axios from 'axios';
import useAsync from '../hooks/useAsync.mjs'

// Components
import Stocks from './Stocks.mjs'

// CSS
import './LastUpdated.css';

async function queryTodayStocks() {
    var response = await axios.get('/api/key-stocks/v1/today');
    return response.data;
}

export default function LastUpdated() {
    const [ stocks ] = useAsync(
        () => queryTodayStocks(),
        {}, []);

    if (stocks.loading) return (<div>Loading...</div>);
    if (stocks.error != null) return (<div>{stocks.error}</div>);
    
    return (
        <div className="panel rounded">
            <div className="panel-title">오늘의 특징주 ({stocks.data.date})</div>
            <div className="panel-contents">
                <Stocks items={stocks.data.stocks} />
            </div>
        </div>
    );
}