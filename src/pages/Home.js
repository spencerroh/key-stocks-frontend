import LastUpdated from '../LastUpdated.mjs';
import SearchStocks from '../SearchStocks.mjs';

export default function Home() {
    return (
        <>
            <SearchStocks />
            <LastUpdated />
        </>
    );
}