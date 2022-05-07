import LastUpdated from './LastUpdated.mjs';
import SearchStocks from './SearchStocks.mjs';

import './App.css';
import logo from './logo.svg';

function App() {
    return (
        <div className="App container mx-auto">
            <div className="grid grid-cols-12 gap-4">
                <SearchStocks />
                <LastUpdated />
            </div>
        </div>
    );
}

export default App;

