import LastUpdated from '../components/LastUpdated.mjs';
import SearchStocks from '../components/SearchStocks.mjs';

export default function Home() {
    return (
        <>
            <SearchStocks />
            <LastUpdated />
        </>
    );
}