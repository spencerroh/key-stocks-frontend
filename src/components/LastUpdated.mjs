import axios from 'axios';
import useAsync from '../hooks/useAsync.mjs'

// Components
import Card from './Card.js';
import Stocks from './Stocks.mjs'

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
        <Card title={`오늘의 특징주 (${stocks.data.date})`}>
            <Stocks items={stocks.data.stocks} />
        </Card>
    );
}